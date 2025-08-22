from pydantic import BaseModel
from typing_extensions import List, Optional
from uuid import uuid4
from datetime import datetime

class Student(BaseModel):
    id: str = str(uuid4())
    name: str
    username: str
    password: str
    email: Optional[str] = None
    phone: Optional[str] = None
    verification_code: str = str(uuid4())
    guardian_name: str
    school: str
    scores: List[float] = []
    badges: List[int] = []
    verified: bool = False

class Volunteer(BaseModel):
    id: str = str(uuid4())
    name: str
    username: str
    password: str
    email: Optional[str] = None
    phone: Optional[str] = None
    verification_code: str = str(uuid4())
    school: str
    volunteer_hours: float
    badges: List[str]
    verified: bool = False

class Admin(BaseModel):
    id: str = str(uuid4())
    name: str
    username: str
    password: str
    verification_code: str = str(uuid4())
    verified: bool = False
    
class Assignment(BaseModel):
    id: str = str(uuid4())
    title: str
    description: str
    path: str
    due_date: datetime
    max_score: float

class AssignmentSubmission(BaseModel):
    assignment_id: str
    student_id: str
    submissions: List[str]
    score: float
    feedback: str

class AssignmentFeedback(BaseModel):
    assignment_id: str
    student_id: str
    feedback: str

class AssignmentDiscussion(BaseModel):
    id: str = str(uuid4())
    assignment_id: str
    student_id: str
    comments: List[str] = [] # Comment ids

    
class Discussion(BaseModel):
    id: str = str(uuid4())
    student_id: str
    comments: List[str] = []  # Comment ids


class Comment(BaseModel):
    student_id: str = str(uuid4())
    content: str
    attachments: List[str] = []  # List of attachment paths
    timestamp: datetime

class Badge(BaseModel):
    badge_id: str
    badge_path: str