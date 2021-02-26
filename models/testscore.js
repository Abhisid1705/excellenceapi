const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const scoreSchema=new Schema({
    first_round:{
        type:Number,
        required:true
    },
    second_round:{
        type:Number,
        required:true
    },
    third_round:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('test_score',scoreSchema);