import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (user: IJWTPayload, payload: {
    scheduleIds: string[]
}) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
        doctorId: doctorData.id,
        scheDuleId:scheduleId
    }))

    return await prisma.doctorSchedule.createMany({
        data: doctorScheduleData
    });
}

export const DoctorScheduleService = {
    insertIntoDB
}