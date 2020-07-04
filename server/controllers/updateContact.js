import Contacts from '../models/contacts'

const updateContact = async (req,res) => {

    const requiredContact = await Contacts.findById(req.body._id)
    if(requiredContact){
        if(req.body.name){
            requiredContact.name = req.body.name
        }
        if(req.body.email){
            requiredContact.email = req.body.email
        }
        if(req.body.country_code){
            requiredContact.country_code = req.body.country_code
        }
        requiredContact.updated_at = new Date()
        const updatedContact = await requiredContact.save()
        if(updatedContact && updatedContact.name){
            res.status(200).json({
                data: updatedContact,
                message: "success"
            });
        }else{
            res.status(404).json({
                error: 'Something went wrong'
            });
        }
    }else{
        res.status(404).json({
            error: 'No contact found'
        });
    }

}

export default updateContact;