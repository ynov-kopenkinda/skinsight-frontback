'use client'

import { Dialog, Box, Heading, Tabs, Button } from '@radix-ui/themes'
import React from 'react'
import TapBar from '../components/TapBar'
import { api } from '~/utils/api/react'
import { IconX } from '@tabler/icons-react'

interface Appointment {
  id: number;
  isAcceptedByDoctor: boolean;
  isAcceptedByPatient: boolean;
  location: string;
  patientId: number;
  doctorId: number;
  date: Date;
  doctor_name?: string;
  patient_name?: string;
}

function Appointments() {
  // If user is a doctor, get all appointments for the doctor so api.appointment.getAppointmentForDoctor.useQuery({ id: 1 });
  // TODO - AJOUTER UN DIALOG POUR TOUT LES RDVS AU CLICK ET AJOUTER UN RAPPEL DE LA PRECONSULTATION
  const appointments = api.appointment.getAppointmentForPatient.useQuery({ id: 1 });

  const pendingAppointments = appointments.data?.filter((appointment: Appointment) => !appointment.isAcceptedByPatient && new Date(appointment.date) > new Date());
  const acceptedAppointments = appointments.data?.filter((appointment: Appointment) => appointment.isAcceptedByPatient && new Date(appointment.date) > new Date());
  const previousAppointments = appointments.data?.filter((appointment: Appointment) => new Date(appointment.date) < new Date());

  return (
    <div>
      <div className="bg-primary -mx-4 -mt-2 flex justify-center px-4 pb-9 pt-9 mb-9 text-white md:-mx-16 md:px-16 lg:-mx-20 lg:px-20">
        <Heading as="h1" className="font-semibold! text-lg">
          Appointments
        </Heading>
      </div>
      <Tabs.Root defaultValue="Accepted">
        <Tabs.List>
          <Tabs.Trigger className='basis-1/3' value='Accepted'>Accepted</Tabs.Trigger>
          <Tabs.Trigger className='basis-1/3' value='Pending'>Pending</Tabs.Trigger>
          <Tabs.Trigger className='basis-1/3' value='Previous'>Previous</Tabs.Trigger>
        </Tabs.List>
        <Box px="4" py="4">
          <Tabs.Content value='Accepted'>
            {acceptedAppointments && acceptedAppointments.length > 0
              ? acceptedAppointments.map((appointment: Appointment) => {
                const appointment_date = new Date(appointment.date);
                const appointment_date_formatted = new Intl.DateTimeFormat("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(appointment_date);
                return (
                  <div key={appointment.id} className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center bg-[#f0fdf4] mb-4 last-of-type:mb-0">
                    <div className='flex flex-col'>
                      <p className='text-sm'>{appointment.location}</p>
                      <p className='text-sm font-bold'>Dr. {appointment.doctor_name}</p>
                    </div>
                    <p className='ml-auto'>{appointment_date_formatted}</p>
                  </div>
                )
              })
              : "You don't have any accepted appointments for the moment."}
          </Tabs.Content>
          <Tabs.Content value='Pending'>
            {pendingAppointments && pendingAppointments.length > 0
              ? pendingAppointments.map((appointment: Appointment) => {
                const appointment_date = new Date(appointment.date);
                const appointment_date_formatted = new Intl.DateTimeFormat("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(appointment_date);
                return (
                  <Dialog.Root key={appointment.id}>
                    <Dialog.Trigger>
                      <div key={appointment.id} className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center mb-4 last-of-type:mb-0">
                        <div className='flex flex-col'>
                          <p className='text-sm'>{appointment.location}</p>
                          <p className='text-sm font-bold'>Dr. {appointment.doctor_name}</p>
                        </div>
                        <p className='ml-auto'>{appointment_date_formatted}</p>
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Content className='relative'>
                      <Dialog.Title size={'4'} mb={'2'}>Appointment with Dr. {appointment.doctor_name}</Dialog.Title>
                      <Dialog.Description size={'2'}>You have to accept or decline this appointment.</Dialog.Description>
                      <Dialog.Close className='mt-6'>
                        <div className='flex gap-x-2 '>
                          <Button variant='solid' color='red' onClick={() => console.log(appointment.location + 'declined')}>Decline</Button>
                          <Button variant='solid' color='green' onClick={() => console.log(appointment.location + 'accepted')}>Accept</Button>
                        </div>
                      </Dialog.Close>
                      <Dialog.Close>
                        <button className="absolute top-[22px] right-[12px]" aria-label="Close">
                          <IconX size={"20"} />
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Root>
                )
              })
              : "You don't have any pending appointments for the moment."}
          </Tabs.Content>
          <Tabs.Content value='Previous'>
            {previousAppointments && previousAppointments.length > 0
              ? previousAppointments.map((appointment: Appointment) => {
                const appointment_date = new Date(appointment.date);
                const appointment_date_formatted = new Intl.DateTimeFormat("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(appointment_date);
                return (
                  <div key={appointment.id} className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center bg-[#fefce8] mb-4 last-of-type:mb-0">
                    <div className='flex flex-col'>
                      <p className='text-sm'>{appointment.location}</p>
                      <p className='text-sm font-bold'>Dr. {appointment.doctor_name}</p>
                    </div>
                    <p className='ml-auto'>{appointment_date_formatted}</p>
                  </div>
                )
              })
              : "You don't have any previous appointments for the moment."}
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      {/* <div className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center">

      </div> */}
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  )
}

export default Appointments
