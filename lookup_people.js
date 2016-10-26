
const search_term = process.argv[2].toString();

const pg = require("pg");
const settings = require("./settings"); // settings.json

const displayResult = function (data) {
  if (typeof data.rows[0] != 'undefined') {
    console.log(`Found ${data.rows.length} person(s) by the name ${data.rows[0].first_name}`);
    console.log(data.rows[0]);
  } else {
    console.log("No User Found!");
  }
};

const getUser = function (input) {
  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log("Searching..");
    client.query("SELECT * FROM users WHERE first_name=$1::text OR last_name=$1::text", [`${input}`], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      displayResult(result);
      client.end();
    });
  });
};

getUser(search_term);

