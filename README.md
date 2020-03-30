# task-tracker

### Task tracker rest application can be used to create, view, update, delete and search tasks created.
### Mongo Db is used to store the tasks details in following model
`{
_id*	number
uniqueItems: true
name*	string
uniqueItems: true
status*	string
project	string
deadline	string($date)
pattern: YYYY-MM-DD
}`

## Deploy Server
### To start the server run the following command
`node index.js`

### Rest Api starts listening at port 3000
### To use Api visit following link :
`http://159.203.103.124:3000/api/v1/`

## Use Rest-Api
### Rest-Api end points can be tested using Postman/ Curl commands.

## Api-doc
### To test Api using swagger visit following link:
` http://localhost:3000/api-docs/`

