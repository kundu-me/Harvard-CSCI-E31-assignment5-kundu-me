// users.js
const express = require('express');
const router = express.Router();

var path = require('path');

const User = require('../models/userModel');

var app = express();

router.get('/', (req, res, next)=>{
    // res.render("users", {"users": req.app.locals.data.users})
    User.find({}).then((users)=>{
        res.render('users', {
            users : users
        });
      })
      .catch((err)=>{
        if (err) {
          res.end("ERROR!");
        }
      });
});

router.post('/user/create', (req, res, next)=>{
    var userid = req.body.userid;
    var name = req.body.name;
    var address = req.body.address;
    
    console.log("CREATE :=> " + userid + " | " + name + " | " + address);
    
    const userData  = {
        userid: userid,
        name: name,
        address: address
      };
    
      var user = new User(userData);
        user.save()
       .then(()=>{
         res.redirect('/users');
       })
       .catch((err)=>{
         if (err){
          console.log(err);
        }
       });
});

router.post('/user/read', (req, res, next)=>{
    var userid = req.body.userid;
    
    console.log("READ :=> " + userid);
    
    User.findOne({'userid': userid})
        .then((user)=>{
            console.log(user);
            res.render('user', {
                users : user ? [user] : undefined
            });
        })
        .catch((err)=>{
          if (err) console.log(err);
      });
});

router.post('/user/update', (req, res, next)=>{
    var userid = req.body.userid;
    var name = req.body.name;
    var address = req.body.address;
    
    console.log("UPDATE :=> " + userid + " | " + name + " | " + address);
    
    User.findOne({'userid': userid})
        .then((user)=>{
            const userData  = {
                userid: userid,
                name: name,
                address: address
              };
            user.set(userData);
            user.save().then(()=>{
            res.redirect('/users');
          });
        })
        .catch((err)=>{
          if (err) console.log(err);
      });
});

router.post('/user/delete', (req, res, next)=>{
    var userid = req.body.userid;
    
    console.log("DELETE :=> " + userid);
    User.findOne({'userid': userid})
        .then((user)=>{
            user.delete().then(()=>{
            res.redirect('/users');
          });
        })
        .catch((err)=>{
          if (err) console.log(err);
      });
});

router.get('/user/:userid', (req, res, next)=>{
    var userid = req.param('userid');
    User.findOne({'userid': userid})
        .then((user)=>{
            console.log(user);
            res.render('user', {
                users : user ? [user] : undefined
            });
        })
        .catch((err)=>{
          if (err) console.log(err);
      });
});

module.exports = router;
