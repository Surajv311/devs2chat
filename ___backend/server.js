//jshint esversion:6
// after creating cluster on mongodb for backend...

// importing -> app config -> middleware -> DB config ->... -> api routes -> .... & also listener....

//importing
// on adding
// "type": "module", (in package.json file we can import modules rather than require)
// import express from 'express';
// Note: throwing error in my current node version 12.16.2
// hence using require ...

const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessages.js");
const Pusher = require("pusher");
const cors = require("cors");

// app config
//  *** NOTE THE PORTS & SEE BEFORE CHANGE.... ***
const app = express();
const port = process.env.PORT || 4000;

// we use pusher.com or socket.io to make mongodb realtime...
// so that when a change is made it reflects at the same time ...

// adding pusher
const pusher = new Pusher({
  // EXAMPLE...
  // ********ADD THE ID'S IN A .ENV FILE...**********
  appId: "1130202634625410131113224153",
  key: "b83118f045432215611232a24352cfdg236a",
  secret: "b654edertetyt7yaeurb5tu5ytuetyu3u85865a5472u2y1221ty10a",
  cluster: "jdskjsfdskapsdgsg2euoerwouwioruwr",
  useTLS: true,
});

// middleware
app.use(express.json());

// / adding header...
// app.use((req,res , next) => {

// / allowing request to come from any endpoint
// res.setHeader("Access-Control-Allow-Origin","*");
// res.setHeader("Access-Control-Allow-Headers","*");
// next() ;
// })
// [**OR USE THE CORS PACKAGE**]

app.use(cors());

// DB config
// mongodb+srv://admin:<password>@cluster0.qa9j4.mongodb.net/<dbname>?retryWrites=true&w=majority

// ***from stackoverflow error... we must choose version of Nodejs > 2.2.... FOR CONNECTING APPLICATION***
const connection_url =
  "mongodb://admin:[ENTER THE PASSWORD...GENERATED...]@cluster0-shard-00-00.qa9j4.mongodb.net:27017,cluster0-shard-00-01.qa9j4.mongodb.net:27017,cluster0-shard-00-02.qa9j4.mongodb.net:27017/[ENTER NAME OF DATABASE...RANDOM NAME...]?ssl=true&replicaSet=atlas-q3quvh-shard-0&authSource=admin&retryWrites=true&w=majority";

// *** USE .ENV FILE... ***
// do not use this: (as it's for node version>4... & currently using this would give `SRV ERROR`...)
//'mongodb+srv://admin:ysfdfg5579V06bjkhyt879VvT5F6548eX9w55Wqqyuidvrr863l@cluster0.qa9j4.mongodb.net/dmeet_db?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
  // to connect smoothly to my mongodb

  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// once the connection is open -> we fire off the function
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  // we fire off a function once there is a change in DB

  changeStream.on("change", (change) => {
    console.log("change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// ...

// Api routes

// https code 200 -> OK
app.get("/", (req, res) => res.status(200).send("working"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      // if error then we send internal server error
      res.status(500).send(err);
    } else {
      // send data that we just added in the DB
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      // if error then we send internal server error
      res.status(500).send(err);
    } else {
      // send data that we just added in the DB
      res.status(201).send({ data });
    }
  });
});

// listener
app.listen(port, () => console.log(`server running on port: ${port}`));
