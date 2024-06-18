import mongoose from "mongoose"
const connectDB = async ()=>{
    const connection ="mongodb+srv://nextjsblog:nextjsblog@cluster0.7hpzpdh.mongodb.net/"
    // mongodb+srv://nextjsblog:nextjsblog@cluster0.7hpzpdh.mongodb.net/
    mongoose.connect(connection)
    .then(()=>console.log("database connected"))
    .catch((e)=>console.log(e))
}
export default connectDB