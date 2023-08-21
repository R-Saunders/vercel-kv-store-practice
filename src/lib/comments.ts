import short from "short-uuid";
import { kv } from "@vercel/kv";

export async function saveComment(
	username: string,
	comment: string,
	slug: string
) {
	// generate a unique ID for this comment
	const uuid = short.generate();

	// stringify our comment object
	const commentObject = JSON.stringify({ username, comment, uuid });

	// add the comment to our KV store
	kv.set(`comment:${uuid}`, commentObject);

	// add this comment to the list of comments for the post - comments:post-one
	const commentsList = await kv.lpush(`comments:${slug}`, uuid); // this will look like: (comments:post-one 1234 1234 1234 1234)
	return uuid;
}

export async function getComments(slug: string) {
	const commentIDs = await kv.lrange(`comments:${slug}`, 0, -1);
	const commentKeys = commentIDs.map((id) => `comment:${id}`);
	// this is to account for when there are no comments on a post because the mget needs an arguement
	if (commentKeys.length < 1) {
		return [];
	}

	const comments = await kv.mget(...commentKeys);
	return comments;
}
