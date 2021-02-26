const {validationResult}=require('express-validator/check');

const candidate=require('../models/candidate');
const router = require('../routes/feed');

exports.getPosts=(req,res,next)=>{
       res.status(200).json({})//we are passing a normal js object inside json and tht will be automatically converted into json format and will be send to client

};
exports.createCandidate=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error('Name must be of atleast 2 characters and email must be a valid email');
        error.statusCode=404;
        throw error;
        console.log(error);
    }
    const name=req.body.name;
    const email=req.body.email;
    const Candidate=new candidate({
        name:name,
        email:email,
        _id:name+email,
        testScores:[],
        totalMarks:0,
        averageMarks:0

    });
    Candidate.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'candidate created successfully',
            post:result
        })
    }).catch(err=>{
        if(!err.statusCode){
           err.statusCode=500;
        }
        console.log(err);
        next(err);
    })
    //201 success a resource was created
    
}
exports.updateMarks=(req,res,next)=>{
    first=req.body.first;
    second=req.body.second;
    third=req.body.third;
    candidateName=req.body.name;
    email=req.body.email;
    candidateId=candidateName+email;
    candidate.findById(candidateId).then(candidate=>{
        console.log(candidate);
        if(!candidate){
            const error=new Error('No candidate exists');
            error.statusCode=404;
            throw error;
        }
        candidate.testScores.push(first);
        candidate.testScores.push(second);
        candidate.testScores.push(third);
        candidate.totalMarks=first+second+third
        if(candidate.totalMarks>0){
            candidate.averageMarks=candidate.totalMarks/3
        }
        else{
            candidate.averageMarks=0
        }
        
        

        return candidate.save();
    }).then(result=>{
        res.status(200).json({message:"marks added",post:result});
    }).catch(err=>{[
        console.log(err)
    ]})
}
exports.highMarks=(req,res,next)=>{
    candidate.aggregate([
        {
            $group:{
                _id:null,
                maxmarks:{
                    $max:"$totalMarks",
                }
            }
        }
    ]).then(can=>{
        candidate.find({totalMarks:can[0].maxmarks}).then(candidate=>{
            res.status(201).json({candidateName:candidate.name,marks:candidate.totalMarks})
            // console.log(can[0].maxmarks);
        })
})
}

exports.avgMarks=(req,res,next)=>{
    name=req.body.name;
    email=req.body.email;
    id=name+email;
    candidate.find({_id:id}).then(can=>{
        res.status(200).json(can[0].averageMarks)
        console.log(can[0]);
    })
}