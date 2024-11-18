import React, { useState, useEffect, useRef } from 'react';
import "./CustomDropDown.css"

const CustomDropdown = ({name="",labelField="label",valueField="value", options=[], value="", onChange=()=>{}, placeholder="" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    let target={target:{name,value:option[valueField]}}
    setSelectedOption(option);
    onChange(target);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="custom-dropdown">
      <div className="custom-dropdown__control" onClick={handleToggle}>
        <div className="custom-dropdown__selected-value" style={{color:selectedOption?"#002366":"rgba(68, 84, 111, 1)"}}>
          {selectedOption ? selectedOption[labelField] : placeholder}
        </div>
        <img alt="" src="/dropdownArrow.svg" className="img-fluid" />
        {/* <div className="custom-dropdown__arrow">&#9662;</div> */}
      </div>
      {isOpen && (
        <div className="custom-dropdown__menu">
          {options && options.map((option) => (
            <div
              key={option[valueField]}
              className="custom-dropdown__option"
              onClick={() => handleOptionClick(option)}
            >
              {option[labelField]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
