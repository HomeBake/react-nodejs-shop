import React, {useState} from 'react';

const Search = (props) => {
    const params = (new URL(document.location)).searchParams;
    const [searchValue, setSearchValue] = useState(params.get("search") ? params.get("search") : "")

    return (
        <input
            className={props.className}
            placeholder={props.placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    );
};

export default Search;