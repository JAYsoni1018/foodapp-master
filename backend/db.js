const mongoose = require('mongoose');
const mongoURI='mongodb+srv://jaysoni94271:Mongo1018@cluster0.c97c65o.mongodb.net/gofoodApp?retryWrites=true&w=majority';

const mongoDB=async()=>{
    
   await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
    if (err) console.log(err);
    else {

      console.log("connected.....");
      const fetch_data=await mongoose.connection.db.collection("food_items");
      fetch_data.find({}).toArray(async function(err,data){
        const foodCategory=await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(async function(err,catdata){
          if(err) console.log(err);
          else{
            global.food_items=data;
            global.foodCategory=catdata;
  
          }
        })
        
      })
    }
    });
}
module.exports= mongoDB;

