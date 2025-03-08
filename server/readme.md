jwt-auth middleware
Extract Token: Look for the JWT in the x-auth-token header.
Verify Token: Check if the token is valid using jwt.verify().
Store User Data: Decode the token and store the user's ID (userId) in req.user.
Proceed: If valid, move to the next middleware or route handler. If invalid, return a 401 Unauthorized error.
