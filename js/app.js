// watch
setInterval(() => {
  document.getElementById('watch').innerHTML = new Date().toLocaleTimeString();
}, 1000);

// gloobal variables
let s,
    m,
    T,
    checkInputWithTimer,
    count,
    work = document.getElementById('work'),
    rest = document.getElementById('rest'),
    go = document.getElementById('go'),
    player = document.getElementById('player'),
    q = document.querySelector('main q');
// buttons
const stopW = document.getElementById('stopW');
const stopR = document.getElementById('stopR');
const playT = document.getElementById('playT');
const stopT = document.getElementById('stopT');
const off = document.getElementById('off');
// animation
const workLabel = document.querySelector('.worklabel'),
      restLabel = document.querySelector('.restlabel'),
      warning = document.querySelector('.warning'),
      enter = document.querySelector('.enter'),
      pr = document.querySelector('main p.pr'),
      pw = document.querySelector('main p.pw'),
      goSpan = document.querySelector('.go'),
      workSpan = document.querySelector('.work');

//choos your system
// hour system
document.getElementById('hour').onclick = _=>{
  document.getElementById('work').value = 45;
  document.getElementById('rest').value = 15;  
}
// half system
document.getElementById('half').onclick = _=>{
  document.getElementById('work').value = 25;
  document.getElementById('rest').value = 5;  
}

// check value of work & rest
function checkT(){
  if(!stopW.classList.contains('display')){
    T = work.value;
    pr.classList.add('display')
    pw.classList.remove('display')
    goSpan.innerHTML=('WORK')
    workSpan.innerHTML=('HARD!')
  }else{
    T = rest.value;
    pr.classList.remove('display')
    pw.classList.add('display')
    goSpan.innerHTML=('ENJOY')
    workSpan.innerHTML=('REST!')
  }
}

// function go to play timer
function GO(i){
  // check button of play timer when play timer with another way
  if(!playT.classList.contains('display')){
    playT.classList.add('display')
  }
  // clear function wich check inputs and check animation
  clearInterval(checkInputWithTimer)
  workLabel.classList.remove('flashing');
  restLabel.classList.remove('flashing');
  warning.classList.add('display');
  warning.classList.remove('flashing');
  enter.classList.add('display')
  // close alarm
  player.load();
  player.pause();
  // show and display buttons of system
  stopW.classList.toggle('display')
  go.classList.add('display')
  stopT.classList.remove('display')
  const reset = document.getElementById('reset');
  reset.classList.remove('display')
  q.classList.add('display')
  // set the variables of timer
  s = 1;
  m = 0;
  // add src to audio
  player.src = 'audio/st.mp3';
  // timer
  count = setInterval(()=>{
    x = i;
    let os = 0,
        om = 0;
    if(s >= 10){
      os = '';
    }
    if(m >= 10){
      om = '';
    }

    document.getElementById('time').innerHTML = `${om}${m}:${os}${s}`;
    s += 1;
    
    if(s == 60){
      s = 0;
      m += 1;
    }
    // check timer and button of closing alarm to open alarm 
    if(m == x && !off.classList.contains('display') ){
      player.play();
    }
  },1000)
  // show button wich close alarm
  checkT();
  setTimeout(_=>{
    pr.classList.add('display')
    pw.classList.add('display')
    off.classList.remove('display')
  },Number((T * '60000') - 2000))
};

// go to rest
stopW.onclick=ev=>{
  if((isNaN(rest.value) || rest.value == '') || (isNaN(work.value) || work.value == '')){
    ev.preventDefault();
    ev.stopPropagation();
    const checkInputWithTimer = setInterval(chekInputInterval,500)
  }else{
    clearInterval(count);
    s = 0;
    m = 0;
    GO(rest.value);
    stopR.classList.toggle('display')
  }
};

// go to work
stopR.onclick=ev=>{
  if((isNaN(rest.value) || rest.value == '') || (isNaN(work.value) || work.value == '')){
    ev.preventDefault();
    ev.stopPropagation();
    const checkInputWithTimer = setInterval(chekInputInterval,500)
  }else{
    clearInterval(count);
    s = 0;
    m = 0;
    GO(work.value);
    stopR.classList.toggle('display')
  }
};

// stop timer
stopT.onclick=_=>{
  clearInterval(count);
  stopT.classList.toggle('display')
  playT.classList.toggle('display')
};

// play timer
playT.onclick=()=>{
  playT.classList.add('display')
  stopT.classList.remove('display')
  pause = document.getElementById('time').innerHTML;
  s = Number(pause[3] + pause[4]) + 1;
  m = Number(pause[0] + pause[1]);
  player.src = 'audio/st.mp3'
  if(!stopW.classList.contains('display')){
    x = work.value;
  }else{
    x = rest.value;
  }
  count = setInterval(()=>{
    let os = 0,
    om = 0;
    if(s >= 10){
      os = '';
    }
    if(m >= 10){
      om = '';
    }

    document.getElementById('time').innerHTML = `${om}${m}:${os}${s}`;
    s += 1;
    
    if(s == 60){
      s = 0;
      m += 1;
    }
    if(m == x && !off.classList.contains('display') ){
      player.play();
    }
  },1000)
  checkT();
  setTimeout(_=>{
    pr.classList.add('display')
    pw.classList.add('display')
    off.classList.remove('display')
  },Number((T * '60000') - 2000))
};

// reset the timer
reset.onclick = ()=>{
  if(playT.classList.contains('display')){
    playT.classList.remove('display')
    stopT.classList.add('display')
  }
  document.getElementById('time').innerHTML =`00:00`;
  clearInterval(count);
}

// close alarm
off.onclick =_=>{
  off.classList.add('display')
  player.src = ''
}

// check the value of inputs
go.onclick = ev=>{
  const checkInput = setInterval(chekInputInterval,500)
  if(rest.value == '' || work.value == '' ){
    ev.preventDefault();
    ev.stopPropagation();
    warning.classList.remove('display')
    warning.classList.add('flashing')
    workLabel.classList.add('flashing')
    restLabel.classList.add('flashing')
    q.classList.add('display')
  }else if( (isNaN(rest.value) && rest.value !== '') || (isNaN(work.value) && work.value !== '') ){
    this.onclick = function(ev){
      ev.preventDefault();
      ev.stopPropagation();
    }
    enter.classList.remove('display')
    enter.classList.add('flashing')
  }else{
    clearInterval(checkInput)
    GO(work.value);
  }
}


const chekInputInterval = _=>{
if(work.value != ''){
    workLabel.classList.remove('flashing');
  }else{
    workLabel.classList.add('flashing')
  }
  if(rest.value != ''){
    restLabel.classList.remove('flashing');
  }else{
    restLabel.classList.add('flashing')
  }
  if(rest.value != '' && work.value != '' ){
    warning.classList.add('display')
    warning.classList.remove('flashing')
    if(!reset.classList.contains('display')){q.classList.add('display')}
  }else{
    warning.classList.remove('display')
    warning.classList.add('flashing')
  }
  if( (isNaN(rest.value) && rest.value !== '') || (isNaN(work.value) && work.value !== '') ){
    enter.classList.remove('display')
    enter.classList.add('flashing')
    if(!pr.classList.contains('display')){
      pr.classList.add('display')
    }else if(!pw.classList.contains('display')){
      pw.classList.add('display')
    }
  }else{
    enter.classList.add('display')    
  }
}
