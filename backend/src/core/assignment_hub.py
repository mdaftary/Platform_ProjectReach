# Functions related to assignment hub features
from .models import Assignment, AssignmentSubmission, AssignmentFeedback, AssignmentDiscussion
from bson import ObjectId
from pymongo import ReturnDocument

class AssignmentDAL:
    def __init__(self, assignment_collection):
        self.assignment_collection = assignment_collection

