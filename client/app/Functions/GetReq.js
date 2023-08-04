

import ky from "ky"

export default async function GetReq(link){
    
    const response = await ky.get(link)
   
    const data = await response.json()
   
    return data
}




