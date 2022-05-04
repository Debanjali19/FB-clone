const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
    name: {
        type: String,
        
    },
    email: {
        type: String,
        //sparse:true,
        unique:true,
       
    },
    password: {
        type: String,
        
    },
    cpassword: {
        type: String,
        
    },
    phone: {
        type: String,
        //sparse:true,
    },
    isemployee:{
        type: Boolean,
    }
});
//UserSchema.plugin(AutoIncrement);
var User = mongoose.model('users', UserSchema);

module.exports=User;