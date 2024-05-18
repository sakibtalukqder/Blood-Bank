import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = request.nextUrl;
    const area = searchParams.get('Area');
    const bloodType = searchParams.get('bloodType');

    
    if (!area && !bloodType) {
        return NextResponse.json({ error: 'At least one query parameter (Area or bloodType) is required' }, { status: 400 });
    }

    try {
        // Build search conditions dynamically
        const searchConditions = [];

        if (area) {
            searchConditions.push({
                Area: {
                    contains: area,
                    lte: 'insensitive',
                },
            });
        }

        if (bloodType) {
            searchConditions.push({
                bloodType: {
                    contains: bloodType,
                    lte: 'insensitive',
                },
            });
        }

        console.log(searchConditions);

        const results = await prisma.donner.findMany({
            where: {
                OR: searchConditions,
                status:"DONNER"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                }
            }
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error during search:", error);
        return NextResponse.json({ error: 'An error occurred while searching' }, { status: 500 });
    }
};
