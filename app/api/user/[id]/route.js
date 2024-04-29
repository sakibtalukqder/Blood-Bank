import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        const user = await prisma.user.findFirst({

            where: {
                id: parseInt(id),
            },
            
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                donner: true
            },

        })
        return NextResponse.json(user, { message: "User Gated" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal sarver error" }, { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const { role } = await request.json()

    console.log("================================================================", role);

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "You havent create a donner account" }, { status: 404 });
        }

        // Update user status
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                role: role,
            },
        });

        return NextResponse.json({ message: "User role updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}