# High Skill Masters API

High Skill Masters API allows you to:

- Subscribe a new member.
- Verify member's email.

## API Documentation

| Endpoints              | Method | Description          | Data    | Query                  |
| ---------------------- | ------ | -------------------- | ------- | ---------------------- |
| `/`                    | GET    | Hello message        | -       | -                      |
| `/members/subscribe`   | POST   | Subscribe new member | `email` | -                      |
| `/members/unsubscribe` | POST   | Unsubscribe member   | `email` | -                      |
| `/members/verify`      | GET    | Verify member email  | -       | `email`, `verify_code` |
