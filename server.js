const webPush = require('web-push');
const express = require("express");

if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY) {
  console.log(webPush.generateVAPIDKeys());
  return;
}
const PUBLIC_KEY = process.env.PUBLIC_KEY 
  const PRIVATE_KEY = process.env.PRIVATE_KEY

const app = express();
webPush.setVapidDetails(
  'https://imptestpush.herokuapp.com/',
  PUBLIC_KEY,
  PRIVATE_KEY
);

app.use(express.static(__dirname));
app.use(express.json());
  
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

var PORT = process.env.PORT ||  3010;


app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});

  app.get('/vapidPublicKey', function(req, res) {
    res.send(PUBLIC_KEY);
  });

  app.post('/register', function(req, res) {
    res.sendStatus(201);
  });

  app.post('/sendNotification', function(req, res) {
    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl
    };

    setTimeout(function() {
      webPush.sendNotification(subscription, payload, options)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }, req.body.delay * 1000);
  });