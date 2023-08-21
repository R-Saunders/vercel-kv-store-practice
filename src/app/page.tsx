import Comments from "@/components/Comments";
import styles from "./page.module.css";
import { WEBSITE_URL } from "../../config";

type BlogPostParams = {
	params: {
		slug: string;
	};
};

export default async function Home({ params }: BlogPostParams) {
	const res = await fetch(`${WEBSITE_URL}/api/message`, {
		next: { revalidate: 2 },
	});
	const data = await res.json();

	return (
		<main className={styles.main}>
			<h1>Welcome to my API</h1>
			<p>My message to you is:</p>
			<h2>{data}</h2>
			<Comments slug={params.slug} />
		</main>
	);
}
