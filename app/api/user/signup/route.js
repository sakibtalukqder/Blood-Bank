import { prisma } from "@/config/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const data = await prisma.user.findMany({
            select: {
                id: true, name: true, email: true, phone: true, role: true,
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        console.log("Error------------------------------------------");
        return Response.json({ error: 'Internal Server Error' });
    }
}

export const POST = async (request) => {
    try {
        const { name, email, phone, password } = await request.json();
        const exEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if (exEmail) {
            return NextResponse.json({ user: null, message: "already have an account with this email" }, { status: 409 })
        }
        const enPassword = await hash(password, 10)
        const data = { name, email, phone, password: enPassword }
        const result = await prisma.user.create({ data: data })
        if (!result) {
            return null;
        }
        return NextResponse.json({ message: "Signup Succesfull" }, { status: 201 })
    } catch (error) {
        console.log("Error------------------------------------------", error);
        return Response.json({ error: 'SignUp Error Try again' });
    }
}

