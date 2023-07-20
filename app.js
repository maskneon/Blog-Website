const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeStartingContent = "This is home page of my Blog Website.";
const aboutStartingContent = "This is about page of my Blog Website.";
const contactStartingContent = "This is contact page of my Blog Website.";

let posts = [];
app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { startingContent: aboutStartingContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { startingContent: contactStartingContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
