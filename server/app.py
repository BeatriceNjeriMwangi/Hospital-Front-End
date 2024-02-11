from flask import Flask,jsonify,request,make_response
from flask_migrate import Migrate
from flask_restful import Api,Resource
from models import db,Doctor,Patient,Appointment,Treatment
from flask_cors import CORS
from datetime import datetime
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION']=False
CORS(app)
migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
#get list of all doctors
class Doctors(Resource):
    def get (self):
        doctor =[{"id":doctor.id, "fname":doctor.fname,"lname":doctor.lname,"email":doctor.email,"password":doctor.password,"phone_number":doctor.phone_number,"regNo":doctor.regNo,"gender":doctor.gender} for doctor in Doctor.query.all()]
        return make_response(jsonify(doctor),200)
    def post(self):
        data = request.json
        if not data:
            return {"message": "Request body must be in JSON format"}, 400

        fname = data.get('fname')
        lname = data.get('lname')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('phone_number')
        regNo=data.get('regNo')
        gender=data.get('gender')

        if not all([fname,lname, email, password, phone_number,regNo,gender]):
            return {"message": "Please provide all fields"}, 400

        doctor = Doctor(fname=fname,lname=lname, email=email, password=password, phone_number=phone_number,regNo=regNo,gender=gender)
        db.session.add(doctor)
        db.session.commit()

        return {"message": "Doctor created successfully"}, 201
class DoctorById(Resource):
    def delete(self,id):
        doc =Doctor.query.filter_by(id=id).first()
        print(doc)
        db.session.delete(doc)
        db.session.commit()
        response_dict={'message': "Doctor deleted successfully"}
        return make_response(jsonify(response_dict),200)
    def patch(self,id):
        data =request.json
        new_email=data.get('email')

        if new_email != '':
            doctor = Doctor.query.filter_by(id=id).first()
            doctor.email=new_email
            db.session.add(doctor)
            db.session.commit()
            return {"message":"email updated successfully"},200
        

        
    
class Patients(Resource):
    def get (self):
        patient=[{"id":patient.id, "fname":patient.fname, "lname":patient.lname,"password":patient.password,"email":patient.email,"phone_number":patient.phone_number,"regNo":patient.regNo,"gender":patient.gender} for patient in Patient.query.all()]
        return make_response(jsonify(patient),200)
    def post(self):
        data=request.json
        if not data:
            return{"message": "does not exist"}
        fname=data.get('fname')
        lname=data.get('lname')
        password=data.get('password')
        email=data.get('email')
        phone_number=data.get('phone_number')
        regNo=data.get('regNo')
        gender=data.get('gender')

        patient=Patient(fname=fname,lname=lname, password=password, email=email,phone_number=phone_number, regNo=regNo, gender=gender)
        db.session.add(patient)
        db.session.commit()
        return {"message":"patient created successfully"}
    
class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id=id).first()
        if patient:
            patient_data = {
                "id": patient.id,
                "fname": patient.fname,
                "lname": patient.lname,
                "password":patient.password,
                "email": patient.email,
                "phone_number": patient.phone_number,
                "regNo":patient.regNo,
                "gender": patient.gender
            }
            return make_response(jsonify(patient_data), 200)
        else:
            return make_response(jsonify({"message": "Patient not found"}), 404)
    def patch(self,id):
        data=request.json
        new_phone=data.get('phone')
        if new_phone !=  '':
            patient=Patient.query.filter_by(id=id).first()
            patient.phone=new_phone
            db.session.add(patient)
            db.session.commit()
            return {"message":"patient updated successfully"}
        
class Appointments(Resource):
    def get(self):
        appointment=[{"id":appointment.id, "name":appointment.name}for appointment in Appointment.query.all()]
        return  make_response(jsonify(appointment),200)
    def post(self):
        data = request.json
        if not data:
            return{"message": "does not exist"}
        patients_id=data.get('patients_id')
        doctors_id=data.get('doctors_id')
        # appointment_date=data.get('appointment_date')
        appointment_date=datetime.strptime(data.get('appointment_date'), '%Y-%m-%d').date()
        appointment_time=datetime.strptime(data.get('appointment_time'), '%H:%M').time()
        # date=datetime.strptime(request.json['date'],'%Y-%m-%d').date()
        # time=datetime.strptime(request.json['time'], '%H:%M').time()
        # appointment_time=data.get('appointment_time')
        appointment = Appointment(patients_id=patients_id,doctors_id=doctors_id,appointment_date=appointment_date,appointment_time=appointment_time)
        db.session.add(appointment)
        db.session.commit()
        return {"message": "appointment created"} 
class AppointmentById(Resource):
    def patch(self,id):
        data=request.json
        
        new_appointment_date=data.get('new_appointment_date')
        if new_appointment_date !=  '':
            appointment=Appointment.query.filter_by(id=id).first()
            appointment.appointment_date=new_appointment_date
            db.session.add(appointment)
            db.session.commit()
            return {"message":"treatment updated successfully"}
class Treatments(Resource):
    def get(self):
        treatment=[{"id":treatment.id,"appointment_id":treatment.appointment_id,"doctors_id":treatment.doctors_id,"patients_id":treatment.patients_id,"progress":treatment.progress}for treatment in Treatment.query.all()]
        return make_response(jsonify(treatment),200)
    def post(self):
        data = request.json
        if not data:
            return{"message": "does not exist"}
        appointment_id=data.get('appointment_id')
        doctors_id=data.get('doctors_id')
        patients_id=data.get('patients_id')
        progress=data.get('progress')
        
        treatment = Treatment(appointment_id=appointment_id,doctors_id=doctors_id,patients_id=patients_id,progress=progress)
        db.session.add(treatment)
        db.session.commit()
        return {"message": "appointment created"} 
    
class TreatmentById(Resource):
    def get(self,id):
        treatment = Treatment.query.filter_by(id=id).first()
        if treatment:
            treatment_data = {
                "id": treatment.id,
                "appointment_id": treatment.appointment_id,
                "doctors_id": treatment.doctors_id,
                "patients_id": treatment.patients_id,
                "progress": treatment.progress

            }
            return make_response(jsonify(treatment_data), 200)
        else:
            return make_response(jsonify({"message": "Treatment not found"}), 404)
    def patch(self,id):
        data=request.json
        new_progress=data.get('new_progress')
        if new_progress !=  '':
            treatment=Treatment.query.filter_by(id=id).first()
            treatment.progress=new_progress
            db.session.add(treatment)
            db.session.commit()
            return {"message":"treatment updated successfully"}
    def delete(self,id):
        treatment=Treatment.query.filter_by(id=id).first()
        db.session.delete(treatment)
        db.session.commit()
        response_dict={'message':'treatment deleted successfully'}

        return make_response(jsonify(response_dict),200)
        

api.add_resource(Doctors,'/doctors')
api.add_resource(Patients,'/patients')
api.add_resource(DoctorById,'/doctors/<int:id>')
api.add_resource(PatientById,'/patients/<int:id>')
api.add_resource(Appointments,'/appointments')
api.add_resource(AppointmentById,'/appointments/<int:id>')
api.add_resource(Treatments,'/treatments')
api.add_resource(TreatmentById,'/treatments/<int:id>')
if __name__ == '__main__':
    app.run(port=5555,debug=True)