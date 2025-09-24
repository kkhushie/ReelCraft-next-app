import {dbConnect} from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

export async function POST(request:NextRequest){
    try{
        const {email,password}=await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password are required"},
                {status:400}
            );
        }
        await dbConnect();
        const existingUser=await User.findOne({email}) 
        if(existingUser){
            return NextResponse.json(
                {error:"User already exists"},
                {status:400}
            )
        }
        const newUser=await User.create({email,password});
        console.log(newUser," created successfully.");
        return NextResponse.json({
            message:"User created successfully",
            user:{
                id:newUser._id,
                email:newUser.email,
            },
        })
    }
    catch(error){
        console.log("Registration error",error)
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}