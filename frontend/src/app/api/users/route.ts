import {NextRequest, NextResponse} from "next/server";
import UserModel from "@/features/user/server/user.model";

export async function GET(req: NextRequest) {
    const users = await UserModel.find({});

    return NextResponse.json({
        success: true,
        message: "Users retrieved successful",
        data: users
    })
}