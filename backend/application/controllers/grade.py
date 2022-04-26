from datetime import datetime
import logging
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models.grade import Grade
from ..validators.grade import CreateGradeSchema, UpdateGradeSchema

from ..models.course import Course
from ..models.course_permission import CoursePermission, Role
from ..models.user import User
from ..models.assignment import Assignment

grade_bp = Blueprint('grade_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)


@grade_bp.route('/v1/grade/<assignment_id>', methods=['POST'])
@jwt_required()
@expects_json(CreateGradeSchema, check_formats=True)
def grade_assignment(assignment_id):
    try:
        grader = User.objects.get(uid = get_jwt_identity())
        user = User.objects.get(uid = g.data["user"])
        assignment = Assignment.objects.get(uid = assignment_id)
        if CoursePermission.objects.get(course_id = assignment.course_id, \
                                        user_id = grader, role = Role.TEACHER) == None:
            return UNAUTHORIZED_TUPLE
        if len(Grade.objects(assignment = assignment, user = user)) > 0:
            return INVALID_INPUT_TUPLE
        grade = Grade(assignment = assignment, user = user, \
                      score = g.data["score"], max_score = g.data["max_score"], \
                      graded_by = grader, comment = g.data.get("comment", ""))
        grade.save()

        return {
            "grade":{
                "uid": str(grade.uid),
                "assignment": str(assignment.uid),
                "score": grade.score,
                "max_score": grade.max_score,
                "graded_by": grader.serialize(),
                "user": user.serialize()
            } 
        }
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@grade_bp.route('/v1/grade/<grade_id>', methods=['PATCH'])
@jwt_required()
@expects_json(UpdateGradeSchema, check_formats=True)
def update_grade(grade_id):
    try:
        grader = User.objects.get(uid = get_jwt_identity())
        grade = Grade.objects.get(uid = grade_id)
        if CoursePermission.objects.get(course_id = grade.assignment.course_id, \
                                        user_id = grader, role = Role.TEACHER) == None:
            return UNAUTHORIZED_TUPLE
        
        grade.update(score = g.data.get("score", grade.score))
        grade.update(max_score = g.data.get("max_score", grade.max_score))
        grade.update(comment = g.data.get("comment", grade.comment))
        grade.update(graded_by = grader)
        grade.update(updated_at = datetime.now())
        grade = Grade.objects.get(uid = grade_id)

        return {
            "grade":{
                "uid": str(grade.uid),
                "assignment": str(grade.assignment.uid),
                "score": grade.score,
                "max_score": grade.max_score,
                "graded_by": grader.serialize(),
                "user": grade.user.serialize()
            } 
        }
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@grade_bp.route('/v1/grade/<assignment_id>', methods=['GET'])
@jwt_required()
def view_grades(assignment_id):
    def teacher_strategy(assignment, user):
        try: 
            grades = Grade.objects(assignment = assignment)
            if CoursePermission.objects.get(course_id = assignment.course_id, \
                                            user_id = user, role = Role.TEACHER) == None:
                return UNAUTHORIZED_TUPLE
            grades_response = {"grades": []}
            for grade in grades:
                grade: Grade
                grades_response["grades"] += [
                    {
                        "uid": str(grade.uid),
                        "assignment": str(grade.assignment.uid),
                        "score": grade.score,
                        "max_score": grade.max_score,
                        "graded_by": grade.graded_by.serialize(),
                        "user": grade.user.serialize(),
                        "updated_at": grade.updated_at,
                        "comment": grade.comment
                    } 
                ]
            return grades_response
        except Exception as e:
            logging.exception(e)
            return INVALID_INPUT_TUPLE
    def student_strategy(assignment, user):
        try: 
            grades = Grade.objects(assignment = assignment, user = user)
            if CoursePermission.objects.get(course_id = assignment.course_id, \
                                            user_id = user) == None:
                return UNAUTHORIZED_TUPLE
            grades_response = {"grades": []}
            for grade in grades:
                grade: Grade
                grades_response["grades"] += [
                    {
                        "uid": str(grade.uid),
                        "assignment": str(grade.assignment.uid),
                        "score": grade.score,
                        "max_score": grade.max_score,
                        "graded_by": grade.graded_by.serialize(),
                        "user": grade.user.serialize(),
                        "updated_at": grade.updated_at,
                        "comment": grade.comment
                    } 
                ]
            return grades_response
        except Exception as e:
            logging.exception(e)
            return INVALID_INPUT_TUPLE
    try:
        user = User.objects.get(uid = get_jwt_identity())
        assignment = Assignment.objects.get(uid = assignment_id)

        if CoursePermission.objects.get(course_id = assignment.course_id, \
                                            user_id = user).role == Role.TEACHER:
            return teacher_strategy(assignment, user)
        else:
            return student_strategy(assignment, user)
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE


@grade_bp.route('/v1/grade/course/<course_id>', methods=['GET'])
@jwt_required()
def view_grades_by_course(course_id):
    def teacher_strategy(course, user):
        try: 
            assignments = Assignment.objects(course_id = course)
            grades = sorted(Grade.objects(assignemnt__in = assignments), key = lambda grade: grade.updated_at)
            grades_response = {"grades": []}
            for grade in grades:
                grade: Grade
                grades_response["grades"] += [
                    {
                        "uid": str(grade.uid),
                        "assignment": str(grade.assignment.uid),
                        "score": grade.score,
                        "max_score": grade.max_score,
                        "graded_by": grade.graded_by.serialize(),
                        "user": grade.user.serialize(),
                        "updated_at": grade.updated_at,
                        "comment": grade.comment
                    }
                ]
            return grades_response
        except Exception as e:
            logging.exception(e)
            return INVALID_INPUT_TUPLE
    def student_strategy(course, user):
        try: 
            assignments = Assignment.objects(course_id = course)
            grades = sorted(Grade.objects(assignment__in = assignments, user = user), key = lambda grade: grade.updated_at)
            grades_response = {"grades": []}
            for grade in grades:
                grade: Grade
                grades_response["grades"] += [
                    grade.serialize()
                ]
            return grades_response
        except Exception as e:
            logging.exception(e)
            return INVALID_INPUT_TUPLE
    try:
        user = User.objects.get(uid = get_jwt_identity())
        course = Course.objects.get(uid = course_id)

        if CoursePermission.objects.get(course_id = course, \
                                            user_id = user).role == Role.TEACHER:
            return teacher_strategy(course, user)
        else:
            return student_strategy(course, user)
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE