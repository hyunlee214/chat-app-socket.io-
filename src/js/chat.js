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

// 서버에서 보낸 메세지 받는 기능 + 출력
socket.on('chatting', (data) => {
  const li = document.createElement('li');
  li.innerText = `${data.name}님의 메세지 : ${data.msg}`;
  chatList.appendChild(li);
})

console.log(socket);