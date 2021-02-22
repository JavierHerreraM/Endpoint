import getAll from './imgs/get-all.png';
import getOne from './imgs/get-one.png';
import postBody from './imgs/post-body.png';
import postResponse from './imgs/post-response.png';
import putBody from './imgs/put-body.png';
import putResponse from './imgs/put-response.png';
import deleteImg from './imgs/delete.png';


// * It has all the documentation and import the images 
const info = [
    {
        title: "Get all users",
        labels: ["GET", "https://jh-endpoint-api.herokuapp.com/users"],
        body: ["Does a GET request that searches for all users and returns a 200 status code and an array of users. Each user object has five properties: username, firstName, lastName, age, and email.", "If it doesn't found any username, it returns a 404 status code and an error message."],
        img: [getAll]
    }, 
    {
        title: "Get a specific user",
        labels: ["GET", "https://jh-endpoint-api.herokuapp.com/users/username"],
        body: ["Does a GET request that searches for a user with the given username and returns a 200 status code and the found user object. The returned user object has five properties: username, firstName, lastName, age, and email.", "If it doesn't found any username, it returns a 404 status code and an error message."],
        img: [getOne]
    }, 
    {
        title: "Create a new user",
        labels: ["POST", "https://jh-endpoint-api.herokuapp.com/users"],
        body: ["Does a POST request that creates a new user, it returns a 200 status code and the created user object.", "The body of the request has five fields: username, firstName, lastName, age, and email. The username must be alphanumeric and unique; it requires the username, firstName, and lastName fields; age must be greater than 0 and the email must have an email format.", "If the body of the request is invalid or if the username already exists it returns a 400 status code and an error message."],
        img: [postResponse, postBody]
    }, 
    {
        title: "Update a user",
        labels: ["PUT", "https://jh-endpoint-api.herokuapp.com/users/username"],
        body: ["Does a PUT request that searches for a user through the given username and updates it, returning a 200 status code and the updated user object.", "The body of the request has five fields: username, firstName, lastName, age, and email. The username must be alphanumeric and unique; it requires the username, firstName, and lastName fields; age must be greater than 0 and the email must have an email format.", "If the body of the request is invalid or if the username already exists it returns a 400 status code and an error message. If the username is not found it returns a 404 status code and an error message."],
        img: [putResponse, putBody]
    }, 
    {
        title: "Delete a user",
        labels: ["DELETE", "https://jh-endpoint-api.herokuapp.com/users/username"],
        body: ["Does a DELETE request that searches for a user through the given username and deletes it, returning a 200 status code and the deleted user object. The returned user object has five properties: username, firstName, lastName, age, and email.", "If it doesn't found any username, it returns a 404 status code and an error message."],
        img: [deleteImg]
    }, 

];

export default info;