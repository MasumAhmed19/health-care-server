import express from "express";
import { ScheduleController } from "./schedule.controller";
import checkAuth from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", checkAuth(UserRole.ADMIN), ScheduleController.insertIntoDB)
router.get("/", checkAuth(UserRole.ADMIN, UserRole.DOCTOR) , ScheduleController.schedulesForDoctor)
router.delete('/:id',checkAuth(UserRole.ADMIN), ScheduleController.deleteScheduleFromDB)

export const ScheduleRoutes = router;