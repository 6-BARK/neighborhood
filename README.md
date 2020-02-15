# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

### API routes

POST '/api/neighborhoods'
-request body : {
  id: Number,
  name: String,
  valueShift: Number,
  predictedShift: Number,
  zestimate: Number,
  walkScore: Number,
  transitScore: Number,
}
-response (201)

POST '/api/neighborhoods/:id1/listing/:id2'
-request body: {
  id: Number,
  username: String,
  password: String,
  address: String,
  map: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number
}
-response (201)

GET '/api/neighborhoods'
-request body: NONE
-response (200): {
  id: Number,
  name: String,
  valueShift: Number,
  predictedShift: Number,
  zestimate: Number,
  walkScore: Number,
  transitScore: Number,
}

GET '/api/neighborhoods/:id1/listings/:id2'
-request body: none
-response (200): {
  id: Number,
  userName: String,
  address: String,
  map: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number
}

PUT '/api/neighborhoods/:id'
-request body: {
  id: Number,
  name: String,
  valueShift: Number,
  predictedShift: Number,
  zestimate: Number,
  walkScore: Number,
  transitScore: Number
}
-response (200)

PUT '/api/neighborhoods/:id1/listings/:id2'
-request body: {
  id: Number,
  userName: String,
  address: String,
  map: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number
}
-response (200)

DELETE '/api/neighborhoods/:id'
-request body: NONE
-response (200)

DELETE '/api/neighborhoods/:id'
-request body: {
  username: String,
  password: String
}
-response (200)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

