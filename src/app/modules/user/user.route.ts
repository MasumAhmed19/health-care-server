import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../helper/fileUpload";
import { userValidation } from "./user.validation";
import checkAuth from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";


const router = Router();

router.get('/', checkAuth(UserRole.ADMIN), userController.getAllFromDB)

router.post('/create-patient', fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
)

router.post('/create-doctor', checkAuth(UserRole.ADMIN), fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createDoctor(req, res, next)
    }
)

router.post('/create-admin', checkAuth(UserRole.ADMIN), fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    }
)


export const userRoutes = router