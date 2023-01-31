import { Router } from 'express';
import{modelUser} from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
export const  router = Router();

const {sign} = jsonwebtoken;
const {verify} = jsonwebtoken;
export const routerIndex =router.get('/',(req,res)=>{
    res.send('Hello World !');
});

export const signup = router.post('/signup',async (req,res)=>{
   //res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
   const{email, password} = req.body;
  const newUser = new modelUser({email,password});
  await newUser.save();
  const token = sign({_id:newUser._id},'secretkey');
  res.status(200).json({token});
  res.send('Testing Register');
  // Pass to next layer of middleware

});
export const signin = router.post('/signin',async (req,res)=>{
    const{email,password}= req.body;
    const user = await modelUser.findOne({email});
    if(!user)return res.status(404).send("The email doesn't exist");
    if(user.password !== password) return res.status(401).send("Wrong Password");
    const token =  sign({_id:user._id},'secretkey');
    return res.status(200).json({token});
});
 export const tasks = router.get('/tasks',(req,res)=>{
    
   res.json([
    {
        _id:1,
        name:'Task one',
        description:'lorem ipsum',
        date:'2023-01-26T06:42:48.259Z'
    },
    {
        _id:2,
        name:'Task two',
        description:'lorem ipsum',
        date:'2023-01-26T06:42:48.259Z'
    },
    {
        _id:3,
        name:'Task three',
        description:'lorem ipsum',
        date:'2023-01-26T06:42:48.259Z'
    }
   ])
 });
 export const tasks_private = router.get('/private-tasks',verifyToken,(req,res)=>{
    
    res.json([
     {
         _id:1,
         name:'Task one',
         description:'lorem ipsum',
         date:'2023-01-26T06:42:48.259Z'
     },
     {
         _id:2,
         name:'Task two',
         description:'lorem ipsum',
         date:'2023-01-26T06:42:48.259Z'
     },
     {
         _id:3,
         name:'Task three',
         description:'lorem ipsum',
         date:'2023-01-26T06:42:48.259Z'
     }
    ])
  });
 export const profile = router.get('/profile',verifyToken,(req,res)=>{

    res.send(req.userId);
 }) 

 function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).send('Unauthorization Request');
   const token = req.headers.authorization.split(' ')[1];
   if(!token){
    return res.status(401).send('Unauthorization Request');
   }
   const payload = verify(token,'secretkey');
   req.userId = payload._id;
   next();
 }


