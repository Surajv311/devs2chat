const mongoose = require("mongoose");

// we will define our schema ...
// message,date,timestamp, receive status...

const dmeetSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

// collection  // on mongodb it's messagecontents...
module.exports = mongoose.model("messagecontents", dmeetSchema);
// DEVS2CHAT SCHEMA... UPDATE..
