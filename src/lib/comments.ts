import short from "short-uuid";
import { kv } from "@vercel/kv";

// Async function to save comments that accepts a username and comment as parameters. Both types are strings
export async function saveComment(
	username: string,
	comment: string,
) {
	// generate a unique ID for this comment
	const uuid = short.generate();

	// create a comment object and stringify it
	const commentObject = JSON.stringify({ username, comment, uuid });

	// add the comment to our KV store
	kv.set(`comment:${uuid}`, commentObject);

	// add this comment to the list of comments for the post - comments:post-one
	const commentsList = await kv.lpush(`comments`, uuid); // this will look like: (comments:post-one 1234 1234 1234 1234)
	return uuid;
}

export async function getComments() {
	const commentIDs = await kv.lrange(`comments`, 0, -1);
	const commentKeys = commentIDs.map((id) => `comment:${id}`);
	// this is to account for when there are no comments on a post because the mget needs an arguement
	if (commentKeys.length < 1) {
		return [];
	}

	const comments = await kv.mget(...commentKeys);
	return comments;
}
