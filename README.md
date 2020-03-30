# task-tracker

### Task tracker rest application can be used to create, view, update, delete and search tasks created.
### Mongo Db is used to store the tasks details in following model
```{
_id*	number
uniqueItems: true
name*	string
uniqueItems: true
status*	string
project	string
deadline	string($date)
pattern: YYYY-MM-DD
}```

## Deploy Server
`node index.js`

### Rest Api starts listening at port 3000
### Link To use Api
`http://159.203.103.124:3000/api/v1/`

## Api-doc
### ` http://localhost:3000/api-docs/`

## Test Rest-Api
### Rest-Api end points can be tested using Postman/ Curl commands/ ` http://localhost:3000/api-docs/`



