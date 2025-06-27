import mongoose from "mongoose"

const dbConnection = async ()=>{
    try {
     await mongoose.connect(process.env.MONOGDB_URL)   ;
     console.log("Success")
    } catch (error) {
        console.log(error)
        throw error;
    }
}




export default dbConnection;