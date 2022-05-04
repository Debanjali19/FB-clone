var mongoose=require('mongoose');
//var AutoIncrement = require('mongoose-sequence')(mongoose);
const dbUrl=
'mongodb+srv://twinkleagrawal2001:Twinkle@cluster0.v6xly.mongodb.net/fb?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
};

mongoose
 .connect(dbUrl,connectionParams)
 .then(()=>{
     console.info('Connected to the DB');
 })
 .catch((e)=>{
     console.log('Error:' ,e);
 });


var User= require('./userSchema');
User.createIndexes();

// let user1=new User({
//     name:'ff',
//     email:'ff@ff.com',
//     password:'fff',
//     cpassword:'fff',
//     phone:'1234567891',
//     isemployee: true,
    
// });
// user1.save();




// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {

    resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
         const{name,email,password,cpassword,phone,isemployee}=req.body;
         console.log(isemployee);
    if (!name || !email || !password || !cpassword || !phone)
    {
        console.log("empty fields");
        return resp.status(422).json({error:"fill all fields"});
    }
    if(cpassword!==password)
    {
        console.log("passwords dont match");
        return resp.status(422).json({error:"passwords doesnot match"});
    }
    if(password.length<3)
    {
        console.log("weak password");
        return resp.status(422).json({error:"weak password"});
    }
    if(phone.length!==10)
    {
        console.log("invalid phone");
        return resp.status(422).json({error:"invalid phone"});
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!(email.match(mailformat)))
    {
      console.log("inValid email address!");
      return resp.status(422).json({error:"invalid email"});
    }

    User.findOne({email:email})
        .then((userExist) => {
            if(userExist)
            {   console.log("user already exists");
                return resp.status(422).json({error:"User already exists"});
            }

            var user = new User(req.body);
            user.save().then(() => {
                console.log("user registered");
                resp.status(201).json({error:"user registered"});
            }).catch((err) => resp.status(500).json({error:"failed"}));
            
        }).catch(err => {console.log(err); });
    
});

app.post("/Login",(req,resp)=>{
    const {email,password} =req.body;
    if (!email || !password )
    {
        console.log("fill all feilds");
        return resp.status(422).json({error:"fill all fields"});
    }
    User.findOne({email:email, password:password})
        .then((userExist) => {
            if(userExist)
            { console.log("user exists");
                return resp.status(201).json({error:"Login successfull"});
        
            }
            else{
                console.log("user doesnot exists");
                return resp.status(422).json({error:"User doesnot exists"});
            }
            
        }).catch(err => {console.log(err); });
});
app.listen(4000);



