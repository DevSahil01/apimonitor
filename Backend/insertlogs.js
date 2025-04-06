import clickhouse from './connection.js';



async function insertlogs(method,url,statusCode,duration,req,res,next){
     try{
        await clickhouse.insert({
            table:'requests',
            values:[
                {
                     id:2,
                     url:url,
                     status_code:statusCode,
                     response_time_ms:duration,
                     reqMethod:method,
                     timestamp:new Date().toISOString().replace('T',' ').slice(0,19)
                }
            ],
            format:"JSONEachRow"
         })

         console.log("log inserted")
     }
     catch(err){
          console.error("Error querying clickhouse ", err)
     }
}



async function   getInfo(req,res,next){
    const start = Date.now();
    console.log(req.method)
    console.log(res.statusCode)
    console.log(req.url)
   
     res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} took ${duration}ms`);
        insertlogs(req.method,req.originalUrl,res.statusCode,duration,req,res,next);
      })
    

    
    next()
}

export default getInfo;