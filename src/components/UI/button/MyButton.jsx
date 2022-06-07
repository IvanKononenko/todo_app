import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = ({children, ...props}) => {
    if (props.className==='myBtnInput'){
        return (
            <button {...props} className={classes.myBtnInput}>
                {children}
            </button>)
    }
    if (props.className==='myBtnDelete'){
        return (
            <button {...props} className={classes.myBtnDelete}>
                {children}
            </button>)
    }
    if (props.className==='myBtnActive'){
        return (
            <button {...props} className={classes.myBtnActive}>
                {children}
            </button>)
    }
    if (props.className==='myBtnDone'){
        return (
            <button {...props} className={classes.myBtnDone}>
                {children}
            </button>)
    }

}
export default MyButton;
