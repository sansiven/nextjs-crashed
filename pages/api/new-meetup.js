import { MongoClient } from 'mongodb';

//api routes contain server side codes
//api/new-meetup

const handler = async (req, res) => {
    if(req.method === 'POST') {
        const data = req.body;
        //const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://sansivenyopmail:4yeFS87pHXqv42At@cluster0.3g1es.mongodb.net/meetups?retryWrites=true&w=majority',{ useUnifiedTopology: true })
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data)
        console.log(result)

        client.close();
        
        res.status(201).json({message: 'Meetup Inserted'});
    } 
}

export default handler