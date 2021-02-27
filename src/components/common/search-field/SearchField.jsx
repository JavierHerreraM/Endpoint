import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MyButton from '../button/Button';
import validateSearch from './searchValidation';
import './searchField.scss';

// TODO: make that you can search with other fields

// * A reusable search input
function SearchField(props) {
    const { newSearch } = props;

    // * var for controlled comp
    const [search, setSearch] = useState('');

    // * Variables to show error message on the search
    const [searchError, setSearchError] = useState({ activate: false, message: "" });

    // * Variables for the tooltip
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltip = useRef(null);

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

    return <Form className='searchField' onSubmit={handleSearch} >
        <div>
            <FormControl type="text" value={search} placeholder="Search username" onChange={handleChange} ref={tooltip} onClick={() => setShowTooltip(!showTooltip)} />
            <MyButton children={<FontAwesomeIcon icon={faSearch} />} functionality={handleSearch} color="secondary" />
        </div>
        {/* Adds the tooltip */}
        <Overlay target={tooltip.current} show={showTooltip} placement="top-start" rootClose={true} onHide={() => setShowTooltip(!showTooltip)}>
            {(props) => <Tooltip id="overlay-example" {...props}>Case sensitive</Tooltip>}
        </Overlay>
        {searchError.message && <Form.Text className="text-muted">{searchError.message}</Form.Text>}
    </Form>;
};

// * newSearch: set a state to the value of the input to trigger a call
SearchField.propTypes = {
    newSearch: PropTypes.func
};

export default SearchField;