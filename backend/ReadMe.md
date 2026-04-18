
End User → Developer API → Your Rate Limiter → Redis
                                      ↓
                                 Your Dashboard

Request → routes → controllers → core → models/config → response


endUser → rate limit → allow/block

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