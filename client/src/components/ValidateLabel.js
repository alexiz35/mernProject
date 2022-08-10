import React from "react";
import styled from "../pages/AuthPage.module.css";

export const ValidateLabel = (props) => {
    const validColor = props.validateLabelColor

    return (

        <div className={styled.validateText}>
            <p>type input character must contains </p>
            <p style={{color:validColor.colorLength}}>length from 6 to 20 </p>
            <p style={{color:validColor.colorDigit}}>one digit from 0-9</p>
            <p style={{color:validColor.colorLower}}>one lowercase characters</p>
            <p style={{color:validColor.colorUpper}}>one uppercase characters</p>
            <p style={{color:validColor.colorSpecial}}>one special symbols in the list "!@#$%^&*"</p>
        </div>

    )
}

ValidateLabel.defaultProps = {
    validateColor:
        {
            colorLength: 'red',
            colorUpper: 'red',
            colorLower: 'red',
            colorSpecial: 'red',
            colorDigit: 'red'
        }
}