import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

function MyPagination(props) {
    // * options is the amount of 'pages' there can be, setPage is to set which 'page' show
    const { options, setPage } = props;

    let [active, setActive] = useState(1);

    // * Creates an array of options based on options
    let items = [];
    for (let number = 1; number <= options; number++) {
        items.push(number);
    }

    // * sets the selected page
    let handleSelect = (event) => {
        const optionSelected = parseInt(event.target.innerText);
        setActive(optionSelected);
        setPage(optionSelected);
    };

    return <>
        <div>
            <Pagination>
                {items.map((item, index) => {
                    return <Pagination.Item key={index} active={active === (index + 1) ? true : false} onClick={handleSelect}>
                        {item}
                    </Pagination.Item>
                })}
            </Pagination>
        </div>
    </>
};

MyPagination.propTypes = {
    options: PropTypes.number,
    setPage: PropTypes.func
};

export default MyPagination;