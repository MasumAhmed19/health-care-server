import { Gender } from "@prisma/client"

export interface ICreatePatient {
    name: string,
    email: string,
    password: string
}

export interface ICreateDoctor {
    name: string,
    email: string,
    password: string,
    contactNumber:string,
    address:string,
    experience: number,
    gender: Gender,
    registrationNumber:string,
    appointmentFee:number
    qualification:string,
    currentWorkingPlace:string,
    designation:string,
}

export interface ICreateAdmin {
    name: string,
    email: string,
    password: string,
    contactNumber:string

}

