const getConversation = require("../helpers/getConversation")

async function conversationById(request, response){
   try{
      const userId=request.params.userId
      const conversation=await getConversation(userId)
      return response.status(200).json({
         data: conversation,
         message:'Get conversations successfully.'
      })
   }catch(error){
      return response.status(500).json({
         message: error.message || error,
         error:true
      })
   }  
}

module.exports=conversationById