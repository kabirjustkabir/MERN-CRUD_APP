const express=require("express")
const cors=require("cors")
const bodyParser =require("body-parser")
const MongoClient=require("mongodb").MongoClient
const ObjectId=require("mongodb").ObjectID


const app =express();
const router=express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

var db;
//var dbURL="mongodb://localhost:27017/";
var dbURL="mongodb+srv://kabirjustkabir:Azeem@123@cluster0.bgm6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Data base connect
MongoClient.connect(dbURL,(err,dbClient)=>{
    if(err) throw err
    db=dbClient.db("userdb")
    console.log("connected to user db")
});

//Routes

router.get("/users",(req,res)=>{
    db.collection("users").find({}).toArray((err,userList)=>{
        if(err) throw err
        res.send(userList)
    })
});

router.post("/users/create",(req,res)=>{
    db.collection("users").insertOne({
        fullname:req.body.fullname,username:req.body.username
    },(err,result)=>{
        if (err) throw err
        console.log("user created")
    })
})
router.put("/users/update",(req,res)=>{
    db.collection("users").updateOne({_id:ObjectId(req.body._id)},
    {$set:{fullname:req.body.fullname,username:req.body.username}},(err,result)=>{
        if(err) throw err;
        console.log("updated user")
    })
})
router.delete("/users/delete",(req,res)=>{
    db.collection("users")
    .deleteOne({_id:ObjectId(req.body._id)},(err,result)=>{
        if(err) throw err
        console.log("user deleted")
    })
})
app.use("/api",router)
app.listen(3001,()=>console.log("app is up and running at port 3001"))






// const express = require('express');
// const cors = require("cors");
// const bodyparser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;


// const app = express();
// const router = express.Router();

// app.use(cors());
// app.use(bodyparser.urlencoded({extended:false}));

// var db;
// var dbURL="mongodb://localhost:27017/";

// // dbConnection
// MongoClient.connect(dbURL,(err,dbClinet)=>{
//     if(err) throw err
//     db=dbClinet.db("userdb");
//     console.log("connected");

// });
// // userList
// router.get('/users',(req,res)=>{
//     db.collection("users").find({}).toArray((err,userList)=>{
//         if(err) throw err
//         respond.send(userList);
//     })   
// });

// // user creation
// router.post('/users/create',(req,res)=>{
//     db.collection("users").insertOne(
//         {fullname:req.body.fullname , username:req.body.username },
//         (err,result)=>{
//         if(err) throw err;
//         console.log("user created...");
//     });
// });
// // user Updation
// router.put('/users/update',(req,res)=>{
//     db.collection("users").updateOne({_id:ObjectId(req.body._id)},{$set:{
//         fullname:req.body.fullname,username:req.body.username  
//     }},(err,result)=>{
//         if(err) throw err;
//         console.log("user updated....");
//     });
// });
// // user Deletion
// router.delete('/users/delete',(req,res)=>{
//     db.collection("users").deleteOne({_id:ObjectId(req.body._id)},(err,result)=>{
//         if(err) throw err
//         console.log("user deleted...");
//     });
// });

// // api mounting
// app.use("/api",router);

// //api listening
// app.listen(3001,()=>{console.log("server is running in 3001 ohhh ya...")})