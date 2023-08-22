import Comments from "@/components/Comments";
import styles from "./page.module.css";

export default async function Home() {
	return (
		<main className={styles.main}>
			<h1>Welcome to my API</h1>
			<Comments />
		</main>
	);
}
