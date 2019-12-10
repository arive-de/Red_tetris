const params = {
  server: {
    host: '0.0.0.0',
    port: 3004,
    get url() { return `http://${this.host}:${this.port}` },
  },
  db: {
    host: '0.0.0.0',
    port: 27017,
    get url() { return `mongodb://${this.host}:${this.port}/redtetris` },
  },
}

module.exports = params

