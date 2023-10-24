# Setup

### Local Database Setup

**Requirements:** 
- `docker`
- `nodejs`

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
- ~~Database is setup~~
- ~~`.env` is configured~~
- `nodejs`
- Tests now use a mock of the database connection library, so it is no longer necessary to have a running instance of the database.

```shell
npm test
```

<br>

# Run generator

To run the generator use thw following command:
```
npm start -- [method]
```

So for example if you would like to get `fakeAddress` you would run the following command: 
```shell
npm start -- fakeAddress

# display a list of all valid arguments:
npm start
```

<br>

# CI Configuration

### SonarQube:

See `./sonar-project.properties`

### Jenkins:

Jenkins has been setup to execute builds on pushes to the main branch using the `GitHub hook trigger for GITScm polling` option.

**Build Step 1:** *Execute Shell*

```shell
# Install dependencies
echo "Install Dependecies"
npm ci

# Check linting
echo "Check linting"
npm run lint

# Run tests with mocks
echo "Run tests with mocks"
npm run test

# Prepare for testing without mocks
echo "Remove mocks, run database and seeding"
rm -rf __mocks__/
echo DB_URL=ws://dind:6000 > .env
npm run db:start
npm run db:seed

# Run tests without mocks
echo "Run tests without mocks"
npm test -- --coverage
```

The last test also generates a coverage report for SonarQube (see next step).

**Build Step 2:** *Execute SonarQube Scanner (plugin)

The SonarQube Scanner runs with the following argument to ensure the build fails if the quality gate does not pass:

`-Dsonar.qualitygate.wait=true -Dsonar.qualitygate.timeout=300`

**Post Build Task 1:** *Script* (plugin)

```shell
# stop and remove database container
npm run db:stop
```

**Post Build Task 2:** Delete workspace when build is done

- The workspace is deleted after the build since we need a fresh clone of the project every time. This is due to the fact that the repo is altered in the first build step when the mocks are removed. If we don't perform this step subsequent builds will fail.