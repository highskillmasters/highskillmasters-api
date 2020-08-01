# Contributing Guidelines

## Prepare MongoDB database

You should have a [MongoDB](https://mongodb.org) instance. Either using basic installation, cloud, or Docker.

We might migrate to other database solution in the future.

## Prepare Mailgun email

You should retrieve the [Mailgun](https://mailgun.com) API key from your own account during development.

## Install dependencies

Install using `yarn` instead of `npm`:

```sh
yarn
```

This will automatically create `.env` file during `postinstall`.

## Edit environment variables

Edit the `.env` file:

```
PLATFORM_API_KEY=a_secret_text
DOMAIN_URL=http://localhost:8000
MONGODB_URI=mongodb://localhost:27017/highskillmasters-api
MAILGUN_API_KEY=abcdefghijklmnopqrstu
MAILGUN_DOMAIN=mg.example.com
EMAIL_DEFAULT_FROM=Name <name@example.com>
EMAIL_DEFAULT_TO=name+other@example.com
```

## Prepare web

Before going further, you should also clone the [web repo](https://github.com/highskillmasters/highskillmasters-web) and [web admin repo](https://github.com/highskillmasters/highskillmasters-web-admin), then run the development server of React of each. So you can understand what's really needed in the client-side.

## Run development

```sh
yarn dev
```

Then you can send a request to `http://localhost:3000` on your browser or API client.

## Improvement

For now, we're focusing on improving the data, endpoint, and fixing issues.

Do let us know by creating [a new issue](https://github.com/highskillmasters/highskillmasters-api/issues) or sending a [pull request](https://github.com/highskillmasters/highskillmasters-api/pulls).

## API Documentation

| Endpoints              | Method | Description          | Headers         | Query           | Body    |
| ---------------------- | ------ | -------------------- | --------------- | --------------- | ------- |
| `/`                    | GET    | Hello message        | -               | -               | -       |
| `/auth`                | GET    | Get auth index       | -               | -               | -       |
| `/auth/login`          | GET    | Login as admin       | `Authorization` | `api_key`       | -       |
| `/members`             | GET    | Get all members      | `Authorization` | `api_key`       | -       |
| `/members/subscribe`   | POST   | Subscribe new member | -               | -               | `email` |
| `/members/unsubscribe` | POST   | Unsubscribe member   | -               | -               | `email` |
| `/members/verify`      | GET    | Verify member email  | -               | `email`, `code` | -       |
| `/tokens`              | GET    | Get all tokens       | `Authorization` | `api_key`       | -       |
