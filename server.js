const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require('morgan');
const path = require("path");
const cors = require('cors');

const users = require("./routes/api/users");
const artists = require("./routes/api/artists");
const admins = require("./routes/api/admins");
const clients = require("./routes/api/clients");
const prestations = require("./routes/api/prestations");
const videos = require("./routes/api/videos");
const emails = require("./routes/api/emails");
const photos = require("./routes/api/photos");

const app = express();
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, "client/build")));
app.use('/uploads', express.static('uploads'));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Datebase successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(cors());

// midllewares
app.use(morgan('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Routes
app.use("/api/users", users);
app.use("/api/artists", artists);
app.use("/api/admins", admins);
app.use("/api/clients", clients);
app.use("/api/prestations", prestations);
app.use("/api/videos", videos);
app.use("/api/verify", emails)
app.use("/api/photos", photos);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
