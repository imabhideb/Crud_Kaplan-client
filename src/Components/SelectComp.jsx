import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectComp = ({ menu, label, status, setStatus }) => {
  return (
    <div>
      <Select value={status} label={label} onChange={(e) => setStatus(e.target.value)}>
        {menu.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectComp;
