import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
        width: '20%'
    },
  })
);


export const TextInput = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.wrapForm} >
            <TextField
                id="standard-text"
                label="Enter message"
                className={classes.wrapText}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                //margin="normal"
            />
            <Button onClick={props.onClickSend} variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </div>
        </>
    )
}