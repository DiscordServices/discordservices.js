const https = require('https')
let globalToken = ''
let id = '';

exports.Client = function Client() {
  this.login = function (token, ida) {
    if (!token) return console.error('discordservices.js error: no token provided')
    if (!ida) return console.error('discordservices.js error: no bot id provided')
    if ('' + typeof (token) != 'string') return console.error('discordservices.js error: token must be a string')
    globalToken = token;
    id = ida;
  }
  this.updateStats = function (size, shards) {
    updateStats(id, size, shards)
  }
  this.postNews = function (title, content) {
    postNews(id, title, news)
  }
  this.updateCommands = function(commandsObject) {
    updateCommands(id, commandsObject)
  }
  
}

let updateStats = function (id, size, shards) {
  if (!id) return console.error('discordservices.js error: id param is missing')
  if ('' + typeof (id) != 'string') return console.error('discordservices.js error: bot id provided incorrectly (must be type string, it is type: ' + typeof (id) + ')')
  if ('' + typeof (size) != 'number' && size != undefined) return console.error('discordservices.js error: guild size provided incorrectly (must be type number, it is type: ' + typeof (size) + ')')
  if ('' + typeof (shards) != 'number' && shards != undefined) return console.error('discordservices.js error: shard size provided incorrectly (must be type number, it is type: ' + typeof (shards) + ')')
  if (globalToken == '' || globalToken == undefined) return console.error('discordservices.js error: not logged in')
  //so we have correct id and correct size, and correct token.
  //if (size < 0) return console.error('discordservices.js error: cannot set size to a negative value!')
  if (size == undefined && shards == undefined) return console.error('discordservices.js error: both size and shards are not specified')
  if (size == undefined) size = 0;
  if (shards == undefined) shards = 0
  const data = JSON.stringify({ servers: size, shards: shards })
  const options = {
    hostname: 'api.discordservices.net',
    port: 443,
    path: `/bot/${id}/stats`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': globalToken
    }
  }

  const req = https.request(options, res => {
    //console.log('status code: '+res.statusCode)
    res.on('data', d => {
      d = JSON.parse(d)
      if (d.code == 200) return;
      let error = d.message
      return console.error('discordservices.js error: ' + d.message);

    })
  })

  req.write(data)
  req.end()
}

let postNews = function (id, title, content) {
  if (!id) return console.error('discordservices.js error: id param is missing')
  if ('' + typeof (id) != 'string') return console.error('discordservices.js error: bot id provided incorrectly (must be type string, it is type: ' + typeof (id) + ')')
  if ('' + typeof (title) != 'string') return console.error('discordservices.js error: title text provided incorrectly (must be type string, it is type: ' + typeof (title) + ')')
  if ('' + typeof (content) != 'string') return console.error('discordservices.js error: content size provided incorrectly (must be type string, it is type: ' + typeof (content) + ')')
  if (globalToken == '' || globalToken == undefined) return console.error('discordservices.js error: not logged in')
  //so we have correct id and correct size, and correct token.
  //if (size < 0) return console.error('discordservices.js error: cannot set size to a negative value!')

  const data = JSON.stringify({ title: title, content: content, error: false })
  const options = {
    hostname: 'api.discordservices.net',
    port: 443,
    path: `/bot/${id}/news`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': globalToken
    }
  }

  const req = https.request(options, res => {
    //console.log('status code: '+res.statusCode)
    res.on('data', d => {
      d = JSON.parse(d)
      if (d.code == 200) return;
      return console.error('discordservices.js error: ' + d.message);

    })
  })

  req.write(data)
  req.end()
}

let updateCommands = function (commands) {
  if (globalToken == '' || globalToken == undefined) return console.error('discordservices.js error: not logged in')
  if (!id) return console.error('discordservices.js error: id param is missing')
  if ('' + typeof (id) != 'string') return console.error('discordservices.js error: bot id provided incorrectly (must be type string, it is type: ' + typeof (id) + ')')
  if ('' + typeof (commands) != 'object') return console.error('discordservices.js error: commands object provided incorrectly (must be type object, it is type: ' + typeof (title) + ')')


  //so we have correct id and correct size, and correct token.
  //if (size < 0) return console.error('discordservices.js error: cannot set size to a negative value!')

  const data = JSON.stringify(commands)
  const options = {
    hostname: 'api.discordservices.net',
    port: 443,
    path: `/bot/${id}/commands`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': globalToken
    }
  }

  const req = https.request(options, res => {
    //console.log('status code: '+res.statusCode)
    res.on('data', d => {
      d = JSON.parse(d)
      if (d.code == 200) return;
      return console.error('discordservices.js error: ' + d.message);

    })
  })

  req.write(data)
  req.end()
}
