// We declare use client because all user interactions should be client side, this includes things such as buttons, input fields and forms in general - This is illustrated well here https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fthinking-in-server-components.png&w=3840&q=75&dpl=dpl_6jyqWAq5TU1xWXydchQY4jTVVtsq
"use client";
// We import the useRouter hook from nextjs/navigation - We must be specific in where this is imported from as there is an old version that works in a different manner
import { useRouter } from "next/navigation";
// This provides us with our website url for the api to query. This allows a localhost option for local dev if the online version can't be reached
import { WEBSITE_URL } from "../../config";
// We import the useTransition hook from react
import { useTransition } from "react";

export default function CommentForm() {
	// This is the router hook used to trigger a page refresh while retaining react state and browser state
	const router = useRouter();

	// the react useTransition hook helps to manage client/server data updates WITHOUT refreshing the page
	// isPending returns true or false depending on whether useTransition is running - this allows us to do things such as changing the submit buttons text whilst the transition is completing so the user is aware that it is 'processing'
	const [isPending, startTransition] = useTransition();

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		// Prevent page refresh
		event.preventDefault();
		// We can use the below to get information from our form, we will use the ts-ignore comment to keep ts happy - I have used the 'or' operator to provide 'annonymous' as a default value should the field be left empty.
		// @ts-ignore
		const username = event.target.username.value || "annonymous";
		// @ts-ignore
		const comment = event.target.comment.value;

		// Now we will create our formData object - FormData is a class, therefore we create a formData variable as a new instance of FormData()
		const formData = new FormData();
		// We can now add our values in to our formData
		formData.append("username", username);
		formData.append("comment", comment);

		// Make API call
		// We declare a variable called options to specify that the body should contain our formData and the method of sending it will be POST
		const options = { body: formData, method: "POST" };
		// We make our request via fetch to send our comment to our storage
		const res = await fetch(`${WEBSITE_URL}/api/comments`, options);
		console.log(res);

		// We use the below to set the form fields back to empty strings and effectively clear the form
		// @ts-ignore
		event.target.username.value = "";
		// @ts-ignore
		event.target.comment.value = "";

    // Lastly we refresh the current route using router.refresh() inside of startTransition() to ensure we preserve react state and broswer state
    startTransition(() => {
      router.refresh();
      console.log("reload the page data");
    });
	}

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
			<label htmlFor="username">Name</label>
			<input name="username" />
			<label htmlFor="comment">Comment</label>
			<input name="comment" />
			<button type="submit" disabled={isPending}>
        {/* This contains some logic - If isPending is true (which is is during the transition) then the submit button will read 'Sending', if isPending is false it will show 'Send Comment' */}
        {isPending ? "Sending..." : "Send Comment"}
      </button>
		</form>
	);
}
