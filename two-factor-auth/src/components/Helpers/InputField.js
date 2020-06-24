import React from 'react'
import { Field } from "formik";
import TextField from '@material-ui/core/TextField';

import './InputField.css'

const InputField = ({ name, label, placeholder, width }) => {
    return (
        <div className="inputField">
            <Field 
                as={TextField} 
                id="outlined-textarea" 
                variant="outlined"
                autoComplete="off"
                required
                name={name}
                label={label}
                width={width}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputField

