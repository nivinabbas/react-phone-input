import countries from "./assets/countries";
import "./styles.css";
import { useState, useRef } from "react";
import PropTypes from 'prop-types';

const CountryItem = ({ country: { flag, name, dial_code }, onClick }) => {
  return (
    <div onClick={onClick} className="item">
      <p id="item-flag">{flag}</p>
      <p>
        {name} ({dial_code})
      </p>
    </div>
  );
};

const SearchItem = ({onSearch}) => {
return <><hr />
<input placeholder="Search.." style={{ marginLeft: 8 }} onChange={(e)=>onSearch(e)} />
<hr /></>
};

const PhoneInput =  ({ onChange, defaultCountry = "US",width=300 }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.code === defaultCountry.toUpperCase())
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries.filter(country=>country.code !== defaultCountry.toUpperCase()));
  const inputRef = useRef(null);

  const onSearch = ({ target: { value } }) => {
    if (value === "" || !value)
      return setFilteredCountries(
        countries
      );

    return setFilteredCountries(
      countries
        .filter((country) =>
          country.name.toLowerCase().includes(value.toLowerCase()) || country.dial_code.includes(value)
        )
    );
  };


  return (
    <div className="phone-container" style={{width}}>
      <div className="phone">
        <p id="main-flag" onClick={() => setShowDropdown(!showDropdown)}>
          {selectedCountry.flag}
        </p>
        <p>{selectedCountry.dial_code}</p>
        <input
          onKeyDown={(e) => 
            e.keyCode === 69 || e.keyCode === 190 || (e.target.value.length  > 13 && e.keyCode !== 8)&&  e.preventDefault()
          }
          onChange={(e) =>onChange(`${selectedCountry.dial_code}${e.target.value}`)}
          
          maxLength="9"
          type="number"
          onClick={() => setShowDropdown(false)}
          ref={inputRef}
        />
      </div>
      {showDropdown && (
        <div className="options-dropdown">
          <CountryItem
            onClick={() => {
              setSelectedCountry(selectedCountry);
              setShowDropdown(!showDropdown);
              inputRef.current.focus();
            }}
            country={selectedCountry}
          />

          <SearchItem onSearch={onSearch}/>

          {filteredCountries.length? filteredCountries.map((country) => (
            <CountryItem
              key={country.code}
              onClick={() => {
                setSelectedCountry(country);
                setShowDropdown(!showDropdown);
                inputRef.current.focus();
              }}
              country={country}
            />
          )):<p>No Result</p>}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;

PhoneInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  width:PropTypes.number,
  defaultCountry:PropTypes.string

};

SearchItem.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

CountryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  country: 
    PropTypes.shape({
      flag: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dial_code:PropTypes.string.isRequired
    })
  .isRequired,
};
