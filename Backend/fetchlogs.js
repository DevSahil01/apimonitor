import clickhouse  from "./connection.js"

async function fetchlogs(){
    try{

        const result = await clickhouse.query({
             query:"SELECT * FROM requests",
             format:"JSON"
        }).then(res=>res.json())
        return await result;
        

    }
    catch(err){
        console.error("Error querying clickhouse ", err)
    }
}

export default fetchlogs;