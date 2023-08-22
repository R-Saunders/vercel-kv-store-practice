// this is inside the folder [slug] which allows the route to be dynamic
import { NextRequest, NextResponse } from "next/server";
import { getComments, saveComment } from "@/lib/comments";



export async function GET(request: NextRequest) {
	// get the comments
	const comments = await getComments();
	// return the comments
	return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
	const form = await request.formData();
	const username = form.get("username") as string;
	const comment = form.get("comment") as string;
	await saveComment(username, comment);
	return NextResponse.json("Saved Comment");
}
