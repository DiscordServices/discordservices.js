# discordservices.js
API Wrapper for discordservices.net

## Setup / Examples
**Logging In**
```js
const ds = require('discordservices.js');
ds.login(token)
//found on api page
```
**Updating Stats**
```js
ds.updateStats(id, guildSize, shardCount)

ds.updateStats('4692050505699136969', 200)
//updates servers to 200 and shards to 0
ds.updateStats('4692050505699136969', 2069, 3)
//updates servers to 2069 and shards to 3
```
Each API request updates **both** shards and guilds, so if you only want to update guilds, but still want to keep shards, you have to specify both, or it will be set to zero.

**Posting News**
```js
ds.postNews(id, title, content)

ds.postNews('4692050505699136969', 'News!', 'This is important news')
//posts news title to 'News!' and content to 'This is important news'
```

**Updating Commands**
```js
const commands = [
  {
    command: '/say',
    desc: 'This does a say command',
    category: 'Utility'
  },
  {
    command '/help',
    desc: 'This does a help command',
    category: 'General'
  }
]

ds.updateCommands(id, commandsObject)

ds.update('4692050505699136969', commands)
//resets current commands and updates commands to commandsArray
```
Just like with `updateStats()`, each API request overlaps/resets the previous, meaning it sets the commands to the ones specified in the recent request, it doesn't add onto it.

If you have any **questions** regarding use of this library, feel free to contact the developer.
