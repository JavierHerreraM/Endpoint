import Joi from 'joi-browser';

// * Little validation module for the search input

const schema = Joi.string().alphanum().min(0).allow("").label("Search field");

let validateSearch = (search) => schema.validate(search);

export default validateSearch;