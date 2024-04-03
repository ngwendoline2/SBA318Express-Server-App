import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "bodyparser";
import {urls} from './helpers.js'
import { isAsyncFunction } from "util/types";
//---------------Create Express Server----------------//
// console.log('script is running');
const app = express();
// using all caps for PORT because it is a constant
const PORT = process.env.PORT || 4000;
app.use(express.static("./styles"));

vares-module-specifier-resolutionnode
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const fs = require('fs');


async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

async function cookieValidator(cookies) {
  console.log(cookies);
  // we don't have any cookies, so we will just return true
  return true;
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("ejs", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
      if (err) return callback(err);

      // Here, we take the content of the template file,
      // convert it to a string, and replace sections of
      // it with the values being passed to the engine.

      const rendered = content
          .toString()
          .replaceAll('#title#', `${options.title}`)
          .replace('#content#', `${options.content}`)
          .replace("#href#", `${options.href}`)
          .replace('#text#', `${options.text}`);
          return callback(null, rendered);
  })
})
// Set EJS as templating engine 
app.set('view engine', 'ejs');

// Routes
app.get("/", (req, res) => {
  res.render('Hello there');
});

app.set("views", "./views");    // specify the views directory
app.set("view engine", "ejs");   // register the template engine

async function cookieValidator(cookies) {
  console.log(cookies);
  // we don't have any cookies, so we will just return true
  return true;
}

app.use(cookieParser());
app.use(validateCookies);

// const (logReq)= function (req, res, next) {
//   console.log('Request Received');
//   next();
// }

app.use(logReq);
// get, post, put (or patch), delete

app.get("/", (req, res) => {
  // res.send("Try navigating to /user.");
  const options = {
      title: "Rendering Views with Express",
      content: ""
    }
    res.render("index", options);
  });
  app.get("/example", (req, res) => {
      const options = {
          title: "Transport Agency",
          content: "<h2> Welcome to a zone of confort with us </h2> \
          <form> \
          <input type='text'> \
          <input type='submit'> \
          </form>",
      }
      res.render("index", options)
  })
  
  app.get("/newPage", (req, res) => {
      // res.send("Try navigating to /user.");
      const options = {
          title: "New Page",
          content: "Demonstrating a different file within the view engine",
          text: "Go to google",
          href: "https://www.google.com"
      };
  
      res.render("newPage", options);
  })

  app.get("/express", (req, res) => {
    res.send("creating routes with express...");
})

app.get("/express2", (req, res) => {
    res.redirect('/express');
})

app.get("/search", (req, res) => {
    res.redirect('https://www.google.com');
})

// routes need to be unique but that comes with both the http method and the path
app.get("/user", (req, res) => {
    res.send(`Received a GET request for user! Try navigating to /user/somevalue/profile/somevalue`);
})


app.get("/user/list", (req, res) => {
    res.send('THIS SHOW LIST a page that lists all users')
})

app.get("/user/:userID", (req, res) => {
    res.send(`Navigated to the user page for: ${req.params.userID}`)
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Here's my project structure overview

// transportation-agency/
// │
// ├── node_modules/              # Node.js modules
// ├── static/                    # Static files (CSS, JS, images)
// │   └── css/
// │       └── style.css
// ├── src/
// │   ├── controllers/           # Route controllers (controller layer)
// │   │   ├── user.js
// │   │   └── vehicles.js
// │   ├── middleware/            # Custom middleware
// │   │   ├── errorHandler.js
// │   │   └── logger.js
// │   ├── models/                # Data models (schema definitions)
// │   │   ├── user.js
// │   │   └── vehicle.js
// │   ├── routes/                # Route definitions
// │   │   ├── user.js
// │   │   └── vehicle.js
// │   ├── views/                 # Templates / views
// │   │   ├── index.ejs
// │   │   ├── user.ejs
// │   │   └── vehicle.ejs
// │   └── app.js                 # App entry point
// ├── .env                       # Environment variables
// ├── package.json
// └── package-lock.json