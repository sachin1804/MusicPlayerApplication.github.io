const User = require("../models/user");

module.exports.home = function (req, res) {

    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id)
    //         .then((user) => {
    //             if (user) {
    //                 return res.render('home', {
    //                     title: 'home page',
    //                     user: user
    //                 })
    //             }
    //             return res.redirect("/users/sign-in");
    //         })
    // }
    // else {
    // }
    return res.render("home", {
        title: "home page"
    });

}