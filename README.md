# High Skill Masters API

High Skill Masters API allows you to:

- Subscribe a new member.
- Verify member's email.

## Environment Variables

Edit the `.env` file:

```
PLATFORM_API_KEY=
DOMAIN_URL=
MONGODB_URI=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
EMAIL_DEFAULT_FROM=
EMAIL_DEFAULT_TO=
```

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
