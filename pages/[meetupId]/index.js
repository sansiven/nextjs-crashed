import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetUpDetails = ({
    meetupData: { image, title, address, description },
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description}
                />
            </Head>
            <MeetupDetail
                image={image}
                title={title}
                address={address}
                description={description}
            />
        </>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(
        "mongodb+srv://sansivenyopmail:4yeFS87pHXqv42At@cluster0.3g1es.mongodb.net/meetups?retryWrites=true&w=majority",
        { useUnifiedTopology: true }
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    //if fallback false no other ids a re supported, if true some dynamic ids are regenerated at runtime
    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://sansivenyopmail:4yeFS87pHXqv42At@cluster0.3g1es.mongodb.net/meetups?retryWrites=true&w=majority",
        { useUnifiedTopology: true }
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                image: selectedMeetup.image,
            },
        },
    };
};

export default MeetUpDetails;
