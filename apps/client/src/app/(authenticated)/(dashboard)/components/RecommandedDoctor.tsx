import DoctorCard from "~/shared/ui/DoctorCard";

export interface Doctor {
  id: number;
  imageSrc: string;
  background?: string;
  name: string;
  job: string;
  rating?: number;
  schedule_start: string;
  schedule_end: string;
}

const RecommandedDoctor = () => {
  const doctors: Doctor[] = [
    {
      id: 1,
      imageSrc: "",
      name: "Wilson",
      job: "General Pulmonologist",
      rating: 4.8,
      schedule_start: "01:00",
      schedule_end: "08:00 PM",
    },
    {
      id: 2,
      imageSrc: "",
      name: "Christoper",
      job: "General Pulmonologist",
      schedule_start: "01:00",
      schedule_end: "08:00 PM",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-xl font-bold">Recommanded Doctor</h2>
      {doctors.length > 0 && (
        <div className="grid md:grid-cols-2 md:space-x-6 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommandedDoctor;
