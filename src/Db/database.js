import mongoose from "mongoose";
const ConnectDB = async()=>{
    try{
        const ConnectionInstanse = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    const response = ConnectionInstanse.connection.host
    console.log(`MONGO DB RUN ON||${response}`)
        
    } catch(error){
        console.log(error)
    }
}
export default ConnectDB