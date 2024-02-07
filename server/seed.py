from models import db, Doctor, Patient, Appointment, Treatment
from app import app

def seed_data():
    db.session.query(Doctor).delete()
    db.session.query(Patient).delete()
    db.session.query(Appointment).delete()
    db.session.query(Treatment).delete()
    db.session.commit()
    # Create doctors

    doctor1 = Doctor(name="Dr. Smith", email="dr.smith@example.com", departmentID=1, schedule="Mon-Fri")
    doctor2 = Doctor(name="Dr. Johnson", email="dr.johnson@example.com", departmentID=2, schedule="Tue-Sat")
    db.session.add(doctor1)
    db.session.add(doctor2)
    
    # Create patients
    patient1 = Patient(name="John Doe", gender="Male", email="john.doe@example.com", medical_history="None", address="123 Main St", phone="555-1234")
    patient2 = Patient(name="Jane Smith", gender="Female", email="jane.smith@example.com", medical_history="Allergies", address="456 Elm St", phone="555-5678")
    db.session.add(patient1)
    db.session.add(patient2)
    db.session.commit()  # Commit patients first to obtain their IDs
    
    # Create appointments
    appointment1 = Appointment(name="Appointment 1", patients_id=patient1.id, doctors_id=doctor1.id)
    appointment2 = Appointment(name="Appointment 2", patients_id=patient2.id, doctors_id=doctor2.id)
    db.session.add(appointment1)
    db.session.add(appointment2)
    db.session.commit()  # Commit appointments to obtain their IDs
    
    # Create treatments
    treatment1 = Treatment(appointment_id=appointment1.id, doctors_id=doctor1.id, patients_id=patient1.id, diagnosis="Fever", prescription="Paracetamol")
    treatment2 = Treatment(appointment_id=appointment2.id, doctors_id=doctor2.id, patients_id=patient2.id, diagnosis="Allergy", prescription="Antihistamine")
    db.session.add(treatment1)
    db.session.add(treatment2)
    
    # Commit the changes
    db.session.commit()
    

if __name__ == '__main__':
    with app.app_context():
        seed_data()
