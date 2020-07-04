import Contacts from '../models/contacts'

const getContacts = async (req,res) => {

    Contacts.find().sort('-updated_at').exec((err,contacts) => {
        if(err){
            res.status(404).json({
                error: 'Something went wrong'
            });
        }else{
            res.status(200).json({
                data: contacts,
                message: "success"
            });
        }
    })

}

export default getContacts;