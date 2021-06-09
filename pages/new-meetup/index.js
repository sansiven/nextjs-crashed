import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetUpPage() {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupdata) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupdata),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data);

        //roter.replace makes sure you cant go back with a back button
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Add a new meetup</title>
                <meta
                    name="description"
                    content="add your own meetups. create amazing networking oppurtunities usinf react meetups"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetUpPage;
