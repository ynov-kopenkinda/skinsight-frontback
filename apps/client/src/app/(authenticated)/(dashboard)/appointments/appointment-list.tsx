import { Box, Button, Dialog, Heading, Tabs } from "@radix-ui/themes";
import { IconX } from "@tabler/icons-react";

import { api } from "~/utils/api/react";
import type { RouterOutputs } from "~/utils/api/shared";
import TapBar from "../components/TapBar";
import { getFormatter } from "../messages/[id]/components/Message";

export const AppointmentList = ({
  appointments,
  role,
  userId,
  refetch,
}: {
  appointments: RouterOutputs["appointment"]["getAppointmentForPatient"];
  role: "PATIENT" | "DOCTOR";
  userId: number;
  refetch: () => Promise<unknown>;
}) => {
  const pendingAppointments = appointments.filter(
    (appointment) =>
      !appointment.isAcceptedByDoctor &&
      new Date(appointment.date) > new Date(),
  );
  const acceptedAppointments = appointments.filter(
    (appointment) =>
      appointment.isAcceptedByDoctor &&
      appointment.isAcceptedByPatient &&
      new Date(appointment.date) > new Date(),
  );
  const previousAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) < new Date(),
  );

  const { mutate: acceptAppointment } =
    api.appointment.acceptAppointment.useMutation();

  const { mutate: declineAppointment } =
    api.appointment.declineAppointment.useMutation();

  return (
    <div>
      <div className="bg-primary -mx-4 -mt-2 mb-9 flex justify-center px-4 pb-9 pt-9 text-white md:-mx-16 md:px-16 lg:-mx-20 lg:px-20">
        <Heading as="h1" className="font-semibold! text-lg">
          Appointments
        </Heading>
      </div>
      <Tabs.Root defaultValue="Accepted">
        <Tabs.List>
          <Tabs.Trigger className="basis-1/3" value="Accepted">
            Accepted
          </Tabs.Trigger>
          <Tabs.Trigger className="basis-1/3" value="Pending">
            Pending
          </Tabs.Trigger>
          <Tabs.Trigger className="basis-1/3" value="Previous">
            Previous
          </Tabs.Trigger>
        </Tabs.List>
        <Box px="4" py="4">
          <Tabs.Content value="Accepted">
            {acceptedAppointments && acceptedAppointments.length > 0
              ? acceptedAppointments.map((appointment) => {
                  const appointment_date = new Date(appointment.date);
                  const appointment_date_formatted =
                    getFormatter().format(appointment_date);
                  return (
                    <div
                      key={appointment.id}
                      className="mb-4 flex items-center gap-x-4 rounded-xl border border-slate-100 bg-[#f0fdf4] p-4 shadow-lg last-of-type:mb-0"
                    >
                      <div className="flex flex-col">
                        <p className="text-sm">{appointment.location}</p>
                        <p className="text-sm font-bold">
                          {role === "DOCTOR"
                            ? "Patient " + appointment.patient_name
                            : "Dr " + appointment.doctor_name}
                        </p>
                      </div>
                      <p className="ml-auto flex-shrink-0 text-sm">
                        {appointment_date_formatted}
                      </p>
                    </div>
                  );
                })
              : "You don't have any accepted appointments for the moment."}
          </Tabs.Content>
          <Tabs.Content value="Pending">
            {pendingAppointments && pendingAppointments.length > 0
              ? pendingAppointments.map((appointment) => {
                  const appointment_date = new Date(appointment.date);
                  const appointment_date_formatted =
                    getFormatter().format(appointment_date);
                  return (
                    <Dialog.Root key={appointment.id}>
                      <Dialog.Trigger>
                        <div
                          key={appointment.id}
                          className="mb-4 flex items-center gap-x-4 rounded-xl border border-slate-100 p-4 shadow-lg last-of-type:mb-0"
                        >
                          <div className="flex flex-col">
                            <p className="text-sm">{appointment.location}</p>
                            <p className="text-sm font-bold">
                              {role === "DOCTOR"
                                ? "Patient " + appointment.patient_name
                                : "Dr. " + appointment.doctor_name}
                            </p>
                          </div>
                          <p className="ml-auto flex-shrink-0 text-sm">
                            {appointment_date_formatted}
                          </p>
                        </div>
                      </Dialog.Trigger>
                      <Dialog.Content className="relative">
                        <Dialog.Title size={"4"} mb={"2"}>
                          Appointment with Dr.&nbsp;{appointment.doctor_name}
                        </Dialog.Title>
                        <Dialog.Description size={"2"}>
                          You have to accept or decline this appointment.
                        </Dialog.Description>
                        <Dialog.Close className="mt-6">
                          <div className="flex gap-x-2 ">
                            <Button
                              variant="solid"
                              color="red"
                              onClick={() => {
                                declineAppointment({
                                  userId: userId,
                                  appointmentId: appointment.id,
                                });
                                refetch().catch(console.error);
                              }}
                            >
                              Decline
                            </Button>
                            <Button
                              variant="solid"
                              color="green"
                              onClick={() => {
                                acceptAppointment({
                                  userId: userId,
                                  appointmentId: appointment.id,
                                });
                                refetch().catch(console.error);
                              }}
                            >
                              Accept
                            </Button>
                          </div>
                        </Dialog.Close>
                        <Dialog.Close>
                          <button
                            className="absolute right-[12px] top-[22px]"
                            aria-label="Close"
                          >
                            <IconX size={"20"} />
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Root>
                  );
                })
              : "You don't have any pending appointments for the moment."}
          </Tabs.Content>
          <Tabs.Content value="Previous">
            {previousAppointments && previousAppointments.length > 0
              ? previousAppointments.map((appointment) => {
                  const appointment_date = new Date(appointment.date);
                  const appointment_date_formatted =
                    getFormatter().format(appointment_date);
                  return (
                    <div
                      key={appointment.id}
                      className="mb-4 flex items-center gap-x-4 rounded-xl border border-slate-100 bg-[#fefce8] p-4 shadow-lg last-of-type:mb-0"
                    >
                      <div className="flex flex-col">
                        <p className="text-sm">{appointment.location}</p>
                        <p className="text-sm font-bold">
                          {role === "DOCTOR"
                            ? "Patient " + appointment.patient_name
                            : "Dr. " + appointment.doctor_name}
                        </p>
                      </div>
                      <p className="ml-auto flex-shrink-0 text-sm">
                        {appointment_date_formatted}
                      </p>
                    </div>
                  );
                })
              : "You don't have any previous appointments for the moment."}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
};
