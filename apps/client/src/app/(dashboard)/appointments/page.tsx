'use client'

import { Box, Heading, Tabs } from '@radix-ui/themes'
import React from 'react'
import TapBar from '../components/TapBar'
import { api } from '~/utils/api/react'

interface Appointment {
  id: number;
  isAcceptedByDoctor: boolean;
  isAcceptedByPatient: boolean;
  location: string;
  patientId: number;
  doctorId: number;
  date: Date;
}

function Appointments() {
  const appointments = api.appointment.getAppointmentForUser.useQuery({ id: 1 });

  const pendingAppointments: Appointment[] = appointments.data?.filter((appointment: Appointment) => !appointment.isAcceptedByPatient);
  const acceptedAppointments: Appointment[] = appointments.data?.filter((appointment: Appointment) => appointment.isAcceptedByPatient);

  return (
    <div>
      <div className="bg-primary -mx-4 -mt-2 flex justify-center px-4 pb-9 pt-9 mb-9 text-white md:-mx-16 md:px-16 lg:-mx-20 lg:px-20">
        <Heading as="h1" className="font-semibold! text-lg">
          Appointments
        </Heading>
      </div>
      <Tabs.Root defaultValue="Accepted">
        <Tabs.List>
          <Tabs.Trigger value='Accepted'>Accepted</Tabs.Trigger>
          <Tabs.Trigger value='Pending'>Pending</Tabs.Trigger>
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
                  <div key={appointment.id} className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center">
                    <p>{appointment.location}</p>
                    <p>{appointment_date_formatted}</p>
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
                  <div key={appointment.id} className="flex gap-x-4 p-4 shadow-lg border border-slate-100 rounded-xl items-center">
                    <p>{appointment.location}</p>
                    <p>{appointment_date_formatted}</p>
                  </div>
                )
              })
              : "You don't have any pending appointments for the moment."}
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
