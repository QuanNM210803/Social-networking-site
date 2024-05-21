const mongoose =require('mongoose')

async function connectDB(){
   try{
      await mongoose.connect(process.env.MONGODB_URI)

      const connection= mongoose.connection
      connection.on('connected',()=>{
         console.log('Connect to MongoDB')
      })

      connection.on('error',()=>{
         console.log('Something is wrong in mongodb ',error)
      })
   }catch(error){
      console.log('Error in connecting to mongodb ',error)
      console.log("Something ")
   }
}

module.exports=connectDB