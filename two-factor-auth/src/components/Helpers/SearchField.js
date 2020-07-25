import React from 'react'
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const SearchField = () => {
    return (
        <div className="App">
          <TextField
            type="search"
            variant="outlined"
            margin="normal"
            placeholder="Email"
            className="searchField"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
      );
}

export default SearchField