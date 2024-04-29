import { prisma } from "@/config/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    try {
        const { email, password } = await request.json();

        // Find user by username
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'You have No Account' }, { status: 409 });
        }
        // Compare passwords
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 409 });
        }

        const { password: _, ...userData } = user;
        // Passwords match, user is authenticated
        return NextResponse.json({ message: 'Login successful', user: userData }, { status: 200 });
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ error: 'Error logging in user' }, { status: 500 });
    }
}