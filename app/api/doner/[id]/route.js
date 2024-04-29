import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const { lastDonate } = await request.json()

    console.log("================================================================", lastDonate);

    try {
        // Check if the user exists
        const existingUser = await prisma.donner.findFirst({
            where: {
                userId: parseInt(id),
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "You havent create a donner account" }, { status: 404 });
        }

        // Update user status
        const updatedUser = await prisma.donner.update({
            where: {
                id: parseInt(id),
            },
            data: {
                lastDonate: lastDonate,
            },
        });

        return NextResponse.json({ message: "User status updated" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}