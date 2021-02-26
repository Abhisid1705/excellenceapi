const express=require('express');
const {body}=require('express-validator/check');
const router=express.Router();

const feedController=require('../controllers/feed');
// router.get('/',feedController.getPosts);

router.post('/candidate',[body('email').trim().isEmail(),body('name').trim().isLength({min:2})],feedController.createCandidate);
router.post('/updateScores',feedController.updateMarks);
router.post('/highscore',feedController.highMarks);
router.post('/averagescore',feedController.avgMarks);
module.exports=router;