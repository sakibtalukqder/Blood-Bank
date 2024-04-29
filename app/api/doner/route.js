import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const data = await prisma.donner.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        role: true,
                    },
                }
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        console.log("=======================================================================================");
        return Response.json({ error: 'Internal Server Error' });
    }
}

export const POST = async (request) => {
    try {
        const { Area, bloodType, dateOfBirth, lastDonate, userId } = await request.json();

        const exestingAccount = await prisma.donner.findUnique({
            where: { userId: userId }
        })
        if (exestingAccount) {
            return NextResponse.json({ user: null, message: "You are already applayed" }, { status: 409 })
        }

        const donner = await prisma.donner.create({
            data: {
                Area, bloodType, dateOfBirth, lastDonate, userId
            }
        })
        return NextResponse.json({ message: "Your Application Is submitted Successfully" }, { status: 201 })
    } catch (error) {
        console.log("=======================================================================================", error);
        return Response.json({ error: 'Faild to Submit' });
    }
}

