import {NumericFormat} from 'react-number-format'
import TextField from '@mui/material/TextField';

const NumberField = (props) => {
    return <NumericFormat
    customInput={TextField}
    value={props.value === 0 ? "" : props.value}
    {...props}
    />
}

export default NumberField;