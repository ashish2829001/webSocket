socket = io();
 
const username = 'Ashish';
socket.emit('join',{ username },()=>{
    alert(username+' has joined!');    
});

socket.on('newLogin',(obj)=>{
    alert(obj.name+' has joined'+' at '+ obj.createdAt);
});


socket.on('updateCount',(count)=>{
    document.getElementById('user').innerHTML= "Number of users is/are "+count+"<br>";
});

socket.on('updateLeaderBoard',()=>{
    alert('update leader board! ');
})


document.querySelector('#send').addEventListener('click',()=>{
    socket.emit('gotCorrectAnswer');
})

