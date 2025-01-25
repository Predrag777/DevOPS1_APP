import { Router } from 'express';
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from '../controller/patient.controller';

const patientRoutes = Router();

patientRoutes.route('/')
  .get(getPatients)


export default patientRoutes;