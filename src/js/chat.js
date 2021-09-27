'use strict';

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');

// 이벤트 생성
sendButton.addEventListener('click', () => {
  const param = {
    name : nickname.value,
    msg : chatInput.value
  }

  socket.emit('chatting', param);
})


// socket 객체를 이용하여 메세지 송신
// 'chatting'이라는 채널 ID를 적어서 송신 / 내용 : 문자열
socket.emit('chatting', 'from client');

// 서버에서 보낸 메세지 받는 기능 + 출력
socket.on('chatting', (data) => {
  console.log(data);
})

console.log(socket);