// userController.js
const User = require('../models/userModel');

class UserService {

  static create(obj){
    const user = new User(obj);
    return user.save();
  }

  static update(id, data){
      return User.findOne({'userid': id})
       .then((user)=>{
         user.set(data);
         user.save();
         return user;
       });
  }

  static read(id){
      return User.findOne({'userid': id})
      .then((user)=>{
        // found
        return user;
      });
  }

  static list(){
    return User.find({})
      .then((users)=>{
        // found
        return users;
      });
  }

  static delete(id){
    return User.deleteOne({'userid': id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
}

module.exports.UserService = UserService;
