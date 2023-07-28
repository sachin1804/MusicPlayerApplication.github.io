const User = require("../models/user");


module.exports.signUp = function (req, res) {
    // console.log(locals);
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }

    return res.render("_sign_up", {
        title: "Sign Up"
    })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }

    return res.render("_sign_in", {
        title: "Sign In"
    })
}

module.exports.create = function (req, res) {
    // console.log(req.query);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                User.create(req.body)
                    .then((user) => res.redirect("/users/sign-in"))
                    .catch((err) => {
                        console.log('There was an error while creating the user', err);
                    })
            }
            else {
                // alert("User exists with the same email");
                return res.redirect("back");
            }
        })
        .catch((err) => {
            console.log('There was an error while finding the user', err);
        })


}


module.exports.createSession = function (req, res) {
    //find the user with the email in the database
    // console.log(req);
    // User.findOne({ email: req.body.email })
    //     .then((user) => {
    //         if (user) {
    //             if (user.password != req.body.password) {
    //                 return res.redirect('back');
    //             }

    //             res.cookie("user_id", user.id);
    //             return res.redirect("/");
    //         }
    //         else {
    //             return res.redirect("back");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("There was an while signing in", err);
    //     })

    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {

    // return res.clearCookie("user_id");
    // console.log("signed out sucessfully");
    // return res.json({
    //     message: 'success'
    // })

    req.logout(function (err) {
        console.log("There was an err while signing out the user", err);
    });

    return res.redirect("back");
}