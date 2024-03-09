import { z } from "zod";


export const updateUserSchema = z.object({
  id: z.number(),
  requestBody: z.object({
    email: z.string().email("Email needed"),
    firstName: z.string().min(2, { message: "Firstname needed" }),
    lastName: z.string().min(2, { message: "Lastname needed" }),
    phone: z.string().min(10, { message: "Phone number needed" }),
    heightInCm: z.number().min(100, { message: "Height needed" }),
    weightInKg: z.number().min(20, { message: "Weight needed" }),
    ssn: z.string(),
    proDoctorNumber: z.string(),
  }),
})
