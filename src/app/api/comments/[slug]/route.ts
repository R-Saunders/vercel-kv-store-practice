// this is inside the folder [slug] which allows the route to be dynamic
import { NextRequest, NextResponse } from "next/server";
import { getComments, saveComment } from "@/lib/comments";

type BlogPostParams = {
	params: {
		slug: string;
	};
};

export async function GET(requst: NextRequest, { params }: BlogPostParams) {
	// get the comments
	const comments = await getComments(params.slug);
	// return the comments
	return NextResponse.json(comments);
}

export async function POST(request: NextRequest, { params }: BlogPostParams) {
	const form = await request.formData();
	const username = form.get("username") as string;
	const comment = form.get("comment") as string;
	await saveComment(username, comment, params.slug);
	return NextResponse.json("Saved Comment");
}
