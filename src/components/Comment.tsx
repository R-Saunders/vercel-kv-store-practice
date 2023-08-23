import { WEBSITE_URL } from "../../config";

export default async function Comment() {
	const commentsRes = await fetch(`${WEBSITE_URL}/api/comments`, {
		next: { revalidate: 5 },
	});
	const comments = await commentsRes.json();
	return (
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
	);
}
