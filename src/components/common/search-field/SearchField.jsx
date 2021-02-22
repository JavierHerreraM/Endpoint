import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MyButton from '../button/Button';
import validateSearch from './searchValidation';
import './searchField.scss';

// TODO: make that you can search with other fields

// * A reusable search input
function SearchField(props) {
    // * newSearch: set a variable to the value of the input to trigger a call
    const { newSearch } = props;

    // * var for controlled comp
    let [search, setSearch] = useState('');

    let [searchError, setSearchError] = useState({ activate: false, message: "" });

    // * In case of error set some values to display in screen and sets newSearch to false 
    // *so it doesn't trigger a new search
    const handleSearch = (event) => {
        event.preventDefault();
        const { error } = validateSearch(search);
        if (error) {
            setSearchError({
                path: true,
                message: error.details[0].message
            });
            newSearch(false);
        } else {
            setSearchError({ activate: false, message: "" });
        }
        if (search === "") {
            // * blank value trigger a get request of all users
            newSearch("blank");
        } else {
            newSearch(search);
        }
    }

    const handleChange = (event) => setSearch(event.target.value);

    return <Form className='searchField' onSubmit={handleSearch}>
        <div>
            <FormControl type="text" value={search} placeholder="Search username" onChange={handleChange} />
            <MyButton text={<FontAwesomeIcon icon={faSearch} />} functionality={handleSearch} color="secondary" />
        </div>
        {searchError.message && <Form.Text className="text-muted">{searchError.message}</Form.Text>}
    </Form>;
};

export default SearchField;