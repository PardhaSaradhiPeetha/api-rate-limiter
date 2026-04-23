Developer → calls your API → you apply token bucket → allow/block

Request → routes → controllers → core → models/config → response

request → rate limit → allow/block

--------------------------------------
Client (developer API call)
   ↓
routes/
   ↓
controllers/
   ↓
core/ (rateLimiter)
   ↓
Redis (decision)
   ↓
MongoDB (logs)
   ↓
controller → response