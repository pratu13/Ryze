import logging
from typing import List
from flask import Blueprint, g, abort
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

course_bp = Blueprint('course_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)

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
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course.objects.get(uid=course_id)
        if not course:
            abort(404, description="Course not found")

        course_permission = CoursePermission.objects.get(course_id=course, user_id=user)

        if not course_permission:
            abort(401, description="Unauthorized")
        
        announcements = Announcement.objects(course_id = course)
        return {
            "announcements": [
                {
                    "created_by": str(announcement.user_id),
                    "text": announcement.text,
                    "created_at": announcement.created_at,
                    "updated_at": announcement.updated_at
                }
                for announcement in announcements if announcement.is_active
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
            abort(400, description="Start_date cannot be greater or "
                                   "equal than end_date")

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
        if not course:
            abort(404, description="Course not found")
        course_permission = CoursePermission.objects(course_id = course, user_id = user)

        if len(course_permission) == 0 and user.type != UserType.ADMIN:
            return UNAUTHORIZED_TUPLE
        course_permission = course_permission[0]
        assignments = Assignment.objects(course_id = course)
        if course_permission.role == Role.STUDENT:
            return user_strategy(assignments)
        else:
            return teacher_strategy(assignments)

    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400
