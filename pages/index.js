// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props) {
    /* const [loadedMeetups, setLoadedMeetups] = useState([])

    useEffect(() => {
        //send a http request and fetch data
        setLoadedMeetups(DUMMY_MEETUPS);
    }, []) */

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of react meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export const getServerSideProps = async (context) => {

//     const req = context.req;
//     const res = context.res;

//     //fetch data froma an api
//     //fetch credentilas
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

//you can run any code used in server , never each the machine of your visitor
export const getStaticProps = async () => {
    //fetch data from an APi

    const client = await MongoClient.connect(
        "mongodb+srv://sansivenyopmail:4yeFS87pHXqv42At@cluster0.3g1es.mongodb.net/meetups?retryWrites=true&w=majority",
        { useUnifiedTopology: true }
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    //always eturn object
    //revalidate wants a number unlcoks a feature calla incremental statcic generatio
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
};

export default HomePage;
