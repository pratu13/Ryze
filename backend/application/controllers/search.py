from datetime import datetime
import logging
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.announcement import Announcement
from ..models.assignment import Assignment
from ..models.course import Course
from ..models.course_permission import CoursePermission

from ..models.user import User
from ..validators.search import AdvancedSearchSchema, SimpleSearchSchema


search_bp = Blueprint('search_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)


@search_bp.route('/v1/search/', methods=['POST'])
@expects_json(SimpleSearchSchema, check_formats=True)
@jwt_required()
def simple_search():
    try:
        search_query = g.data['query']
        user_id = get_jwt_identity()
        user = User.objects.get(uid = user_id)
        courses = Course.objects

        results = []
        for course in courses:
            course: Course
            is_added = False
            if str(course.user_id).count(search_query) > 0 or \
               (course.description != None and course.description.count(search_query) > 0) or \
               (course.name != None and course.name.count(search_query) > 0):
               results += [course]
            elif len(CoursePermission.objects(user_id = user, course_id = course)) > 0:
                for announcement in Announcement.objects(course_id = course):
                    if announcement.text.count(search_query) > 0:
                        results += [course]
                        is_added = True
                        break
                if not is_added:
                    for assignment in Assignment.objects(course_id = course):
                        if assignment.title.count(search_query) > 0 or \
                           assignment.description.count(search_query) > 0:
                           results += [course]
                           break
        if g.data.get('sortby', None) ==  "date":
            sorting_lambda = lambda x: x.created_at
        else:
            sorting_lambda = lambda x: x.name
        results = sorted(results, key = sorting_lambda)
        return {"courses": [course.serialize() for course in results]}

    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@search_bp.route('/v1/advanced_search/', methods=['POST'])
@expects_json(AdvancedSearchSchema, check_formats=True)
@jwt_required()
def advanced_search():
    try:
        search_query = g.data['query']
        user_id = get_jwt_identity()
        user = User.objects.get(uid = user_id)
        courses = Course.objects

        announcements = []
        assignments = []
        for course in courses:
            course: Course
            if len(CoursePermission.objects(user_id = user, course_id = course)) > 0:
                if g.data["field"] == "announcement":
                    for announcement in Announcement.objects(course_id = course):
                        if announcement.text.count(search_query) > 0:
                            announcements += [announcement]
                elif g.data["field"] == "assignment":
                    for assignment in Assignment.objects(course_id = course):
                        if assignment.title.count(search_query) > 0 or \
                           assignment.description.count(search_query) > 0:
                           assignments += [assignment]

        if g.data.get('sortby', None) ==  "date":
            sorting_lambda_announcement = lambda x: x.created_at
            sorting_lambda_assignment = lambda x: x.created_at
        else:
            sorting_lambda_announcement = lambda x: x.text
            sorting_lambda_assignment = lambda x: x.title
        announcements = sorted(announcements, key = sorting_lambda_announcement)
        assignments = sorted(assignments, key = sorting_lambda_assignment)
        
        return {
            "announcements": [announcement.serialize() for announcement in announcements],
            "assignments": [assignment.serialize() for assignment in assignments]
        }

    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE
                      
