const express = require("express");
const app = express();
const users = require("./Route/user.js");
const posts = require("./Route/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const path = require("path");


app.use(cookieParser("secretcode"));
app.use("/users", users);
app.use("/posts", posts);
app.use(flash());
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOption));
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("errorMsg");
    next();
});

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("errorMsg", "user not registered")
    }else{
        req.flash("success", "user registered succesfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", {name: req.session.name});
});


// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count = 1;
//     }
//     res.send(`this is a ${req.session.count} count`);
// });

// app.get("/cookies", (req, res) => {
//     res.cookie("greet", "namaste");
//     console.dir(req.cookies);
//     res.send("we have send a cookie");
// });

app.get("/getcookies", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`hi, ${name}`);
});

app.get("/getSignedCookie", (req, res) => {
    res.cookie("color", "red", { signed: true });
    res.send("this is a signed cookie");
});

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified");
})

app.get("/", (req, res) => {
    res.send("hi, I am root");
});

app.listen("3000", () => {
    console.log("server is listening to port 3000 ");
});