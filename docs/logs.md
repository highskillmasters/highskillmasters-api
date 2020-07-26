# Logs

## Subscribe email

### Request

```
http POST localhost:3000/members/subscribe email=name@example.com

{
  "email": "name@example.com",
  "emailData": {
    "subject": "Verify email on High Skill Masters",
    "text": "Please verify your email by clicking this link:\nhttp://localhost:3000/members/verify?email=name@example.com&code=abcdefghijklmnopqrstuvwxyz\n\nThank you!\nHigh Skill Masters",
    "to": "name@example.com"
  },
  "message": "Subscribe email success"
}
```

### Server

```
[2020-07-26T18:13:07.678Z][MEMBER_SUBSCRIBE_SUCCESS] name@example.com
POST /members/subscribe 200 156.223 ms - 363
[2020-07-26T18:13:12.332Z][MAILGUN_SEND_EMAIL] name@example.com Queued. Thank you.
```

## Verify email

### Request

```
http 'localhost:3000/members/verify?email=name@example.com&code=abcdefghijklmnopqrstuvwxyz'
```

### Server

```
[2020-07-26T18:20:47.282Z][MEMBER_VERIFIED] name@example.com
GET /members/verify?email=name@example.com&code=abcdefghijklmnopqrstuvwxyz 200 55.435 ms - -
GET /favicon.ico 200 2.765 ms - 15086
[2020-07-26T18:20:48.633Z][MAILGUN_SEND_EMAIL] name@example.com Queued. Thank you.
```
