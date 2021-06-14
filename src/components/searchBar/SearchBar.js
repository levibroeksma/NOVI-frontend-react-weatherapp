import React, {useState} from 'react';
import './SearchBar.css';


function SearchBar({setLocationHandler}) {

    const [query, setQuery] = useState('');
    const handleClick = () => {
        setLocationHandler(query)
    };
    const keyPressCheck = (e) => {
        if (e.key === "Enter") {
            setLocationHandler(query)
        }
    }

  return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={keyPressCheck}
        placeholder="Zoek een stad in Nederland"
      />

      <button type="button" onClick={handleClick}>
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
