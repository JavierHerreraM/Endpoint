import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MyButton from '../Button/Button';
import './SearchField.scss';

function SearchField(props) {
    const { setData } = props;
    let [search, setSearch] = useState('');

    async function handleSearch(event) {
        let response;
        event.preventDefault();
        if (search === '') {
            response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users`);
        } else {
            response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users/${search.toLowerCase()}`);
        }
        setData(response.data);
    }

    function handleChange(event) {
        setSearch(event.target.value);
    }

    return <Form className='searchField mb-2' inline onSubmit={handleSearch}>
        <FormControl type="text" value={search} placeholder="Search" onChange={handleChange} />
        <MyButton text={<FontAwesomeIcon icon={faSearch} />} onClick={handleSearch} color="secondary" />
    </Form>;
};

export default SearchField;