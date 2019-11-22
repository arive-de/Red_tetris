const params = {
  server: {
    host: '0.0.0.0',
    port: 3004,
    get url() { return `http://${this.host}:${this.port}` },
  },
  db: {
    url: 'mongodb://localhost:27017/redtetris',
  },
}

module.exports = params

