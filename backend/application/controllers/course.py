import logging
from typing import List
from ..models.submission import Submission
from ..validators.submission import SubmissionCreationSchema
from flask import Blueprint, g, abort, request
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..validators.course import CourseCreationSchema
from ..validators.announcement import AnnouncementCreationSchema
from ..validators.assignment import AssignmentCreationSchema
from ..models.course import Course
from ..models.course_permission import CoursePermission, Role
from ..models.user import User, UserType
from ..models.announcement import Announcement
from ..models.assignment import Assignment
import datetime
import boto3
import os

course_bp = Blueprint('course_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)


ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@course_bp.route('/v1/courses', methods=['POST'])
@expects_json(CourseCreationSchema, check_formats=True)
@jwt_required()
def course_creation():
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course(
            color=g.data['color'],
            user_id=user,
            name=g.data['name'],
            description=g.data['description']
        )
        course.save()
        course_permission = CoursePermission(
            course_id=course,
            user_id=user,
            role=Role.TEACHER,
        )

        course_permission.save()
        return {
            "message": "Success",
            "course_id": course.uid
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

@course_bp.route('/v1/course/enroll/<course_id>', methods=['GET'])
@jwt_required()
def enroll(course_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid = course_id)
        if len(CoursePermission.objects(user_id = user, course_id = course)) != 0:
            return INVALID_INPUT_TUPLE
        course_permission = CoursePermission(
            course_id=course,
            user_id=user,
            role=Role.STUDENT,
        )
        course_permission.save()
        return {
            "message": "Success"
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

@course_bp.route('/v1/course/<strategy>/<course_id>', methods=['GET'])
@jwt_required()
def view_course(course_id, strategy):
    try:
        def user_strategy(user: User, course: Course):
            course_permission = CoursePermission.objects.get(course_id=course, user_id=user)
            if course_permission.role == Role.STUDENT and course.is_active:
                return {
                    "course": {
                        "name": course.name,
                        "color": course.color,
                        "description": course.description,
                        "published_at": course.published_at,
                        "created_by": str(course.user_id)
                    }
                }
            else:
                return UNAUTHORIZED_TUPLE

        def teacher_admin_strategy(user: User, course: Course):
            course_permission = CoursePermission.objects.get(course_id=course, user_id=user)
            if course_permission.role in [Role.ASSISTANT, Role.TEACHER] or user.type == UserType.ADMIN:
                return {
                    "course": {
                        "name": course.name,
                        "color": course.color,
                        "description": course.description,
                        "is_active": course.is_active,
                        "published_at": course.published_at,
                        "created_at": course.created_at,
                        "updated_at": course.updated_at,
                        "created_by": str(course.user_id)
                    }
                }
            else:
                return UNAUTHORIZED_TUPLE

        strategies = {"user": user_strategy, "admin": teacher_admin_strategy, "teacher": teacher_admin_strategy}
        if strategy not in strategies:
            return INVALID_INPUT_TUPLE
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)

        return strategies[strategy](user, course)
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

@course_bp.route('/v1/course/members/<course_id>', methods=['GET'])
@jwt_required()
def get_members(course_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)

        if CoursePermission.objects.get(course_id = course, user_id = user) == None:
            return INVALID_INPUT_TUPLE
        response = []
        for course_permission in CoursePermission.objects(course_id = course):
            course_permission: CoursePermission
            response.append({
                "id": str(course_permission.uid),
                "user": course_permission.user_id.contact.email,
                "role": course_permission.role.value,
                "created_at": course_permission.created_at,
                "updated_at": course_permission.updated_at
            })
        return {"course_permissions" : response}
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@course_bp.route('/v1/courses/<strategy>', methods=['GET'])
@jwt_required()
def view_courses(strategy):
    try:
        def user_strategy(user: User):
            courses = Course.objects()
            response = {"courses":[]}
            course: Course
            for course in courses:
                if not course.is_active:
                    continue
                course_response = {
                    "id": course.uid,
                    "color": course.color,
                    "name": course.name,
                    "created_by": str(course.user_id),
                    "description": course.description,
                    "published_at": course.published_at,
                    "is_enrolled": False
                }
                course_permission = CoursePermission.objects(user_id = user, course_id = course)
                if len(course_permission) > 0 and course_permission[0].role == Role.STUDENT:
                    course_response["is_enrolled"] = True
                response["courses"].append(course_response)
            return response

        def teacher_strategy(user: User):
            courses = Course.objects()
            response = {"courses":[]}
            course: Course
            for course in courses:
                course_response = {
                    "id": course.uid,
                    "color": course.color,
                    "name": course.name,
                    "created_by": str(course.user_id),
                    "description": course.description,
                    "published_at": course.published_at,
                    "created_at": course.created_at,
                    "updated_at": course.updated_at,
                    "role": None,
                    "is_active": course.is_active
                }
                course_permission = CoursePermission.objects(user_id = user, course_id = course)
                if len(course_permission) > 0 and course_permission[0].role in [ Role.ASSISTANT, Role.TEACHER]:
                    course_response["role"] = course_permission[0].role.value
                response["courses"].append(course_response)
            return response

        def admin_strategy(user: User):
            courses = Course.objects()
            response = {"courses":[]}
            course: Course
            for course in courses:
                course_response = {
                    "id": course.uid,
                    "color": course.color,
                    "name": course.name,
                    "created_by": str(course.user_id),
                    "description": course.description,
                    "published_at": course.published_at,
                    "created_at": course.created_at,
                    "updated_at": course.updated_at,
                    "is_active": course.is_active
                }
                response["courses"].append(course_response)
            return response
      
        strategies = {"user": user_strategy, "admin": admin_strategy, "teacher": teacher_strategy}
        if strategy not in strategies:
            return INVALID_INPUT_TUPLE
        user_id = get_jwt_identity()
        user: User = User.objects.get(uid=user_id)
        if strategy == "admin" and user.type != UserType.ADMIN:
            return UNAUTHORIZED_TUPLE
        return strategies[strategy](user)
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400


@course_bp.route('/v1/courses/<course_id>/announcements', methods=['POST'])
@expects_json(AnnouncementCreationSchema, check_formats=True)
@jwt_required()
def announcement_creation(course_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        if not course:
            abort(404, description="Course not found")
        if str(course.user_id.uid) != user_id:
            abort(401, description="Unauthorized")
        announcement = Announcement(
            course_id=course,
            user_id=user,
            text=g.data['text']
        )
        announcement.save()
        return {
            "message": "Success",
            "announcement_id": announcement.uid
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

@course_bp.route('/v1/courses/<course_id>/announcements', methods=['GET'])
@jwt_required()
def view_announcements(course_id):
    try:
        # TODO: Add strategies here
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        if not course:
            abort(404, description="Course not found")

        if user.type != UserType.ADMIN and not CoursePermission.objects.get(course_id=course, user_id=user):
            abort(401, description="Unauthorized")
        
        announcements = Announcement.objects(course_id = course)
        return {
            "announcements": [
                {
                    "uid":str(announcement.uid),
                    "created_by": str(announcement.user_id),
                    "text": announcement.text,
                    "created_at": announcement.created_at,
                    "updated_at": announcement.updated_at,
                    "is_active": announcement.is_active
                }
                for announcement in announcements # if announcement.is_active
            ]
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400


@course_bp.route('/v1/courses/<course_id>/assignments', methods=['POST'])
@expects_json(AssignmentCreationSchema, check_formats=True)
@jwt_required()
def assignment_creation(course_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        if not course:
            abort(404, description="Course not found")
        if str(course.user_id.uid) != user_id:
            abort(401, description="Unauthorized")

        start_date = g.data['start_date'].split('-')
        due_date = g.data['due_date'].split('-')
        if datetime.datetime(
                year=int(start_date[0]),
                month=int(start_date[1]),
                day=int(start_date[2])) >= datetime.datetime(
            year=int(due_date[0]),
            month=int(due_date[1]),
            day=int(due_date[2])
        ):
            abort(400, description="Start_date cannot be greater or equal than end_date")

        assignment = Assignment(
            course_id=course,
            user_id=user,
            title=g.data['title'],
            description = g.data['description'],
            start_date=g.data['start_date'],
            due_date=g.data['due_date']
        )
        assignment.save()
        return {
            "message": "Success",
            "assignment_id": assignment.uid
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

@course_bp.route('/v1/courses/<course_id>/assignments', methods=['GET'])
@jwt_required()
def view_assignments(course_id):
    def user_strategy(assignments: List[Assignment]):
        return {
            "assignments":[
                {
                    "uid":str(assignment.uid),
                    "created_by": str(assignment.user_id),
                    "title": assignment.title,
                    "description": assignment.description,
                    "start_date": assignment.start_date,
                    "due_date": assignment.due_date,
                }
                for assignment in assignments if assignment.is_active and assignment.start_date <= datetime.datetime.now()
            ]
        }
    def teacher_strategy(assignments: List[Assignment]):
        return {
            "assignments":[
                {
                    "uid": str(assignment.uid),
                    "created_by": str(assignment.user_id),
                    "title": assignment.title,
                    "description": assignment.description,
                    "start_date": assignment.start_date,
                    "due_date": assignment.due_date,
                    "is_active": assignment.is_active,
                    "updated_at": assignment.updated_at
                }
                for assignment in assignments
            ]
        }
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        assignments = Assignment.objects(course_id = course)
        if not course:
            abort(404, description="Course not found")

        if user.type == UserType.ADMIN:
            return teacher_strategy(assignments)
        course_permission = CoursePermission.objects(course_id = course, user_id = user)

        if len(course_permission) == 0:
            return UNAUTHORIZED_TUPLE
        course_permission = course_permission[0]
        if course_permission.role == Role.STUDENT:
            return user_strategy(assignments)
        else:
            return teacher_strategy(assignments)

    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400


@course_bp.route('/v1/courses/<course_id>/assignments/<assignment_id>/submission', methods=['POST'])
@jwt_required()
def submission_creation(course_id, assignment_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        assignment = Assignment.objects.get(uid=assignment_id)

        if not assignment:
            abort(404, description="Assignment not found")

        if not course:
            abort(404, description="Course not found")

        if not course.is_active:
            abort(404, description="Inactive course")

        course_permission = CoursePermission.objects.get(course_id=course, user_id=user)
        if course_permission.role != Role.STUDENT:
            abort(401, description="Invalid course permissions")

        if assignment.due_date < datetime.datetime.now() or assignment.start_date > datetime.datetime.now():
            abort(400, description="Cannot submit at this time")

        file = request.files.get('files')
        answer = request.form.get('answer')
        submission_link = ""
        if file and allowed_file(file.filename):
            content = file.read()
            session = boto3.Session(
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            )

            s3 = session.resource('s3')

            s3object = s3.Object(
                'submissions-1',
                str(user.uid) + '/' + str(assignment.uid) + '/' + file.filename
            )

            result = s3object.put(
                Body=content,
                ACL='public-read'
            )

            submission_link = 'https://{bkt}.s3.amazonaws.com/{uid}/{aid}/{fname}'.format(
                bkt="submissions-1",
                uid=str(user.uid),
                aid=str(assignment.uid),
                fname=file.filename
            )

        submission = Submission(
            course_id=course,
            user_id=user,
            assignment_id=assignment,
            answer=answer if answer else "",
            submission_link=submission_link if submission_link else ""
        )
        submission.save()
        return {
            "message": "Success",
            "submission_id": submission.uid
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

# Following view by suschaud@iu.edu
@course_bp.route('/v1/courses/<course_id>/assignments/<assignment_id>/submission', methods=['GET'])
@jwt_required()
def view_submissions(course_id,assignment_id):
    logging.warn('abc')
    def user_strategy(submissions: List[Submission], user):
        return {
            "submissions": [
            {
                "created_by": submission.user_id.serialize(),
                "title": submission.assignment_id.title,
                "user_response": submission.answer,
                "due_date": submission.assignment_id.due_date,
                "submission_date": submission.submission_date,
                "submission_link": submission.submission_link
            } 
            for submission in submissions if submission.user_id == user
            ]
        }

    def teacher_strategy(submissions: List[Submission]):
        logging.warn(len(submissions))
        return {
            "submissions": [
            {
                "created_by": submission.user_id.serialize(),
                "title": submission.assignment_id.title,
                "user_response": submission.answer,
                "due_date": submission.assignment_id.due_date,
                "submission_date": submission.submission_date,
                "submission_link": submission.submission_link
            }
            for submission in submissions
            ]
        }

    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        assignment = Assignment.objects.get(uid=assignment_id)
        if not course:
            abort(404, description="Course not found")
        if not assignment:
            abort(404, description="Assignment not found")

        course_permission = CoursePermission.objects.get(course_id=course, user_id=user)

        if not course_permission:
            abort(401, description="Unauthorized")

        course_permission = CoursePermission.objects(course_id = course, user_id = user)

        if len(course_permission) == 0 and user.type != UserType.ADMIN:
            return UNAUTHORIZED_TUPLE
        course_permission = course_permission[0]
        submissions = Submission.objects(course_id = course, assignment_id = assignment)
        logging.info('Returning submissions')
        if course_permission.role == Role.STUDENT:
            return user_strategy(submissions, user)
        else:
            return teacher_strategy(submissions)

    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400

# Following view by suschaud@iu.edu
@course_bp.route('/v1/courses/<course_id>/assignments/<assignment_id>/<submission_id>/modify', methods=['PATCH'])
@jwt_required()
@expects_json(SubmissionCreationSchema, check_formats=True)
def modify_submissions(course_id,assignment_id,submission_id):
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        assignment = Assignment.objects.get(uid=assignment_id)
        submission = Submission.objects.get(uid=submission_id)

        if not course:
            abort(404, description="Course not found")
        if not assignment:
            abort(404, description="Assignment not found")
        if submission.user_id != user:
            abort(400, description='Unauthorized')

        modified_response = g.data["answer"]
        submission.update(set__answer = modified_response)

        return {"message": "Success"}
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400
