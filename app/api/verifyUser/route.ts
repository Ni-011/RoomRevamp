import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    const {user} = await req.json();

    try {
    // if user exists 
    const ExistingUser = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    if (ExistingUser?.length > 0) {
        return NextResponse.json({status: "Exists", user:ExistingUser})
    }

    // if new user, add to db
    if (ExistingUser?.length == 0) {
        const newUser = await db.insert(Users).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            imageURL: user?.imageUrl,
        }).returning({Users});

        return NextResponse.json({status: "New user added", user: newUser[0].Users});
    }

    return NextResponse.json({result: ExistingUser[0]})
}
catch (error) {
    console.log(error);
    return NextResponse.json({error: error});
}
}
