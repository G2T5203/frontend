// SearchBar.js
import React from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const SearchBar = () => {
  const handleSearch = () => {
    // Handle search functionality here
    // You can add your search logic or call a function when the search icon is clicked
    console.log('Search clicked');
  };

  return (
    <Paper component="form" className="search-bar">
      <InputBase
        className="search-input"
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        type="submit"
        onClick={handleSearch}
        className="search-icon"
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
