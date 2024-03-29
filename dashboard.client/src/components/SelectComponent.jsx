import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({ inputLabel, value, menuItems, onChange }) {
    const [selectedValue, setSelectedValue] = React.useState(value);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id={`demo-select-small-label-${inputLabel}`}>
                {inputLabel}
            </InputLabel>
            <Select
                labelId={`demo-select-small-label-${inputLabel}`}
                id={`select-${inputLabel}`}
                value={selectedValue}
                label={inputLabel}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
