import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditModal = (props) => {
    const [name,updateName] = React.useState("")
    const [email,updateEmail] = React.useState("")
    const [code,updateCode] = React.useState("")

    const [nameError,updateNameError] = React.useState(false)
    const [emailError,updateEmailError] = React.useState(false)
    const [codeError,updateCodeError] = React.useState(false)

    useEffect(()=>{
        if(props.data && props.data.name){
            updateName(props.data.name)
        }
        if(props.data && props.data.email){
            updateEmail(props.data.email)
        }
        if(props.data && props.data.country_code){
            updateCode(props.data.country_code)
        }
    },[props.data])


    const validateEmail = (mail) =>{
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }    

    const handleSubmit = () => {
        if(name !== "" && email !== "" && validateEmail(email) && code !== ""){
            let init_data = props.data ? props.data : {}
            props.handleSubmit({...init_data,name,email,country_code: code})
            clearData()
        }else{
            updateEmailError(email === "" || !validateEmail(email))
            updateCodeError(code === "")
            updateNameError(name === "")
        }
    }

    const clearData = () => {
        updateEmailError(false)
        updateCodeError(false)
        updateNameError(false)
        updateName("")
        updateEmail("")
        updateCode("")
    }

    const handleClose = () => {
        clearData()
        props.handleClose()
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {!props.data ? 'Add new contact' : 'Edit contact'}
            </DialogTitle>
            <DialogContent>
                <div style={{display:'flex',flexDirection: 'row'}}>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name of the person"
                        type="text"
                        variant="outlined"
                        fullWidth
                        style={{marginRight: 30}}
                        value={name}
                        onChange={(e) => updateName(e.target.value)}
                        error={nameError}
                    />
                    <TextField
                        margin="dense"
                        id="country_code"
                        label="Country code"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={code}
                        onChange={(e) => updateCode(e.target.value)}
                        error={codeError}
                    />
                </div>
                <TextField
                    margin="dense"
                    id="email"
                    label="Email address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                    error={emailError}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default EditModal;