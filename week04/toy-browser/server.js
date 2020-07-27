const http = require('http')

const server = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(
`
<html maaa=a >
<head>
    <style>
body div #myid {
    width: 100px;
    background-color: #ff5000;
}
body div img {
    width: 30px;
    background-color: #f11;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>
`        
    )
})

//server.listen(8088)

server.listen(8088,()=>{
    console.log("server is running on ,http://localhost:8088/")
})





// const app = http.createServer((request, response) => {
//     let body = [];
//     request.on('error',(err)=>{
//         console.error(err)
//     }).on('data',(chunk)=>{
//         //console.log(chunk)
//         //body.push(chunk.toString());
//         body.push(chunk)
//     }).on('end',()=>{
//         body = Buffer.concat(body).toString();
//         console.log("body:",body);
//         response.writeHead(200,{ 'Content-Type': 'text/html' });
//         response.end(' Hello,World \n this is toy-browser');
//     })
// })

// app.listen(8088,()=>{
//     console.log("server is running on ,http://localhost:8088/")
// })