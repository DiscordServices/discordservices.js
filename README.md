<p align="center"><b>discordservices.js</b></p>
<p align="center">ES6 Promise based API Wrapper for discordservices.net</p>

## Methods
**Logging In**
<details>
    <summary>Params</summary>

| Param         | Type     | Default | Description            |
| ------------- | -------- | ------- | ---------------------- |
| options       | `Object` |         | Options for client     |
| options.id    | `string` | `""`    | Discord bot id         |
| options.token | `string` | `""`    |  DiscordServices token |
</details>
<details>
    <summary>Example</summary>

```js
import { Client } from "discordservices.js"; // ES6
// or
const { Client } = require("discordservices.js"); // ES5

const ds = new Client({
    id,
    token
});
```
</details>

**Updating Stats**
<details>
    <summary>Params</summary>

| Param         | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| stats         | `Object` | Stats for update              |
| stats.servers | `number` | The number of servers the bot |
| stats.shards  | `number` | The number of shards the bot  |
</details>
<details>
    <summary>Example</summary>
    
```js
ds.updateStats({
    servers,
    shards
}); // => Promise
```
</details>

**Posting News**
<details>
    <summary>Params</summary>

| Param        | Type      | Default | Description   |
| ------------ | --------- | ------- | ------------- |
| news         | `Object`  |         | News for post |
| news.title   | `string`  | `""`    | News title    |
| news.content | `string`  | `""`    | News content  |
| news.error   | `boolean` | `false` | Is error news |
</details>
<details>
    <summary>Example</summary>

```js
ds.postNews({
    title,
    content
}); // => Promise
```
</details>

**Updating Commands †**
<details>
    <summary>Params</summary>

| Param             | Type       | Description          |
| ----------------- | ---------- | -------------------- |
| commands          | `Object[]` |  Commands for update |
| commands.command  | `string`   | Command name         |
| commands.desc     | `string`   | Command description  |
| commands.category | `string`   | Command category     |
</details>
<details>
    <summary>Example</summary>
    
```js
ds.updateCommands(commands);  // => Promise
```
</details>

## Events
<details>
    <summary>Events</summary>
    
| Name             | Description     |
| ---------------- | --------------- |
| `updateStats`    | Stats Update    |
| `postNews`       | News Update     |
| `updateCommands` | Commands Update |
| `updateCommands` | Commands Update |
| `requestError`   | Request error   |
</details>
<details>
    <summary>Example</summary>
    
```js
ds.on("error", (error) => {
  // ...
});
```
</details>

If you have any **questions** regarding use of this library, feel free to contact the developer.

###### † The structure of the commands object can be found on the API page [here](https://discordservices.net/docs/api)
