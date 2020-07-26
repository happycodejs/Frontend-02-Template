const http = require('http')

const app = http.createServer((request, response) => {
    let body = [];
    request.on('error',(err)=>{
        console.error(err)
    }).on('data',(chunk)=>{
        //console.log(chunk)
        //body.push(chunk.toString());
        body.push(chunk)
    }).on('end',()=>{
        body = Buffer.concat(body).toString();
        console.log("body:",body);
        response.writeHead(200,{ 'Content-Type': 'text/html' });
        response.end(' Hello,World \n this is toy-browser');
    })
})

app.listen(8088,()=>{
    console.log("server is running on ,http://localhost:8088/")
})