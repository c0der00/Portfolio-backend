import mongoose, { Schema } from "mongoose";

const ContactSchema = Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type : String,
        require: true
    },
    message:{
        type:String,
        require : true
    }
})

export const Contact = mongoose.model("Contact",ContactSchema)