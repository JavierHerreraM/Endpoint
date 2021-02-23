import Joi from 'joi-browser';

// * Validation for the user inputs

// * It requires the username, firstName and lastName, they also have a minLength
const schema = Joi.object({
    username: Joi.string().alphanum().required().min(1).label("Username"),
    firstName: Joi.string().required().min(1).label("First name"),
    lastName: Joi.string().required().min(1).label("Last name"),
    age: Joi.number().greater(0).label("Age"),
    email: Joi.string().email().label("Email")
});

// * Receives an user and validates him, aborts the operation with the first wrong parameter
let validateUser = (user) => schema.validate(user, {abortEarly: true});

export default validateUser;