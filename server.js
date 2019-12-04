const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passportSetup = require('./routes/passport');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth = require('./routes/auth');
const keys = require('./config/index')



require('dotenv').config();

// connect to database
const url = process.env.URL
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB connection established')
    })


// middleware
app.use(express.json({ extended: true }));
app.use(cors());

// cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/guests', require('./routes/guests'))

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`server started on port ${PORT}`))