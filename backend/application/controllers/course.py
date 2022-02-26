import logging
from flask import Blueprint, g, abort
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..validators.course import CourseCreationSchema
from ..validators.announcement import AnnouncementCreationSchema
from ..validators.assignment import AssignmentCreationSchema
from ..models.course import Course
from ..models.course_permission import CoursePermission, Role
from ..models.user import User
from ..models.announcement import Announcement
from ..models.assignment import Assignment
import datetime

course_bp = Blueprint('course_bp', __name__)


@course_bp.route('/v1/courses', methods=['POST'])
@expects_json(CourseCreationSchema, check_formats=True)
@jwt_required()
def course_creation():
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        course = Course(
            color=g.data['name'],
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
