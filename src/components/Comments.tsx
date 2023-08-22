import { WEBSITE_URL } from "../../config";
import CommentForm from "./CommentForm";

export default async function Comments() {
	const commentsRes = await fetch(`${WEBSITE_URL}/api/comments`, {
		next: { revalidate: 5 },
	});
	const comments = await commentsRes.json();

	console.log(comments);
	return (
		<div>
			<CommentForm />
			<ul>
				{/* @ts-ignore */}
				{comments.map((comment) => {
					return (
						<li key={comment.uuid}>
							{comment.username} says...{comment.comment}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
