import fs from "fs";


export const logger = async(req,res,next)=>{
   try{
    await fs.appendFile('mynewfile1.txt', req.method + "--" +req.url +"\n", (err) => {
        if (err) throw err;
        // console.log('Saved!');
    });
    
     next();
   }catch(err){
    return ;
   }
}
export default logger;