# discordservices.js
API Wrapper for discordservices.net

### Setup / Examples
```js
const ds = require('discordservices.net');
ds.login(token)
//found on api page

//Updating stats
ds.updateStats(id, guildSize, shardCount)

ds.updateStats('4692050505699136969', 200)
//updates servers to 200 and shards to 0
ds.updateStats('4692050505699136969', 2069, 3)
//updates servers to 2069 and shards to 3
```
Each API request updates **both** shards and guilds, so if you only want to update guilds, but still want to keep shards, you have to specify both, or it will be set to zero.
