const https = require('https')
let globalToken = ''

exports.login = function(token) {
  if (!token) return console.error('dservice error: no token provided')
  if (''+typeof(token) != 'string') return console.error('dservice error: token must be a string')
  globalToken = token;
}

exports.updateStats = function(id, size, shards) {
  if (!id) return console.error('dservice error: id param is missing')
  if (''+typeof(id) != 'string') return console.error('dservice error: bot id provided incorrectly (must be type string, it is type: '+typeof(id)+')')
  if (''+typeof(size) != 'number' && size != undefined) return console.error('dservice error: guild size provided incorrectly (must be type number, it is type: '+typeof(size)+')')
  if (''+typeof(shards) != 'number' && shards != undefined) return console.error('dservice error: shard size provided incorrectly (must be type number, it is type: '+typeof(shards)+')')
  if (globalToken == '' || globalToken == undefined) return console.error('dservice error: not logged in')
  //so we have correct id and correct size, and correct token.
  if (size == undefined && shards == undefined) return console.error('dservice error: both size and shards are not specified')
  if (size == undefined) size = 0;
  if (shards == undefined) shards = 0
  const data = JSON.stringify({servers: size, shards: shards})
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
    return console.error('dservice error: '+d);

  })
  })

req.write(data)
req.end()
}

exports.updateNews = function(id, title, desc) {
 /* wip */ 
}
