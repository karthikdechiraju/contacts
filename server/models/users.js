import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = mongoose.model('User', new Schema({
    id: ObjectId,
    email: {
    	type:String,
    	required:true
    },
    created_at: {
    	type:Date,
        required:true,
        default: Date.now()
    },
    password:{
        required: true,
        type: String
    }
}));

export default UserSchema