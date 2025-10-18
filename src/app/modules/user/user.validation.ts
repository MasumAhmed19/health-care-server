import { Gender } from "@prisma/client";
import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.email().nonempty({ message: "Email is required" }),
    address: z.string().optional(),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  doctor: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    contactNumber: z
      .string()
      .nonempty({ message: "Contact number is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
    experience: z.number(),
    gender: z
      .string()
      .refine((val) => Object.values(Gender).includes(val as Gender), {
        message: "Valid gender is required",
      }),
    registrationNumber: z
      .string()
      .nonempty({ message: "Registration number is required" }),
    appointmentFee: z.number(),
    qualification: z
      .string()
      .nonempty({ message: "Qualification is required" }),
    currentWorkingPlace: z
      .string()
      .nonempty({ message: "Current working place is required" }),
    designation: z.string().nonempty({ message: "Designation is required" }),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin:z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    contactNumber: z.string().nonempty({ message: "Contact number is required" }),
  })
});

export const userValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
  createAdminValidationSchema,
};
