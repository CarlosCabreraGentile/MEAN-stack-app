# Node Authentication API
*MEAN Stack Front To Back* *Traversy Media*

API for registering users with mongodb and authentication using a JWT (json web token). This app uses passport and passport-jwt and uses a JWT strategy

## Endpoints
```bash
POST /users/register
```

```bash
POST /users/authenticate   // Gives back a token
```

```bash
GET /users/profile         // Needs json web token to authorize
```
