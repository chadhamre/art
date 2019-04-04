## Art API

This API will serve works of art from the Tate Modern art dataset and allow comments and users to be added.

#### To run this project locally:

1. Clone this repository locally
1. CD into the directory created
1. Run `yarn` to install dependencies
1. Run `yarn start` to run the server
1. This will start a local sever will be started accessible at http://localhost:3000/

#### Database:

- To make this project easy so share, I used an AWS hosted MYSQL database.
- So that you could access it, I included a .env file in this repo which contains credentials to connect. I would of course, in normal circumstances, never put credentials in a repo.
- Where possible I am relying on the database logic to validate data, rather than doing it memory on the server. Please look at the 'create.sql' file to see how the tables have been structured.
- `TODO` - tighten security on database.

#### Endpoints

`/api/art` - GET

- This endpoint will return an array containing all art and associated comments
- `TODO` - add pagination to endpoint, in this MVP I set the endpoint to return the first 1000 results.

`/api/art/:id` - GET

- This endpoint will return an art record and comments given a calid id.
- `TODO` - add response messages when user requests an invalid ID.

`/api/art/:id/comments` - POST

- This endpoint will create a new comment in the database.
- Sample POST body: `{"name":"Jimmy","content":"Hate it"}`
- Note: Content-Type must be set to 'application/json' for the body to be received
- `TODO` - add validation and error response messages.

`/api/users` - POST

- This endpoint will create a new user in the database.
- Sample POST body: `{"name":"Chad Hamre","age":35,"location":"Canada"}`
- Note: Content-Type must be set to 'application/json' for the body to be received
- `TODO` - add validation and error response messages.

#### Next Steps

Once the missing functionality called out above with the TODO notes, I'd do the following to tighten up the project:

- Add JWT for authentication
- Create Swagger documentation for Endpoint
- Deploy server to Heroku
