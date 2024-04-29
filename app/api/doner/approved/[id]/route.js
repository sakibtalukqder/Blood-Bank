import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        const user = await prisma.donner.findFirst({
            where: {
                id: parseInt(id),
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
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal sarver error" }, { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const { status } = await request.json()

    console.log("================================================================", status);

    try {
        // Check if the user exists
        const existingUser = await prisma.donner.findFirst({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update user status
        const updatedUser = await prisma.donner.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: status,
            },
        });

        return NextResponse.json({ message: "User status updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}