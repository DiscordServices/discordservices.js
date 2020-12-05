import EventEmitter from "events";
import axios from "axios";

const API_ENDPOINT = "https://api.discordservices.net";

export class Client extends EventEmitter {

  /**
   * @param {Object} options - Options for client
   * @param {string} options.id="" - Discord bot id
   * @param {string} options.token="" - DiscordServices token
   */
  constructor({ id = "", token = "" }) {
    super();

    this.id = id;

    this.client = axios.create({
        baseURL: API_ENDPOINT,
        headers: {
            authorization: token
        }
    });
  }

  /**
   * @description Update bot stats
   * @param {Object} stats - Stats for update
   * @param {number} stats.servers=0 - The number of servers the bot
   * @param {number} stats.shards=0 - The number of shards the bot
   * @return {Promise} Update response or error
   */
  updateStats({ servers = 0, shards = 0 }) {
    return new Promise(((resolve, reject) => {
        this.client.post(`/bot/${this.id}/stats`, { shards, servers })
          .then(({ data }) => {
            console.log(data);

            this.emit("updateStats");

            resolve(data);
          })
          .catch((error) => {
              error = error.response.data ?? {error};

              error.method = "updateStats";

              this.emit("requestError", error);

              reject(error);
          });
    }));
  }

    /**
     * @description Post bot news
     * @param {Object} news - News for post
     * @param {string} news.title="" - News title
     * @param {string} news.content="" - News content
     * @param {boolean} [news.error=false] - Is error news
     * @return {Promise} Post response or error
     */
  postNews({ title = "", content = "", error = false }) {
      return new Promise((resolve, reject) => {
          this.client.post(`/bot/${this.id}/news`, { title, content, error })
              .then(({ data }) => {
                  this.emit("postNews");

                  resolve(data);
              })
              .catch((error) => {
                  error = error.response.data ?? {error};

                  error.method = "postNews";

                  this.emit("requestError", error);

                  reject(error);
              });
      });
  }

    /**
     * @description Update bot commands
     * @param {Object[]} commands=[] - Commands for update
     * @param {string} commands.command - Command name
     * @param {string} commands.desc - Command description
     * @param {string} commands.category - Command category
     * @return {Promise} Update response or error
     */
  updateCommands(commands = []) {
      return new Promise((resolve, reject) => {
          this.client.post(`/bot/${this.id}/commands`, commands)
              .then(({ data }) => {
                  this.emit("updateCommands");

                  resolve(data);
              })
              .catch((error) => {
                  error = error.response.data ?? {error};

                  error.method = "updateCommands";

                  this.emit("requestError", error);

                  reject(error);
              });
      });
  }
}
