import express from 'express'

import { User } from '../models/user';
import { wrapAsync } from '../utils/wrapAsync';

export default router = express.Router();

router.get('/signup', (req,res) => {

 res.send("React form");
});

router.post('/signup', wrapAsync(async(req, res) =>  {
 let {username, email} = req.body;

 const newUser = new User(username, email);

 const registeredUser = await User.register(newUser, password);

 req.flash("success", "user was registered");

 res.send("user created");

}));

router.get("/login", (req,res) => {
 res.send("react login form")
})

router.post("/login", passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), async (req, res) => {

 req.flash("success", "welcome back to wanderlust")
 res.send("you are not logged in")

});

router.get("/logout", (req, res) => {

 req.logout((err) => {
  if(err) {
   return next(err);
  }

  req.flash("success", "you are logged out!");
  res.redirect("/listings");
 })



})