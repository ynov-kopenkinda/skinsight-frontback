"use client";

import React from "react";

import { useUser } from "~/shared/hooks/useUser";
import { api } from "~/utils/api/react";
import type { RouterOutputs } from "~/utils/api/shared";
import { AppointmentList } from "./appointment-list";

const AppointmentsForPatient = ({
  userId,
  children,
}: {
  userId: number;
  children: (
    app: RouterOutputs["appointment"]["getAppointmentForPatient"],
  ) => React.ReactNode;
}) => {
  const appointments = api.appointment.getAppointmentForPatient.useQuery({
    id: userId,
  });
  return <>{children(appointments.data ?? [])}</>;
};

const AppointmentsForDoctor = ({
  userId,
  children,
}: {
  userId: number;
  children: (
    app: RouterOutputs["appointment"]["getAppointmentForDoctor"],
  ) => React.ReactNode;
}) => {
  const appointments = api.appointment.getAppointmentForDoctor.useQuery({
    id: userId,
  });
  return <>{children(appointments.data ?? [])}</>;
};

function Appointments() {
  const user = useUser();
  const PreloadUser =
    user.data?.userRole === "PATIENT"
      ? AppointmentsForPatient
      : AppointmentsForDoctor;

  if (!user.data) {
    return null;
  }

  return (
    <PreloadUser userId={user.data.id}>
      {(appointments) => (
        <AppointmentList
          appointments={appointments}
          role={user.data?.userRole === "PATIENT" ? "patient" : "doctor"}
        />
      )}
    </PreloadUser>
  );
}

export default Appointments;
