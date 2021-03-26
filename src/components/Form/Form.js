import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    root: {
        position:'fixed',
        width: '100%',
        zIndex: '10',
        padding: '0px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(0,0,0, 0.1)',
    },
    
    inputbar: {
        margin: '20px',
        marginRight: '10px',
        width: '300px',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(30,109,240, 0.1)',
        fontSize: 'large',
        borderRadius: '10px'
    },
    inputbtn: {
        padding: '10px',
        fontSize: 'large',
        color: 'white',
        backgroundColor: 'rgba(30,109,240,1)',
        borderRadius: '7px',
        border: '1px solid rgba(30,109,240, 1)',
    }
  });

export const Form = ({ userInput, onFormChange, onFormSubmit }) => {

    const classes = useStyles();


    const handleChange = (event) => {
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    } 

    return (
        <div className={classes.root}>
            
            <form onSubmit={ handleSubmit } >
                <input type="text" required value={userInput} onChange={handleChange} placeholder="eg. #twitter, cricket, zomato, etc." className={classes.inputbar} ></input>
                <input type="submit" value="Search" className={classes.inputbtn} ></input>
            </form>
        </div>
    );
}