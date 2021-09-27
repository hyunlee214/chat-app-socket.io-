const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require('socket.io');
//스크롤 추가
const moment = require('moment');

// io변수를 통해 메세지 제어
const io = socketIO(server);


app.use(express.static(path.join(__dirname, 'src')))
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  // 서버로 보낸 내용 출력
  socket.on('chatting', (data) => { 
    // 서버에서 보낼 내용 
    const {name, msg} = data;
    io.emit('chatting', {
      name,
      msg,
      time: moment(new Date()).format("h:ss A")
    })
  })
})



server.listen(PORT,() => console.log(`server run ok - port number : ${PORT}`))