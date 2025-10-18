import bcrypt from "bcryptjs";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUpload";
import { Admin, Doctor, UserRole } from "@prisma/client";

const createPatient = async (req:Request) => {

  if(req.file){
    const uploadResult = await fileUploader.uploadToCloudinary(req.file)
    req.body.patient.profilePhoto = uploadResult?.secure_url
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password as string,
    Number(config.bcrypt_salt)
  );

  const resutl = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    return await tx.patient.create({
      data: req.body.patient,
    });

  });
  return resutl
};


const createDoctor = async (req: Request): Promise<Doctor> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: userData
        });

        const createdDoctorData = await tx.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
};


const createAdmin = async (req: Request): Promise<Admin> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const adminData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: adminData
        }); 

        console.log(req.body.doctor)

        const createdAdminData = await tx.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};


export const userService = {
  createPatient,
  createDoctor,
  createAdmin
};
