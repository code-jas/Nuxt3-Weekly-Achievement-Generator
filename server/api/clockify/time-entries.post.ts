import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
   const {apikey, workspaceId,userId, dateRange} : any = await  readBody(event) 
   console.log('apikey :>> ',apikey);
   console.log('workspaceId :>> ', workspaceId);
   console.log('userId :>> ', userId);
   
   const headers = {'x-api-key': apikey};
   let response = await $fetch(`https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/${userId}/time-entries`, {
      headers,
   })
   console.log('response :>> ', response);
   return response

})