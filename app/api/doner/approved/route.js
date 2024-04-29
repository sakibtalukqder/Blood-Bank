import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const data = await prisma.donner.findMany({
            where: {
                status: "DONNER"
            }, include: {
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