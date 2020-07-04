import Contacts from '../models/contacts'

const deleteContact = async (req,res) => {

    Contacts.deleteOne({_id: req.query.id},(err,removedDoc) => {
        if(err){
            res.status(404).json({
                error: 'Something went wrong'
            });
        }else{
            res.status(200).json({
                message: "success"
            });
        }
    })
    
}

export default deleteContact;