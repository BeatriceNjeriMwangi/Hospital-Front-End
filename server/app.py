from flask import Flask,jsonify,request,make_response
from flask_migrate import Migrate
from flask_restful import Api,Resource
from models import db,Doctor,Patient,Appointment,Treatment
from flask_cors import CORS
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
        doctor =[{"id":doctor.id, "name":doctor.name,"email":doctor.email,"departmentID":doctor.departmentID,"Schedule":doctor.schedule} for doctor in Doctor.query.all()]
        return make_response(jsonify(doctor),200)
    def post(self):
        data = request.json
        if not data:
            return {"message": "Request body must be in JSON format"}, 400

        name = data.get('name')
        email = data.get('email')
        departmentID = data.get('departmentID')
        schedule = data.get('schedule')

        if not all([name, email, departmentID, schedule]):
            return {"message": "Please provide name, email, departmentID, and schedule"}, 400

        doctor = Doctor(name=name, email=email, departmentID=departmentID, schedule=schedule)
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
        patient=[{"id":patient.id, "name":patient.name,"gender":patient.gender,"email":patient.email,"medicalhistory":patient.medical_history} for patient in Patient.query.all()]
        return make_response(jsonify(patient),200)
    def post(self):
        data=request.json
        if not data:
            return{"message": "does not exist"}
        name=data.get('name')
        gender=data.get('gender')
        email=data.get('email')
        medical_history=data.get('medical_history')
        address=data.get('address')
        phone=data.get('phone')

        patient=Patient(name=name, gender=gender, email=email,medical_history=medical_history, address=address, phone=phone)
        db.session.add(patient)
        db.session.commit()
        return {"message":"patient created successfully"}
    
class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id=id).first()
        if patient:
            patient_data = {
                "id": patient.id,
                "name": patient.name,
                "gender": patient.gender,
                "email": patient.email,
                "medical_history": patient.medical_history
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
        name=data.get('name')
        patient_id=data.get('patient_id')
        doctor_id=data.get('doctor_id')
        appointment = Appointment(name=name,patient_id=patient_id,doctor_id=doctor_id)
        db.session.add(appointment)
        db.session.commit()
        return {"message": "appointment created"} 
class Treatments(Resource):
    def get(self):
        treatment=[{"id":treatment.id,"appointment_id":treatment.appointment_id,"doctors_id":treatment.doctors_id,"patients_id":treatment.patients_id,"diagnosis":treatment.diagnosis,"prescription":treatment.prescription}for treatment in Treatment.query.all()]
        return make_response(jsonify(treatment),200)
    def post(self):
        data = request.json
        if not data:
            return{"message": "does not exist"}
        appointment_id=data.get('appointment_id')
        doctors_id=data.get('doctors_id')
        patients_id=data.get('patients_id')
        diagnosis=data.get('diagnosis')
        prescription=data.get('prescription')
        
        treatment = Treatment(appointment_id=appointment_id,doctors_id=doctors_id,patients_id=patients_id,diagnosis=diagnosis,prescription=prescription)
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
                "diagnosis": treatment.diagnosis,
                "prescription": treatment.prescription

            }
            return make_response(jsonify(treatment_data), 200)
        else:
            return make_response(jsonify({"message": "Treatment not found"}), 404)

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
api.add_resource(Treatments,'/treatments')
api.add_resource(TreatmentById,'/treatments/<int:id>')
if __name__ == '__main__':
    app.run(port=5555,debug=True)