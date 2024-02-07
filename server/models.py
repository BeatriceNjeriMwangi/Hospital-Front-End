from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db=SQLAlchemy(metadata=metadata)

class Doctor(db.Model,SerializerMixin):
    __tablename__ = 'doctors'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    email=db.Column(db.String)
    departmentID=db.Column(db.Integer)
    schedule=db.Column(db.String)

    patient=db.relationship("Patient",secondary="appointments",backref="doctors",viewonly=True)
    appointment=db.relationship("Appointment",backref="doctors")
    treatment=db.relationship("Treatment",backref="doctors")

class Patient(db.Model,SerializerMixin):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    gender=db.Column(db.String)
    email=db.Column(db.String)
    medical_history=db.Column(db.String)
    address=db.Column(db.String)
    phone=db.Column(db.String)

    appointment=db.relationship("Appointment",backref="patients")
    treatment=db.relationship("Treatment",backref="patients")


class Appointment(db.Model,SerializerMixin):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    patients_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
    doctors_id = db.Column(db.Integer, db.ForeignKey("doctors.id"))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)

    treatment=db.relationship("Treatment",backref="appointments")


class Treatment(db.Model,SerializerMixin):
    __tablename__ = 'treatments'
    id = db.Column(db.Integer,primary_key=True)
    appointment_id = db.Column(db.Integer ,db.ForeignKey("appointments.id"))
    doctors_id = db.Column(db.Integer,db.ForeignKey("doctors.id"))
    patients_id=db.Column(db.Integer, db.ForeignKey("patients.id"))
    diagnosis = db.Column(db.String)
    prescription=db.Column(db.String)