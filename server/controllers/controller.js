var Userdb = require('../model/model');

//Create and Save new user
exports.create = (req,res)=>{
    //Validate Request
    if(!req.body){
     res.status(400).send({message: "Content Can't Be Empty"});
     return;
    }
    //New User
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    });
    //Save To Database
    user
      .save(user)
      .then(data =>{
          res.send(data)
      })
      .catch(err=>{
          res.status(500).send({
              message: err.message || "Some Error Occured While Saving This User!"
          });
      });

}


//Retrieve and Return All Users  //Retrieve and Return Single User
exports.find = (req,res)=>{
    if(req.query.id){
     const id = req.query.id;
     Userdb.findById(id)
      .then(data =>{
          if(!data){
              res.status(404);
              res.send({message : "Not found user with id:" + id});
          }else{
              res.send(data);
          }
      })
      .catch(err=>{
        res.status(500).send({
            message: err.message || "Some Error Occured While Saving This User!"
        });
      })
    }else{

        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500);
            res.send(err.message) || "Error in loading user information!";
        })
    }
    
}
        

//Update a new identified user by user id
exports.update = (req,res)=>{
   if(!req.body){
       return res.status(400).send({message : "Data to be update cannot be empty!"})
   }
   const id = req.params.id;
   Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).sebd({message: `Cannot update user with ${id}. User Not Found.`})
        }else{
          res.send(data)  
        }
    })
    .catch(err =>{
        res.send(500);
        res.send(err.message) || "Error in updating user information."
    })

}

//Delete a user with specified user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;
   
     Userdb.findByIdAndDelete(id)
      .then(data =>{
          if(!data){
              res.status(404);
              res.send({mesage: `Cannot Delete User with id:${id} Wrong ID!`});
          }else{
              res.status(200);
              res.send({message : "User was deleted successfully "})
          }
      })
      .catch(err =>{
        res.status(500);
        res.send({message:"Could not delete user with id:" + id})
      });

}
