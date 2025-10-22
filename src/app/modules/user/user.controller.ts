import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.contant";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient Created Successfully",
    data: result
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor Created Successfully",
    data: result
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient Created Successfully",
    data: result
  });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields) // searching, filtering
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) //pagination

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "All Users retrieve Successfully",
    data: result
  });
});





export const userController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDB,
};
