import { WEBSITE_URL } from "../../config";

export default async function Comments({ slug }: { slug: string }) {
	const commentsRes = await fetch(`${WEBSITE_URL}/api/comments/${slug}`, {
		next: { revalidate: 5 },
	});
	const comments = await commentsRes.json();
	return (
		<div>
			<form action={`/api/comments/${slug}`} method="POST">
				<label htmlFor="username">Name</label>
				<input name="username" />
				<label htmlFor="comment">Comment</label>
				<input name="comment" />
				<button type="submit">Send Comment</button>
			</form>
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
