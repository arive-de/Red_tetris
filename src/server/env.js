const mongoose = require('mongoose');

export function init() {

  mongoose.connect('mongodb://localhost:27017/redtetris', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
          console.log('Database is connected');
        },
        err => {
          console.log(`Can not connect to the database ${err}`);
        }
    );
};