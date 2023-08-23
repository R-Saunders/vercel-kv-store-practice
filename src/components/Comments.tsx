import { Suspense } from "react";
import { WEBSITE_URL } from "../../config";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

export default async function Comments() {
	return (
		<div>
			<CommentForm />
			<Suspense fallback="---------">
				<Comment />
			</Suspense>
		</div>
	);
}
