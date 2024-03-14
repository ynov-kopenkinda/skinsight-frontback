"use client";

import { useState } from "react";
import { Button, Text } from "@radix-ui/themes";
import { format } from "date-fns";

import { api } from "~/utils/api/react";

interface MessageAppointmentProps {
  data: {
    text: string;
    doctorID: number;
    location?: string;
  };
  patientID: number;
}

const MessageAppointment = ({ data, patientID }: MessageAppointmentProps) => {
  const [accepted, setAccepted] = useState(false);
  const [date, setDate] = useState(new Date());
  const { mutateAsync } = api.appointment.createAppointment.useMutation();
  const checkIfAppointmentExists =
    api.appointment.checkIfAppointmentExists.useQuery({
      doctorId: data.doctorID,
      patientId: patientID,
    });

  const isValidDate = date > new Date();

  if (checkIfAppointmentExists.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (checkIfAppointmentExists.data != null) {
    console.log(checkIfAppointmentExists.data);
    return (
      <div>
        {data.text.startsWith("You") ? (
          <Text className="mb-2">{data.text}</Text>
        ) : null}
        <div className="flex flex-col rounded bg-stone-50 p-2">
          <Text size={"3"}>
            {format(checkIfAppointmentExists.data.date, "dd/MM/yyyy")}
          </Text>
          {checkIfAppointmentExists.data.isAcceptedByDoctor ? (
            <Text className="text-lime-500">Accepted by the doctor</Text>
          ) : (
            <Text className="text-red-500">
              Waiting for the doctor to respond
            </Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Text>{data.text}</Text>
      <div className="flex flex-col gap-x-2 gap-y-2">
        {!accepted && (
          <Button
            color="green"
            className="w-full"
            onClick={() => {
              setAccepted(true);
            }}
          >
            Yes
          </Button>
        )}
        {accepted && (
          <input
            type="date"
            className="w-full rounded border p-2"
            value={format(date, "yyyy-MM-dd")}
            onChange={(e) => {
              console.log(e.target.value);
              setDate(new Date(e.target.value));
            }}
          />
        )}
        {isValidDate && (
          <>
            <Button
              color="green"
              onClick={() =>
                mutateAsync({
                  date: date.toISOString(),
                  doctorId: data.doctorID,
                  location: data.location ?? "Online",
                  patientId: patientID,
                }).then(() => {
                  checkIfAppointmentExists.refetch().catch(console.error);
                })
              }
            >
              Request an appointment
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageAppointment;
