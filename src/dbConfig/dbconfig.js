
import mongoose from "mongoose";


export const connect = async () => {

    try {
        //const url = process.env.MONGO_URI
        const url = 'mongodb+srv://amishra73185:amishra73185@cluster0.vywayuf.mongodb.net/Next_js_AUTH_chai_code?retryWrites=true&w=majority'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            dbName: 'Next_js_AUTH_chai_code'

        });
        console.log("connected to database succesfullly with ")
    }
    catch (err) {
        console.log("err in connection", err)
    }

}
