
import express, { application }  from 'express'
import getInfo from './insertlogs.js';
import clickhouse  from "./connection.js"
import fetchlogs from './fetchlogs.js';

const app = express();


const PORT = 4000;

app.get('/login',getInfo ,(req, res) => {

  res.send('Hello, World! This is your Express server.');
});

app.post('/getdata',getInfo,(req,res)=>{
     console.log(req.body)
     res.send("data received")
})






app.get('/gettotal',async (req,res)=>{
  console.log('get request')
  const result = await clickhouse.query({
    query:"SELECT COUNT(id) FROM requests",
    format:"JSON"
}).then(res=>res.json())

   res.status(200).send(result.data[0]['COUNT(id)'])
})

app.get('/gettotalErr',async (req,res)=>{
  console.log('get request')
  const result = await clickhouse.query({
    query:"SELECT COUNT(id) FROM requests WHERE status_code=404 OR status_code=500",
    format:"JSON"
}).then(res=>res.json())

   res.status(200).send(result.data[0]['COUNT(id)'])
})


app.get("/getAvgResTime",async (req,res,next)=>{
    console.log("calculating avg")
    const result = await clickhouse.query({
         query:"SELECT AVG(response_time_ms) FROM requests WHERE status_code=200 OR status_code=304",
         format:"JSON"
    })
    .then(res=>res.json())


    res.json(result.data[0]['AVG(response_time_ms)'])
})

app.get('/getlogs',(req,res)=>{
      fetchlogs().then((result)=>{
          res.json(result.data)
      })
})





app.get("*",getInfo,(req,res)=>{
  res.status(404).send("404 page not found")
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
