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
    refetch: () => Promise<unknown>,
  ) => React.ReactNode;
}) => {
  const appointments = api.appointment.getAppointmentForPatient.useQuery({
    id: userId,
  });
  return <>{children(appointments.data ?? [], appointments.refetch)}</>;
};

const AppointmentsForDoctor = ({
  userId,
  children,
}: {
  userId: number;
  children: (
    app: RouterOutputs["appointment"]["getAppointmentForDoctor"],
    refetch: () => Promise<unknown>,
  ) => React.ReactNode;
}) => {
  const appointments = api.appointment.getAppointmentForDoctor.useQuery({
    id: userId,
  });
  return <>{children(appointments.data ?? [], appointments.refetch)}</>;
};

function Appointments() {
  const user = useUser();
  const data = api.user.getUserById.useQuery(
    { id: user.data!.id },
    { enabled: !!user.data?.id },
  );

  const PreloadUser =
    data.data?.userRole === "PATIENT"
      ? AppointmentsForPatient
      : AppointmentsForDoctor;

  if (!user.data) {
    return null;
  }

  return (
    <PreloadUser userId={user.data.id}>
      {(appointments, refetch) => (
        <AppointmentList
          appointments={appointments}
          role={data.data?.userRole === "PATIENT" ? "PATIENT" : "DOCTOR"}
          userId={user.data!.id}
          refetch={refetch}
        />
      )}
    </PreloadUser>
  );
}

export default Appointments;
