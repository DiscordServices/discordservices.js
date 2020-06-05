# discordservices.js
API Wrapper for discordservices.net

## Methods
**Logging In**
```js
const DS = require('discordservices.js');
let ds = new DS(id, token)
```
**Updating Stats**
```js
ds.updateStats(guildSize, shardCount)

```

**Posting News**
```js
ds.updateNews(title, content)
```

**Updating Commands †**
```js
ds.updateCommands(commands)
```

## Events
**Stats Update**
```js
ds.on('updateStats', (error) => {
  // ...
})
```

**News Update**
```js
ds.on('updateNews', (error) => {
  // ...
})
```

**Commands Update**
```js
ds.on('updateCommands', (error) => {
  // ...
})
```

If you have any **questions** regarding use of this library, feel free to contact the developer.

###### † The structure of the commands object can be found on the API page [here](https://discordservices.net/docs/api)
