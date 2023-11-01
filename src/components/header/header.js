import React, { useState } from 'react';

export default function Header({ setSearchInput, setSearchActive }) {
    const [searchInput, setSearchInputState] = useState('');

    const handleSearch = () => {
        console.log("Entered handleSearch");
        setSearchInput(searchInput);
        setSearchActive(true);
    };

    return (
        <>
            <div className="header">
                Fake Stack Overflow
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        id="searchBar"
                        value={searchInput}
                        onChange={(e) => setSearchInputState(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    );
}