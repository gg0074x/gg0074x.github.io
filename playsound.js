var sounds = [
     {s: new Audio('s1.mp3')},
     {s: new Audio('s2.mp3')},
     {s: new Audio('s3.mp3')},
     {s: new Audio('s4.mp3')},
     {s: new Audio('s5.mp3')},
     {s: new Audio('s6.mp3')},
     {s: new Audio('s7.mp3')}
];

function sound(){
     sounds[Math.floor(Math.random()*(7-0+1))+0].s.play()
}
