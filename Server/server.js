const express = require('express')
const app = express()
app.use(express.urlencoded({ extended:false}))
app.use(express.json())
const mongoose = require('mongoose')
const { MongoClient } = require("mongodb");
// const { MongoClient } = require("mongodb");
// const {connectToDb, getDb} = require('./db')
// mongoose.connect(uri, {
//     useNewUrlParser: true,useUnifiedTopology: true,
// }, (err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log('successfully connected')
//     }
// })
// Replace the uri string with your MongoDB deployment's connection string.


// let db

//db connecteion

// connectToDb((err) => {
//   if(!err){
//     app.listen(3000, () => {console.log("Server started on port 3000")})
//     db = db.getDb()
//   }
// })



const client = new MongoClient(uri);


const connectToUserDB = async () => {
  try{
    await client.connect();

    const db = client.db("test");
    const coll = db.collection('Users')
    return coll;

  }catch(err){
    res.send("Failed")

  }

}


async function findName(emailVal) {
  try {
    // await client.connect();

    // const db = client.db("test");
    // const coll = db.collection('Users')
    let coll = await connectToUserDB()



    // const res = await coll.insertOne({
    //   name: "Jensen",
    //   Test: "Idk"
    // })
    // const newUser = coll.insertOne({
    //   name: "Jensen",
    //   email: "jensenmed2@gmail.com",
    //   isAdmin: false,
    // })
    let isFound = false
    let ArrVals = []
    let cursor = coll.find({email: emailVal})

    let val = await cursor.forEach(val => {
      ArrVals.push(val)
    });
    
    if(ArrVals.length > 0){
      isFound = true;
      return isFound
    }else{
      return isFound 
    }





    // const databaseList = client.db()
    // console.log(databaseList)
    // databaseList.databases.forEach(db => {
    //     console.log(`- ${db.name}`)
    // })
    // const db = client.db()
    // console.log(db.collection.find())
    // const collection = db.collection

    // const coll = db.collection("Users")
    // coll.insertOne({
    //     test:"Name",
    //     Yes: "Idk"
    // })
    // database and collection code goes here
    // const db = client.db("New_Users");
    // // db.collection.insertOne({name:"test"})
    // // console.log(db)
    // const coll = db.collection("Users");
    // coll.insertOne(
    //     test, {
    //     name:"Jensen"
    // })
    // console.log(coll.find())
    // coll.find()
    // console.log(coll.s.db)
    // coll.insertOne({
    //   user:"Test3",
    //   isAdmin: true,
    //   idk:true,
    //   name:"Jensen"
    // })
    // console.log(db.collection.find({
    // user:"Test",
    // isAdmin: true,
    // idk:true,
    // name:"Jensen"}))
    // db.bsonOption
    // console.log(coll)
    // find code goes here
    // console.log(coll.find({ 
    //     user:"Test",
    //     isAdmin: true,
    //     idk:true,
    //     name:"Jensen"}))
    // await db.collection.find({name:"Jensen"})
    // const cursor = coll.find({name:"Jensen"});


    // console.log(cursor)

    // db.coll.find({}).toArray(function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   db.close();
    // });
    // coll.findOne({name:"Jensen"})
    // iterate code goes here


    // let val = await cursor.forEach(console.log);
    // console.log(val)
    // console.log(cursor)
    // await cursor.forEach(console.log)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


const addUserToDB = async (dataVals) => {
  try{

    // Double checks to make sure user is not already in the database
    let newUserDbCursor = await connectToUserDB();
    let userAdded = false;
    let ArrVals = []
    let cursor = newUserDbCursor.find({email: dataVals.data.email})
    let vals = await cursor.forEach(val => {
      console.log(val)
      ArrVals.push(val)
    });

    
    if(ArrVals.length > 0){
      // User was found and was not added in the database
      userAdded = false;
      return userAdded
      
    }else{
      //User was not found and was added into database
      newUserDbCursor.insertOne(dataVals.data)
      userAdded = true
      return userAdded
    }
    

  }catch(err){
    console.log(err)
  }
}

/**
 * 
 * @param {*User passoword passed in to test} passwordVal 
 * @param {* Email value passed in by user} emailVal 
 * @returns 
 */
const checkUser = async (passwordVal, emailVal) => {
    let checkUserCursor = await connectToUserDB();
    let ArrVals = []
    let cursor = checkUserCursor.find({email: emailVal})

    let vals = await cursor.forEach(val => {
      // console.log(val)
      ArrVals.push(val)
    });
    // console.log(ArrVals)

    if(ArrVals.length > 1){
      // There was an error adding the user to the database
      userChecked = false;
      return false 
      
    }else{
      //Now check to make sure the passwords are the same
      return ArrVals[0]
      // if(ArrVals[0].password == passwordVal){
      //   //User entered correct password
      //   return true 
      // }else{
      //   //User found just wrong password
      //   return false 
      // }
    }

}
// findName().catch(console.dir);

// async function connect(){
//     try{
//         await mongoose.connect(uri)
//         mongoose.db
//         console.log("Connected to database")
        

//     }catch(err){
//         console.log(err)
//     }
// }
// connect()


/**
 * Checks if user is in database
 */
app.get("/api/:email", async (req, res) => {
  // console.log(req.params.email)
  // try{
    let isFound = await findName(req.params.email).catch(console.dir);
    // console.log(isFound)
    res.send(isFound)

  // }catch(err){
  //   console.log(err)
  // }
  // let isFound = await findName(req.params.email).catch(console.dir);
  // console.log(isFound)
  // res.send(isFound)

    // res.send(req.params.email)
    // db.collection('Users').insert({
    //   name:'Jensen',
    //   email:'jensenmed2@gmail.com'
    // })
    // db.collection('Users')
    // .find()
    // .sort()
    // res.send(req.params.email)
})

/**
 * Check if email and passoword are good
 */
app.post('/verifyUser', async (req, res) => {
  // Will check user and make sire the password is correct
  let userIsValid = await checkUser(req.body.data.password, req.body.data.email).catch(console.dir)
  res.send(userIsValid)

})


/**
 * Adds user to database
 */
app.post("/addUser", async(req, res) => {
  // const {Name, Email, Password} = req.params.u
  // console.log(req.body) // figire out how to send params with the thing above way
  let addUserInDB = await addUserToDB(req.body)
  // Will send if user was successfully added into database
  res.send(addUserInDB)
  // res.send(req.body)
  
})



//This shit just fixed everything
app.disable('etag');

app.listen(3000, () => {console.log("Server started on port 3000")})
