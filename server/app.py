from flask import Flask,jsonify,request,make_response
from flask_migrate import Migrate
from flask_restful import Api,Resource
from models import db,Doctor,Patient,Appointment,Treatment

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION']=False

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
        

        # record =Doctor.query.filter_by(id=id).first()
        # for word in request.json:
        #     setword(record, word,request.json[word])

        # db.session.add(record)
        # db.session.commit()
        # response_dict={"message":"successfully updated"}
        # return make_response(jsonify(response_dict),200)

    
class Patients(Resource):
    def get (self):
        patient=[{"id":patient.id, "name":patient.name,"gender":patient.gender,"email":patient.email,"medicalhistory":patient.medical_history} for patient in Patient.query.all()]
        return make_response(jsonify(patient),200)
api.add_resource(Doctors,'/doctors')
api.add_resource(Patients,'/patients')
api.add_resource(DoctorById,'/doctors/<int:id>')
if __name__ == '__main__':
    app.run(port=5555,debug=True)