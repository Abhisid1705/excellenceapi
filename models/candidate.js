const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const candidateSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    _id:{
        type:String,
        required:true
    },
    testScores: [],
    totalMarks:Number,
    averageMarks:Number
},{timestamps:true});
module.exports=mongoose.model('candidate',candidateSchema);