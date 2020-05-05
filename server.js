const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios");

const config = {
  channelAccessToken:
    "1CqbCUOe/fP41x4cdDVAyzG7EYlEoYPC+irDLV30GDJLpxv5niaTQKPr0v3rcwUcL7NkG6Ovg4f0w4KVSuxSK8yysw2CEO6ZgK6YO1YQMUYkHCnH13DwakWUx37TMjCh4xg9ZBtENrFU2VzJECGa9gdB04t89/1O/w1cDnyilFU=",
  channelSecret: "3318eda7956fbfb296ad3b8ab791dfb7"
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(e => {
      console.log(e);
    });
});

// main handle function
function handleEvent(event) {
  console.log(event);
  let message = event.message.text;
  let result = error(message);

  if (message == "tolong") {
    result = tolong();
  }

  if (message == "undercover") {
    result = undercover();
  }

  const echo = { type: "text", text: result };
  return client.replyMessage(event.replyToken, echo);
}

// help
function tolong() {
  return 'Ketik "undercover" buat main Undercover yuk!';
}

// error handler
function error(message) {
  return 'Mff "' + message + '" tuh artinya apa yh?';
}

// game functions
function undercover() {}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
