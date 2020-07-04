import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactsSchema = mongoose.model('Contact', new Schema({
    id: ObjectId,
    name: {
    	type:String,
    	required:true
    },
    email: {
    	type:String,
    	required:true
    },
    created_at: {
    	type:Date,
        required:true,
        default: Date.now()
    },
    updated_at: {
    	type:Date,
        required:true,
        default: Date.now()
    },
    country_code: {
    	type:String,
    	required:true
    },
}));

export default contactsSchema