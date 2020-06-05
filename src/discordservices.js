let EventEmitter = require('events').EventEmitter
const centra = require('centra')
const https = require('https')
// const DiscordServices = require('discordservices.js')
// const Client = new DiscordServices.Client()

module.exports = class Client extends EventEmitter {
  constructor(id, token) {
    super()
    this.id = id;
    this.token = token;
  }

  
  async updateStats(servers, shards) {
    //console.log(this.id)

  if (servers == undefined && shards == undefined) return console.error('discordservices.js error: both servers and shards are not specified')
  if (servers == undefined) servers = 0;
  if (shards == undefined) shards = 0
   centra('https://api.discordservices.net', 'POST')
            .header('Authorization', `${this.token}`)
            .path(`/bot/${this.id}/stats`)
            .body({ servers, shards }, 'json')
            .send()
            .then(res => {
  let error = null;
  //console.log(res.statusCode.toString().startsWith('20'))

  if (!res.statusCode.toString().startsWith('20')) error = 'discordservices.js error: '+JSON.parse(res.body).message;
  this.emit('updateStats', error)
  })
  }

  async updateNews(title, content) {
    let error = false;
    centra('https://api.discordservices.net', 'POST')
            .header('Authorization', `${this.token}`)
            .path(`/bot/${this.id}/news`)
            .body({ title, content, error}, 'json')
            .send()
            .then(res => {
  let error = null;
  //console.log(res.statusCode.toString().startsWith('20'))

  if (!res.statusCode.toString().startsWith('20')) error = 'discordservices.js error: '+JSON.parse(res.body).message;
  this.emit('updateNews', error)
  })
  }

async updateCommands(commands) {
  if ('' + typeof (commands) != 'object') return console.error('discordservices.js error: commands object provided incorrectly (must be type object, it is type: ' + typeof (title) + ')')


  //so we have correct id and correct size, and correct token.
  //if (size < 0) return console.error('discordservices.js error: cannot set size to a negative value!')

  const data = JSON.stringify(commands)
  const options = {
    hostname: 'api.discordservices.net',
    port: 443,
    path: `/bot/${this.id}/commands`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': this.token
    }
  }

  const req = https.request(options, res => {
    //console.log('status code: '+res.statusCode)
    res.on('data', d => {
      d = JSON.parse(d)
      let error = null;
      if (!d.code.toString().startsWith('2')) error = 'discordservices.js error: '+d.message
      //return console.error('discordservices.js error: ' + d.message);
      this.emit('updateCommands', error);
    })
  })

  req.write(data)
  req.end()
}

  
}
