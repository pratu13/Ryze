import logging
from flask import Blueprint, g, request, abort
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..validators.entity import EntityDisableSchema
from ..models.user import User, UserType
from ..models.announcement import Announcement
from ..models.assignment import Assignment
from ..models.course import Course

entity_bp = Blueprint('entity_bp', __name__)


@entity_bp.route('/v1/entities', methods=['PUT'])
@expects_json(EntityDisableSchema, check_formats=True)
@jwt_required()
def entity_disable():
    try:
        def courses_disable_strategy(entities, is_block):
            for entity in entities:
                Course.objects.filter(uid=entity).update(
                    is_active=False if is_block else True
                )

        def announcements_disable_strategy(entities, is_block):

            for entity in entities:
                Announcement.objects.filter(
                    uid=entity
                ).update(is_active=False if is_block else True)

        def assignments_disable_strategy(entities, is_block):
            for entity in entities:
                Assignment.objects.filter(
                    uid=entity
                ).update(is_active=False if is_block else True)

        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        strategy = request.args.get('strategy')
        block = request.args.get('block')
        if not strategy:
            abort(404, description='Strategy not found')

        if not block:
            abort(404, description='No blocking type')

        entity_disable_strategy = {
            'courses':  courses_disable_strategy,
            'announcements': announcements_disable_strategy,
            'assignments': assignments_disable_strategy
        }
        if user.type == UserType.ADMIN:
            entity_disable_strategy[strategy](
                g.data['entities'],
                True if block == "true" else False
            )
        return {
            "message": "Success"
        }
    except Exception as e:
        logging.exception(e)
        return {"message": str(e)}, 400
