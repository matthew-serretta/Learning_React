# Description

This was the first project I worked on while learning React. It is adapted from an interview challenge I was given where I implemented features such as drag and drop and autocomplete labels.

React
Material UI
TypeScript
GraphQL
PostGRES

## Running locally

### Back-end

```sh
cd backend
yarn
docker-compose up -d
sleep 5 # necessary to wait for the db to boot
yarn db:setup
yarn start
```

### Front-end

```sh
cd frontend
yarn
yarn start
```

## Assumptions / Theoretical Future Work

- Drag and Drop wrappers in NotesPage/index could be seperated in nested components for improved clarity.
- Upgrade to mui v5 is only partial, components would be incrementally upgraded until mui v4 can be removed.
- DB structure is not optimal, particularly for note labels. This is because it wasn't the focus of this project and was simpler to implement. 
- GQL label type and id field wasn't strictly necessary however it is a better GQL interface for the future.
- No input validation is done so things like apostrophes in note labels will cause errors and SQL injection attacks are entirely possible.
