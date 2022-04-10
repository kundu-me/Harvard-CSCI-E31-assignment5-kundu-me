const baseURL = 'http://159.223.155.237:8089';

function testAPIs(){
 // test list first
 var testId = 'test-user-' + new Date().getTime();

 // list
 callAPI('GET', '/api/users', null, null)
   .then((list)=>{
     console.log('\n\n***************************\nlist Users:');
     console.log(list);
     testId = list[0].userid;

     // create
     var data = new FormData();
     data.append('userid', testId);
     data.append('name', 'test');
     data.append('address','Framingham, MA');
     callAPI('POST', '/api/users', null, data)
       .then((user)=>{
         var userid = user.userid;
         var savedUser = user;  // keep a handle to the created user object
         console.log('\n\n***************************\ncreate User:');
         console.log(user);

         // find
         callAPI('GET','/api/users/'+testId, null, null)
           .then((user)=>{
             console.log('\n\n***************************\nfind User:');
             console.log(user);

             // update
             savedUser.address += ' 01702 (appended) ';
             callAPI('PUT','/api/users/'+testId, null, savedUser)
               .then((user)=>{
                 console.log('\n\n***************************\nupdate User:');
                 console.log(user);

                 //delete
                 callAPI('DELETE', '/api/users/'+userid, null, null)
                  .then((result)=>{
                    console.log('\n\n***************************\ndelete User:');
                    console.log(result);
                  })
             });
         });
     });
 })
 .catch((err)=>{
   console.error(err);
 });
}

function api_list(){
 // list
 callAPI('GET', '/api/users', null, null)
   .then((list)=>{
     console.log('\n\n***************************\nlist Users:');
     console.log(list);
 })
 .catch((err)=>{
   console.error(err);
 });
}

function api_find(){
 // read
 var userid = document.querySelector("#api-find-userid").value;
    callAPI('GET','/api/users/'+userid, null, null)
      .then((user)=>{
        console.log('\n\n***************************\nfind User:');
        console.log(user);
 })
 .catch((err)=>{
   console.error(err);
 });
}

function api_create(){
    // create
    var data = new FormData();
    data.append('userid', document.querySelector("#api-create-userid").value);
    data.append('name', document.querySelector("#api-create-name").value);
    data.append('address',document.querySelector("#api-create-address").value);
    callAPI('POST', '/api/users', null, data)
      .then((user)=>{
        var userid = user.userid;
        savedUser = user;  // keep a handle to the created user object
        console.log('\n\n***************************\ncreate User:');
        console.log(user);
    })
    .catch((err)=>{
      console.error(err);
    });
}

function api_update(){
    // update
    var userid = document.querySelector("#api-update-userid").value;
    var name = document.querySelector("#api-update-name").value;
    var address = document.querySelector("#api-update-address").value;
    
    callAPI('GET','/api/users/'+userid, null, null)
      .then((user)=>{
        console.log('\n\n***************************\nfind User:');
        console.log(user);
          
          if (name) {
              user.name = name;
          }
          
          if (address) {
              user.address = address;
          }

        callAPI('PUT','/api/users/'+userid, null, user)
          .then((user)=>{
            console.log('\n\n***************************\nupdate User:');
            console.log(user);
        });
    })
    .catch((err)=>{
      console.error(err);
    });
}

function api_delete(){
    // delete
    var userid = document.querySelector("#api-delete-userid").value;
    callAPI('DELETE', '/api/users/'+userid, null, null)
     .then((result)=>{
       console.log('\n\n***************************\ndelete User:');
       console.log(result);
     })
    .catch((err)=>{
      console.error(err);
    });
}


async function callAPI(method, uri, params, body){
 var jsonMimeType = {
   'Content-type':'application/json'
 }
 try{
   var response = await fetch(baseURL + uri, {
     method: method, // GET, POST, PUT, DELETE, etc.
     ...(method=='POST' ? {body: body} : {}),
     ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
   });
   return response.json(); // parses response to JSON
 }catch(err){
   console.error(err);
   return "{'status':'error'}";
 }
}
