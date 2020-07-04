import React from 'react'
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar as SnackbarComponent} from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Snackbar = (props) => {
    return (
        <SnackbarComponent open={props.message && props.message !== ""}>
            <Alert severity={props.isError ? "error" : "success"}>{props.message}</Alert>
        </SnackbarComponent>
    );
};
