import React, { useState } from 'react';

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const pkmn = await fakeFetch("https://pokeapi.co/api/v2/pokemon/" + searchTerm);
        onSearch(pkmn); // Call the callback function with the searched Pokémon data
      } catch (err) {
        console.error("Error fetching Pokémon: " + err.message);
        onSearch(null); // Call the callback with null in case of an error
      }
    }
  };

  function fakeFetch(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("GET", url)
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error("Response was not OK!"))
        }
      }
      xhr.onerror = () => reject(new Error("Network Error!"))
      xhr.send()
    })
  }

  return (
    <div className='Search-Bar'>
      <form onSubmit={handleSearch}>
        <label htmlFor="header-search">
          <span className="visually-hidden"></span>
        </label>
        <input className='search-text'
          type="text"
          id="header-search"
          placeholder="Search Pokemon"
          name="s"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="submit-button">Search</button>
      </form>
    </div>
  );
};

export default NavBar;