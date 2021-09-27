'use strict';

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');
const displayScroll = document.querySelector('.display-Container');

// 이벤트 생성
sendButton.addEventListener('click', () => {
  const param = {
    name : nickname.value,
    msg : chatInput.value
  }
  socket.emit('chatting', param)  
})

// 서버에서 보낸 메세지 받는 기능 + 출력
// 서버에서 데이터를 받을 때마다 li데이터 호출
socket.on('chatting', (data) => {
  console.log(data);
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  // 데이터 넘겨받으면, makeLi()메서드 호출
  item.makeLi() 
  displayScroll.scrollTo(0, displayScroll.scrollHeight)
}) 

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    
    // 설정한 nickname값이 서버에서 받은 이름과 같으면 'sent' 아니면, 'received'
    li.classList.add(nickname.value === this.name ? "sent" : "received")
    
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img class="image" src="https://placeimg.com/50/50/any" alt="any">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
 
  // dom을 innerHTML로 추가
  li.innerHTML = dom;
  // li를 chatList에 추가
  chatList.appendChild(li);
  }
}

console.log(socket);