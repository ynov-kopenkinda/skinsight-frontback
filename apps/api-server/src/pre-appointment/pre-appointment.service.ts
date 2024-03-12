import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { s3 } from "src/s3";

@Injectable()
export class PreAppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPreAppointmentDto, image: Express.Multer.File) {
    const random_image_name = crypto.randomBytes(32).toString("hex");

    const putParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: random_image_name,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    const putCommand = new PutObjectCommand(putParams);

    const returnedImage = await s3.send(putCommand).catch((err) => {
      throw new Error(err);
    });

    console.log(returnedImage, "returnedImage");

    return this.prisma.preAppointment.create({
      data: { ...createPreAppointmentDto, image: random_image_name },
    });
  }

  async findByPatientId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { patientId: id } });
  }

  async findByDoctorId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { doctorId: id } });
  }
}
