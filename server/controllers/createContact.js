import Contacts from '../models/contacts'

const createContact = async (req,res) => {

    Contacts.findOne({ $or: [{name: req.body.name}, {email: req.body.email}] }, async (err,existingContact) => {
        if(existingContact){
            res.status(404).json({
                error: 'Contact with details already exist'
            });
        }else{
            const newContact = new Contacts({
                name: req.body.name,
                email: req.body.email,
                country_code: req.body.country_code,
            })
            const savedContact = await newContact.save()
            if(savedContact && savedContact.name){
                res.status(200).json({
                    data: savedContact,
                    message: "success"
                });
            }else{
                res.status(404).json({
                    error: 'Something went wrong'
                });
            }
        }
    })

}

export default createContact;