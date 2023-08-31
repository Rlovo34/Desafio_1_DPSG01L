import React from 'react';

const DropdownList = ({ options, handleChange }) => {
  return (
    <select onChange={handleChange}>
      <option value="">Seleccione un producto</option>
      {options.map((option, index) => (
        <option key={index} value={option.nombre}>
          {option.nombre} - ${option.precio}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;