"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)
@api.route('/register', methods=['POST'])
def handle_register():

    request_body = request.get_json()
    user_email = request_body.get("email", None)
    user_password = request_body.get("password", None)
    user_is_active = request_body.get("user_is_active", True)


    if not user_email or not user_password:
        return jsonify({"error": "Email and password are required"}), 401
    existent_user = User.query.filter_by(email=user_email).first()
    if existent_user:
        return 'the user already exists', 401
    new_user = User(
        email= user_email,
        password= user_password,
        is_active= user_is_active
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route("/login", methods=["POST"])
def login():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)
    if not user_email or not user_password:
        return jsonify({"error": "Email and password are required"}), 401
    user = User.query.filter_by(email=user_email, password=user_password).first()
    if user is None:
        return jsonify({"msg":"invalid email or password"}), 401
    access_token = create_access_token(identity=user.id)
    print(f"Token: {access_token}, ID: {user.id}")
    return jsonify({"token": access_token, "user_id": user.id}), 200

@jwt_required()
def private():
    
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    print(f", ID: {user.id}, Password: {user.password}")
    return jsonify({"id": user.id, "email": user.email }), 200

