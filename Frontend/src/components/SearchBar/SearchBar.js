import React, { useState } from 'react';

const SearchBar = (props) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState(false);

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (term.length >= 20) {
      setError(true);
      return;
    } else {
      props.onFormSubmit(term);
      setTerm('');
      setError(false);
    }
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        {!error ? (
          <div className="field">
            <label>Video search</label>
            <input
              className="input"
              onChange={onInputChange}
              value={term}
              type="text"
            />
          </div>
        ) : (
          <div className="field">
            <label>Video search</label>
            <input
              style={{ borderColor: 'red' }}
              className="input"
              onChange={onInputChange}
              value={term}
              type="text"
            />
            <div style={{ color: 'red' }}>
              Search input can't be longer than 20 characters
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
