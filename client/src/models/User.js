import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    token : {
        type: String,
    },

})

const User = mongoose.model('User', userSchema);


export default User;