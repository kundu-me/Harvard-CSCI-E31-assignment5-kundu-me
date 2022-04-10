//users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({});
const userController = require('../../controllers/userController');
const UserService = userController.UserService;

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

// read
router.get('/', (req, res, next)=>{
    UserService.list()
    .then((users) => {
      console.log(`API: List users: ${users}`);
      res.status(200);
      res.send(JSON.stringify(users));
    });
  console.log("placeholder")
});

router.post('/', upload.none(), async (req, res, next)=>{
    var userid = req.body.userid;
    var name = req.body.name;
    var address = req.body.address;
    
    console.log("CREATE :=> " + userid + " | " + name + " | " + address);
    
   const user  = {
       userid: userid,
       name: name,
       address: address
       }
    console.log(user);
  try{
     const userSave = await UserService.create(user);
     res.status(201);
     res.send(JSON.stringify(user));
   }catch(err){
     console.log(err);
     throw new Error("UserSaveError", user);
   }
 });

// read
router.get('/:userid', (req, res, next)=>{
  console.log(`finding ${req.params.userid}`);
    UserService.read(req.params.userid)
    .then((user) => {
     console.log(`Found users: ${user}`);
     res.status(200);
     res.send(JSON.stringify(user));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

//update
router.put('/:userid', (req, res, next)=>{
  console.log(`putting ${req.params.userid}`);
  let putdata = req.body;
  UserService.update(req.params.userid, putdata)
    .then((updatedUser)=>{
      res.status(200);
      res.send(JSON.stringify(updatedUser));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

// delete
router.delete('/:userid', (req, res, next)=>{
  let userid = req.params.userid;
  UserService.delete(req.params.userid)
    .then((user) => {
     console.log(`Deleted user: ${userid}`);
     res.status(200);
     res.send(JSON.stringify(user));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// error
router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;
