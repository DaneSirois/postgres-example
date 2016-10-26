const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const user = process.argv.slice(2);
const first_name = user[0];
const last_name = user[1];
const birthdate = Number(user[2]);

knex('users').insert({first_name, last_name, birthdate}).then(() => {
  console.log(`Inserted (Username: ${first_name}, Last Name: ${last_name}, Birthdate: ${birthdate}) into 'Users' database`);
});