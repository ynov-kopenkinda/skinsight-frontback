/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Appointment = {
  id: number;
  doctorId: number;
  patientId: number;
  isAcceptedByDoctor: boolean;
  isAcceptedByPatient: boolean;
  location: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  doctor_name?: string;
  patient_name?: string;
};
