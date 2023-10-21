# Setup

### Local Database Setup

**Requirements:** 
- `docker`

```shell
# copy .env.example to .env
# The .env.example file contains the same database address as where the local database is configured to run
cp .env.example .env

# run the database container
npm run db:start

# seed the database
npm run db:seed

# stop and remove the database container
npm run db:stop
```

**NOTE:** The database is not configured for persistance. If the database container is removed (`npm run db:stop` does this)  re-seeding becomes necessary.

***

### Run tests

**Requirements:** 
- Database is setup
- `.env` is configured 

```shell
npm test
```

***

### Run generator

To run the generator use thw following command:
```
npm run start -- [method]
```

So for example if you would like to get `fakeAddress` you would run the following command: 
```
npm run start -- fakeAddress
```