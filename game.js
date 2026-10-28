// ===== CRICKET CLASH — World Cricket Game =====
// 15 top ICC ODI teams, current squads (recent selections).
// Player faces are stylized canvas avatars, not real photos.
// Player: {n: name, r: BAT|BOWL|AR|WK, bat: batting skill 0-100, bowl: bowling skill 0-100, bt: 'pace'|'spin'|null}
const P=(n,r,bat,bowl,bt)=>({n,r,bat,bowl,bt:bt||null});
const TEAMS=[
{id:'IND',name:'India',color:'#1e5aff',color2:'#ff9933',rank:1,players:[
 P('Rohit Sharma','BAT',90,10),P('Shubman Gill','BAT',89,10),P('Virat Kohli','BAT',93,20),
 P('Shreyas Iyer','BAT',84,15),P('KL Rahul','WK',86,5),P('Hardik Pandya','AR',82,78,'pace'),
 P('Ravindra Jadeja','AR',80,82,'spin'),P('Kuldeep Yadav','BOWL',62,86,'spin'),
 P('Jasprit Bumrah','BOWL',70,94,'pace'),P('Mohammed Siraj','BOWL',62,84,'pace'),P('Arshdeep Singh','BOWL',60,82,'pace')]},
{id:'NZ',name:'New Zealand',color:'#111111',color2:'#ffffff',rank:2,players:[
 P('Devon Conway','WK',85,5),P('Rachin Ravindra','AR',86,72,'spin'),P('Kane Williamson','BAT',90,25),
 P('Daryl Mitchell','BAT',86,55,'pace'),P('Glenn Phillips','AR',84,60,'spin'),P('Tom Latham','WK',82,5),
 P('Mitchell Santner','AR',74,82,'spin'),P('Matt Henry','BOWL',66,86,'pace'),
 P('Trent Boult','BOWL',64,88,'pace'),P('Lockie Ferguson','BOWL',58,87,'pace'),P('Tim Southee','BOWL',62,84,'pace')]},
{id:'SA',name:'South Africa',color:'#007a4d',color2:'#ffb81c',rank:3,players:[
 P('Quinton de Kock','WK',88,5),P('Aiden Markram','BAT',86,55,'spin'),P('Rassie van der Dussen','BAT',84,10),
 P('Heinrich Klaasen','WK',89,5),P('David Miller','BAT',86,10),P('Tristan Stubbs','BAT',83,20),
 P('Marco Jansen','AR',76,84,'pace'),P('Keshav Maharaj','BOWL',62,82,'spin'),
 P('Kagiso Rabada','BOWL',70,91,'pace'),P('Anrich Nortje','BOWL',60,89,'pace'),P('Tabraiz Shamsi','BOWL',55,84,'spin')]},
{id:'PAK',name:'Pakistan',color:'#01411c',color2:'#ffffff',rank:4,players:[
 P('Babar Azam','BAT',92,15),P('Mohammad Rizwan','WK',88,5),P('Fakhar Zaman','BAT',84,10),
 P('Saim Ayub','BAT',82,45,'spin'),P('Salman Ali Agha','AR',80,55,'spin'),P('Shadab Khan','AR',74,78,'spin'),
 P('Shaheen Afridi','BOWL',78,90,'pace'),P('Naseem Shah','BOWL',70,88,'pace'),
 P('Haris Rauf','BOWL',65,86,'pace'),P('Abrar Ahmed','BOWL',60,82,'spin'),P('Hasan Ali','BOWL',62,80,'pace')]},
{id:'AUS',name:'Australia',color:'#ffcd00',color2:'#00843d',rank:5,players:[
 P('Travis Head','BAT',89,40,'spin'),P('Mitchell Marsh','BAT',85,65,'pace'),P('Steve Smith','BAT',88,30,'spin'),
 P('Marnus Labuschagne','BAT',84,30,'spin'),P('Glenn Maxwell','AR',86,72,'spin'),P('Alex Carey','WK',82,5),
 P('Marcus Stoinis','AR',80,72,'pace'),P('Pat Cummins','BOWL',72,90,'pace'),
 P('Mitchell Starc','BOWL',68,92,'pace'),P('Josh Hazlewood','BOWL',62,90,'pace'),P('Adam Zampa','BOWL',55,86,'spin')]},
{id:'SL',name:'Sri Lanka',color:'#0033a0',color2:'#ffcc00',rank:6,players:[
 P('Pathum Nissanka','BAT',86,10),P('Kusal Mendis','WK',85,5),P('Charith Asalanka','BAT',84,45,'spin'),
 P('Kamindu Mendis','AR',80,70,'spin'),P('Angelo Mathews','AR',82,72,'pace'),P('Dasun Shanaka','AR',78,70,'pace'),
 P('Wanindu Hasaranga','AR',76,86,'spin'),P('Dunith Wellalage','AR',72,78,'spin'),
 P('Maheesh Theekshana','BOWL',60,84,'spin'),P('Matheesha Pathirana','BOWL',60,86,'pace'),P('Dushmantha Chameera','BOWL',58,84,'pace')]},
{id:'AFG',name:'Afghanistan',color:'#1b4f9c',color2:'#d3202c',rank:7,players:[
 P('Rahmanullah Gurbaz','WK',86,5),P('Ibrahim Zadran','BAT',85,10),P('Rahmat Shah','BAT',82,20),
 P('Hashmatullah Shahidi','BAT',80,10),P('Azmatullah Omarzai','AR',78,78,'pace'),P('Mohammad Nabi','AR',78,80,'spin'),
 P('Rashid Khan','AR',74,90,'spin'),P('Mujeeb Ur Rahman','BOWL',60,84,'spin'),
 P('Noor Ahmad','BOWL',55,82,'spin'),P('Fazalhaq Farooqi','BOWL',62,84,'pace'),P('Naveen-ul-Haq','BOWL',58,80,'pace')]},
{id:'ENG',name:'England',color:'#0a1f44',color2:'#ce1124',rank:8,players:[
 P('Phil Salt','BAT',84,5),P('Ben Duckett','BAT',85,10),P('Joe Root','BAT',91,35,'spin'),
 P('Harry Brook','BAT',88,15),P('Jos Buttler','WK',89,5),P('Ben Stokes','AR',86,80,'pace'),
 P('Liam Livingstone','AR',80,70,'spin'),P('Sam Curran','AR',76,78,'pace'),
 P('Jofra Archer','BOWL',68,90,'pace'),P('Mark Wood','BOWL',60,88,'pace'),P('Adil Rashid','BOWL',55,86,'spin')]},
{id:'BAN',name:'Bangladesh',color:'#006a4e',color2:'#f42a41',rank:9,players:[
 P('Litton Das','WK',83,5),P('Tanzid Hasan','BAT',80,10),P('Najmul Hossain Shanto','BAT',82,20),
 P('Towhid Hridoy','BAT',82,10),P('Shakib Al Hasan','AR',84,82,'spin'),P('Mushfiqur Rahim','WK',84,5),
 P('Mehidy Hasan Miraz','AR',78,80,'spin'),P('Rishad Hossain','BOWL',62,78,'spin'),
 P('Taskin Ahmed','BOWL',62,84,'pace'),P('Mustafizur Rahman','BOWL',60,82,'pace'),P('Shoriful Islam','BOWL',58,80,'pace')]},
{id:'WI',name:'West Indies',color:'#7b0c1e',color2:'#ffd700',rank:10,players:[
 P('Brandon King','BAT',82,10),P('Shai Hope','WK',85,5),P('Nicholas Pooran','WK',88,5),
 P('Rovman Powell','BAT',84,40,'pace'),P('Shimron Hetmyer','BAT',83,10),P('Andre Russell','AR',84,80,'pace'),
 P('Jason Holder','AR',78,80,'pace'),P('Romario Shepherd','AR',74,76,'pace'),
 P('Alzarri Joseph','BOWL',64,84,'pace'),P('Gudakesh Motie','BOWL',58,80,'spin'),P('Akeal Hosein','BOWL',58,80,'spin')]},
{id:'ZIM',name:'Zimbabwe',color:'#cc0000',color2:'#ffd200',rank:11,players:[
 P('Brian Bennett','BAT',78,45,'spin'),P('Tadiwanashe Marumani','WK',74,5),P('Craig Ervine','BAT',78,10),
 P('Sean Williams','AR',80,74,'spin'),P('Sikandar Raza','AR',84,78,'spin'),P('Ryan Burl','AR',76,70,'spin'),
 P('Clive Madande','WK',72,5),P('Wellington Masakadza','BOWL',60,72,'spin'),
 P('Brad Evans','BOWL',58,74,'pace'),P('Blessing Muzarabani','BOWL',60,80,'pace'),P('Richard Ngarava','BOWL',58,78,'pace')]},
{id:'IRE',name:'Ireland',color:'#169b62',color2:'#ffffff',rank:12,players:[
 P('Paul Stirling','BAT',82,40,'spin'),P('Andrew Balbirnie','BAT',78,10),P('Harry Tector','BAT',82,35,'spin'),
 P('Lorcan Tucker','WK',78,5),P('Curtis Campher','AR',76,72,'pace'),P('George Dockrell','AR',72,70,'spin'),
 P('Gareth Delany','AR',72,68,'spin'),P('Mark Adair','BOWL',64,78,'pace'),
 P('Josh Little','BOWL',60,80,'pace'),P('Barry McCarthy','BOWL',58,76,'pace'),P('Craig Young','BOWL',56,74,'pace')]},
{id:'SCO',name:'Scotland',color:'#005eb8',color2:'#ffffff',rank:13,players:[
 P('George Munsey','BAT',78,10),P('Matthew Cross','WK',76,5),P('Brandon McMullen','AR',78,70,'pace'),
 P('Richie Berrington','BAT',80,35,'spin'),P('Michael Leask','AR',74,70,'spin'),P('Charlie Tear','WK',72,5),
 P('Chris Greaves','AR',70,68,'spin'),P('Mark Watt','BOWL',58,74,'spin'),
 P('Brad Wheal','BOWL',58,76,'pace'),P('Safyaan Sharif','BOWL',56,74,'pace'),P('Jack Jarvis','BOWL',54,72,'pace')]},
{id:'NED',name:'Netherlands',color:'#ff7f00',color2:'#ffffff',rank:14,players:[
 P('Max O’Dowd','BAT',78,10),P('Vikramjit Singh','BAT',76,55,'pace'),P('Scott Edwards','WK',78,5),
 P('Bas de Leede','AR',78,74,'pace'),P('Colin Ackermann','AR',74,70,'spin'),P('Teja Nidamanuru','BAT',72,30,'spin'),
 P('Roelof van der Merwe','AR',72,72,'spin'),P('Logan van Beek','AR',70,74,'pace'),
 P('Paul van Meekeren','BOWL',58,76,'pace'),P('Aryan Dutt','BOWL',56,72,'spin'),P('Vivian Kingma','BOWL',54,72,'pace')]},
{id:'USA',name:'USA',color:'#002868',color2:'#bf0a30',rank:15,players:[
 P('Steven Taylor','BAT',74,45,'spin'),P('Monank Patel','WK',76,5),P('Aaron Jones','BAT',76,10),
 P('Corey Anderson','AR',78,68,'pace'),P('Milind Kumar','BAT',72,30,'spin'),P('Shayan Jahangir','WK',70,5),
 P('Harmeet Singh','AR',68,70,'spin'),P('Jasdeep Singh','BOWL',56,70,'pace'),
 P('Saurabh Netravalkar','BOWL',58,74,'pace'),P('Ali Khan','BOWL',56,72,'pace'),P('Nosthush Kenjige','BOWL',54,68,'spin')]},
];

// ===== Helpers & Sound =====
const $=id=>document.getElementById(id);
const rand=(a,b)=>a+Math.random()*(b-a);
const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
const stars=t=>{const r=t.rank;return r<=3?'★★★★★':r<=6?'★★★★':r<=10?'★★★':'★★';};
let AC=null;
let soundOn=true;
function unlockAudio(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){}}
function beep(f,d,type='sine',v=0.15){if(!soundOn)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();
 const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;
 g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+d);
 o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}catch(e){}}
function cheer(){if(!soundOn)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();
 const len=AC.sampleRate*0.8,buf=AC.createBuffer(1,len,AC.sampleRate),d=buf.getChannelData(0);
 for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);
 const s=AC.createBufferSource(),g=AC.createGain();s.buffer=buf;g.gain.value=0.25;
 s.connect(g);g.connect(AC.destination);s.start();}catch(e){}}
function crack(){beep(180,0.12,'square',0.2);beep(90,0.15,'triangle',0.2);}
function sadTrombone(){beep(220,0.4,'sawtooth',0.12);setTimeout(()=>beep(175,0.5,'sawtooth',0.12),350);}
function speak(t){if(!soundOn||!('speechSynthesis' in window))return;try{const u=new SpeechSynthesisUtterance(t);u.rate=1.05;const vs=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.startsWith('en'));if(vs)u.voice=vs;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function commentate(res){if(!res)return;if(res.out)speak('Wicket! '+res.how+'! The crowd goes wild!');else if(res.runs===4)speak('What a shot! Four runs!');else if(res.runs===6)speak('Huge six! That has gone all the way!');else if(res.runs>0)speak(res.runs+' runs. Good running between the wickets.');else speak('Dot ball. Good bowling.');}
function toggleSound(){soundOn=!soundOn;if(!soundOn&&('speechSynthesis' in window))speechSynthesis.cancel();if(soundOn)unlockAudio();const b=$('btn-sound');if(b)b.textContent=soundOn?'🔊 Voice: ON':'🔇 Voice: OFF';}

// ===== State =====
let userTeam=null, oppTeam=null, overs=5, tossWinner=null, userBatsFirst=null;
let M=null; // match state
let shot='normal', delivery='fast', ballBusy=false, hitTiming=null, sweepRAF=null;

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');}
function teamCard(t,selected,onClick){
 const d=document.createElement('div');d.className='team-card'+(selected?' sel':'');
 d.innerHTML=`<div class="tc-name"><span class="tc-swatch" style="background:${t.color}"></span>${t.name}</div>
 <div class="tc-rank">ICC ODI Rank #${t.rank}</div><div class="tc-stars">${stars(t)}</div>`;
 d.onclick=()=>onClick(t);return d;}
function renderTeams(){
 const g=$('team-grid'),o=$('opp-grid');g.innerHTML='';o.innerHTML='';
 TEAMS.forEach(t=>{
   g.appendChild(teamCard(t,userTeam===t,(x)=>{userTeam=x;renderTeams();updatePlayBtn();}));
   o.appendChild(teamCard(t,oppTeam===t,(x)=>{oppTeam=x;renderTeams();updatePlayBtn();}));
 });
 renderXiPreview();}
function renderXiPreview(){
 const el=$('xi-preview');if(!el)return;
 let h='';
 [userTeam,oppTeam].forEach((t,label)=>{
   if(!t)return;
   h+=`<div class="xi-team"><b style="color:${t.color2}">● ${t.name} — Playing XI</b><br>`+
     t.players.map((p,i)=>`${i+1}. ${p.n} <span class="role">${p.r}</span>`).join(' • ')+'</div>';});
 el.innerHTML=h;}
function updatePlayBtn(){
 const b=$('btn-play');
 if(userTeam&&oppTeam&&userTeam!==oppTeam){b.disabled=false;b.textContent=`▶ Play: ${userTeam.name} vs ${oppTeam.name}`;}
 else{b.disabled=true;b.textContent=userTeam===oppTeam&&userTeam?'Pick two DIFFERENT teams':'Select both teams to continue';}}
document.querySelectorAll('#overs-row .pill').forEach(p=>p.onclick=()=>{
 document.querySelectorAll('#overs-row .pill').forEach(x=>x.classList.remove('active'));
 p.classList.add('active');overs=+p.dataset.overs;});
$('btn-play').onclick=()=>{unlockAudio();
 $('toss-matchup').textContent=`${userTeam.name} vs ${oppTeam.name} • ${overs} overs`;
 $('toss-result').textContent='';$('toss-choice').classList.add('hidden');
 $('toss-ai-choice').classList.add('hidden');$('btn-start-match').classList.add('hidden');
 showScreen('screen-toss');};
document.querySelectorAll('.toss-call').forEach(b=>b.onclick=()=>{
 const call=b.dataset.call, res=Math.random()<0.5?'heads':'tails';
 const userWon=(call===res);tossWinner=userWon?'user':'ai';
 $('toss-result').textContent=`Coin: ${res.toUpperCase()} — ${userWon?'You won the toss!':oppTeam.name+' won the toss.'}`;
 if(userWon){$('toss-choice').classList.remove('hidden');}
 else{
   const aiBats=Math.random()<0.5;userBatsFirst=!aiBats;
   $('toss-ai-choice').classList.remove('hidden');
   $('toss-ai-choice').textContent=`${oppTeam.name} chose to ${aiBats?'bat':'bowl'} first.`;
   $('btn-start-match').classList.remove('hidden');}});
$('choose-bat').onclick=()=>{userBatsFirst=true;$('btn-start-match').classList.remove('hidden');};
$('choose-bowl').onclick=()=>{userBatsFirst=false;$('btn-start-match').classList.remove('hidden');};
$('btn-start-match').onclick=()=>{unlockAudio();startMatch();};

// ===== Match engine =====
function attackOf(team){return [...team.players].filter(p=>p.bowl>=40).sort((a,b)=>b.bowl-a.bowl).slice(0,5);}
function newInnings(batTeam,bowlTeam,target){
 const atk=attackOf(bowlTeam);
 return {batTeam,bowlTeam,target,score:0,wkts:0,balls:0,extras:{runs:0,wides:0,noballs:0},
  batsmen:batTeam.players.map(p=>({p,runs:0,balls:0,fours:0,sixes:0,out:false,howOut:''})),
  striker:0,nonStriker:1,nextIdx:2,
  bowlers:atk.map(p=>({p,balls:0,runs:0,wkts:0,maidens:0,overStartRuns:0})),
  bowlerIdx:0,overBalls:0,prevBowler:-1,fow:[],commentary:[],done:false};}
function curBowler(){const inn=M.innings[M.inn-1];return inn.bowlers[inn.bowlerIdx];}
function strikerRec(){const inn=M.innings[M.inn-1];return inn.batsmen[inn.striker];}
function say(txt){const inn=M.innings[M.inn-1];inn.commentary.unshift(txt);if(inn.commentary.length>30)inn.commentary.pop();renderCommentary();}
function renderCommentary(){const inn=M.innings[M.inn-1];$('commentary-list').innerHTML=inn.commentary.map(c=>`<li>${c}</li>`).join('');}
function fmtOvers(b){return Math.floor(b/6)+'.'+(b%6);}
function startMatch(){
 const firstBat=userBatsFirst?userTeam:oppTeam, firstBowl=userBatsFirst?oppTeam:userTeam;
 M={inn:1,innings:[newInnings(firstBat,firstBowl,0)],userTeam,oppTeam,overs};
 say(`🏏 Match started: ${firstBat.name} batting first. ${overs}-over match.`);
 showScreen('screen-match');renderAll();drawScene(0);nextBallPrompt();}
function renderAll(){
 const inn=M.innings[M.inn-1];M=Object.assign(M,{cur:inn});
 const bat=inn.batTeam,bowl=inn.bowlTeam;
 const initials=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
 $('sb-abbr-bat').textContent=bat.id;
 $('sb-score2').textContent=`${inn.score}/${inn.wkts}`;
 $('sb-overs2').textContent=`${fmtOvers(inn.balls)} ov`;
 $('sb-left').style.background=bat.color;
 $('sb-right').style.background=bowl.color;
 $('sb-abbr-bowl').textContent=bowl.id;
 const rr=inn.balls?((inn.score/(inn.balls/6))).toFixed(2):'0.00';
 $('sb-rr').textContent=`RR ${rr}`;
 $('sb-target').textContent=inn.target?`Target ${inn.target} • Need ${Math.max(0,inn.target-inn.score)} off ${Math.max(0,overs*6-inn.balls)}`:'';
 const s=inn.batsmen[inn.striker],ns=inn.batsmen[inn.nonStriker];
 $('sb-face1').textContent=s?initials(s.p.n):'';
 $('sb-bat1').textContent=s?`${s.p.n}* ${s.runs} (${s.balls})`:'';
 $('sb-face2').textContent=ns?initials(ns.p.n):'';
 $('sb-bat2').textContent=ns?`${ns.p.n} ${ns.runs} (${ns.balls})`:'';
 const b=curBowler();
 $('sb-bowl-face').textContent=b?initials(b.p.n):'';
 $('sb-bowl1').textContent=b?`${b.p.n} ${b.wkts}-${b.runs} (${fmtOvers(b.balls)})`:'';
 const userBatting=(bat===userTeam);
 $('bat-controls').classList.toggle('hidden',!userBatting||inn.done);
 $('bowl-controls').classList.toggle('hidden',userBatting||inn.done);
 renderScorecard();}
function renderScorecard(){
 if(!M)return;
 let h='<h3 style="margin:8px 0 4px">📋 Full Scorecard</h3>';
 M.innings.forEach((inn)=>{
   const sr=b=>b.balls>0?(b.runs/b.balls*100).toFixed(1):'—';
   const ec=b=>b.balls>0?(b.runs/(b.balls/6)).toFixed(2):'—';
   h+=`<div style="margin:10px 0"><b>${inn.batTeam.name} — ${inn.score}/${inn.wkts} (${fmtOvers(inn.balls)} ov)</b>${inn.target?` • Target ${inn.target}`:''}<br>`;
   h+='<table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="text-align:left">Batter</th><th style="text-align:left"></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>';
   let dnb=[];
   inn.batsmen.forEach((b,i)=>{
     const atCrease=(i===inn.striker||i===inn.nonStriker);
     if(!b.out&&b.balls===0&&!atCrease){dnb.push(b.p.n);return;}
     h+=`<tr><td>${b.p.n}${(!b.out&&atCrease)?'*':''}</td><td style="opacity:.75">${b.out?b.howOut:'not out'}</td><td>${b.runs}</td><td>${b.balls}</td><td>${b.fours}</td><td>${b.sixes}</td><td>${sr(b)}</td></tr>`;});
   h+='</table>';
   const ex=inn.extras||{runs:0,wides:0,noballs:0};
   h+=`<div>Extras: ${ex.runs}${(ex.wides||ex.noballs)?` (${ex.wides} wd, ${ex.noballs} nb)`:''}</div>`;
   if(dnb.length)h+=`<div>Did not bat: ${dnb.join(', ')}</div>`;
   if(inn.fow.length)h+=`<div>Fall of wickets: ${inn.fow.join(', ')}</div>`;
   h+='<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:4px"><tr><th style="text-align:left">Bowler</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th></tr>';
   inn.bowlers.forEach(b=>{if(b.balls>0)h+=`<tr><td>${b.p.n}</td><td>${fmtOvers(b.balls)}</td><td>${b.maidens||0}</td><td>${b.runs}</td><td>${b.wkts}</td><td>${ec(b)}</td></tr>`;});
   h+='</table></div>';});
 $('scorecard-body').innerHTML=h;}
function nextBallPrompt(){renderAll();drawScene(0);}
function bigText(t,ms=1200){const el=$('big-text');el.textContent=t;el.classList.remove('hidden');
 setTimeout(()=>el.classList.add('hidden'),ms);}
function outcomeText(runs,out,how){
 if(out)return `☝️ WICKET! ${how}`;
 if(runs===0)return 'Dot ball.';
 if(runs===1)return '1 run.';
 if(runs===2)return '2 runs.';
 if(runs===3)return '3 runs.';
 if(runs===4)return 'FOUR! 💥';
 if(runs===6)return 'SIX! 🚀';return runs+' runs.';}
function weightedPick(weights){let tot=0;for(const k in weights)tot+=weights[k];
 let x=Math.random()*tot;for(const k in weights){x-=weights[k];if(x<=0)return k;}return '0';}
function skillShift(bat,bowl){return (bat-bowl)/2;} // -50..50
function battingOutcome(shotType,timing,bat,bowl){
 let w={0:28,1:30,2:12,4:14,6:4,W:12};
 if(shotType==='defend')w={0:45,1:35,2:8,4:4,6:0,W:8};
 if(shotType==='attack')w={0:20,1:22,2:12,4:20,6:10,W:16};
 if(shotType==='loft')w={0:18,1:10,2:6,4:22,6:22,W:22};
 const sh=skillShift(bat.bat,bowl.bowl);
 w.W=Math.max(2,w.W-sh*0.25);w[4]=Math.max(0,w[4]+sh*0.15);w[6]=Math.max(0,w[6]+sh*0.12);
 if(timing==='perfect'){w[4]+=8;w[6]+=6;w.W=Math.max(1,w.W-6);}
 else if(timing==='good'){w[4]+=3;w[6]+=2;}
 else if(timing==='early'||timing==='late'){w.W+=8;w[4]=Math.max(0,w[4]-5);w[6]=Math.max(0,w[6]-3);}
 else if(timing==='miss'){return {runs:0,out:Math.random()<0.15,how:'bowled'};}
 const k=weightedPick(w);
 if(k==='W')return {runs:0,out:true,how:pick(['bowled','caught','LBW','run out'])};
 return {runs:+k,out:false,how:''};}
function applyBall(res,extraRuns,extraLabel){
 const inn=M.innings[M.inn-1],b=curBowler(),s=strikerRec();
 if(extraLabel){inn.score+=extraRuns;b.runs+=extraRuns;
   inn.extras.runs+=extraRuns;
   if(extraLabel.toLowerCase().includes('wide'))inn.extras.wides++;else inn.extras.noballs++;
   say(`⚠️ ${extraLabel} — +${extraRuns} run.`);renderAll();return 'extra';}
 inn.balls++;b.balls++;inn.overBalls++;
 s.balls++;
 if(res.out){
   inn.wkts++;b.wkts++;s.out=true;
   let howTxt='';
   if(res.how==='bowled')howTxt=`b ${b.p.n}`;
   else if(res.how==='LBW')howTxt=`lbw b ${b.p.n}`;
   else if(res.how==='run out')howTxt=`run out`;
   else if(res.how==='caught'){const opts=inn.bowlTeam.players.filter(pp=>pp!==b.p);const cf=opts[Math.floor(Math.random()*opts.length)];howTxt=`c ${cf.n} b ${b.p.n}`;}
   else howTxt=res.how;
   s.howOut=howTxt;
   inn.fow.push(`${inn.score}/${inn.wkts} — ${s.p.n} (${fmtOvers(inn.balls)} ov)`);
   say(`☝️ WICKET! ${s.p.n} ${howTxt}. ${inn.batTeam.name} ${inn.score}/${inn.wkts}`);
   commentate({out:true,how:res.how});
   sadTrombone();bigText('WICKET! ☝️');
   if(inn.wkts>=10||inn.nextIdx>=11){/* all out handled below */ }
   else{inn.striker=inn.nextIdx++; }
 } else {
   inn.score+=res.runs;b.runs+=res.runs;s.runs+=res.runs;
   if(res.runs===4){s.fours++;crack();cheer();bigText('FOUR! 💥');}
   else if(res.runs===6){s.sixes++;crack();cheer();bigText('SIX! 🚀');}
   else if(res.runs>0)crack();
   say(`🎳 ${b.p.n} to ${s.p.n}: ${outcomeText(res.runs,false)} ${inn.batTeam.name} ${inn.score}/${inn.wkts}`);
   commentate({out:false,runs:res.runs});
   if(res.runs%2===1){const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;}
 }
 if(inn.overBalls>=6){inn.overBalls=0;
   if(b.runs-(b.overStartRuns||0)===0)b.maidens=(b.maidens||0)+1;
   const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;
   inn.prevBowler=inn.bowlerIdx;
   do{inn.bowlerIdx=(inn.bowlerIdx+1)%inn.bowlers.length;}while(inn.bowlerIdx===inn.prevBowler&&inn.bowlers.length>1);
   inn.bowlers[inn.bowlerIdx].overStartRuns=inn.bowlers[inn.bowlerIdx].runs;}
 renderAll();return 'ok';}
function checkInningsEnd(){
 const inn=M.innings[M.inn-1];
 const ballsDone=inn.balls>=overs*6, allOut=inn.wkts>=10, chased=inn.target&&inn.score>=inn.target;
 if(!(ballsDone||allOut||chased))return false;
 inn.done=true;renderAll();
 if(M.inn===1){
   const t1=inn.score+1;
   say(`🏁 Innings break: ${inn.batTeam.name} ${inn.score}/${inn.wkts}. Target: ${t1}.`);
   setTimeout(()=>{
     M.inn=2;M.innings.push(newInnings(inn.bowlTeam,inn.batTeam,t1));
     say(`🏏 Second innings: ${inn.bowlTeam.name} need ${t1} to win.`);
     renderAll();drawScene(0);},1800);
 } else {setTimeout(endMatch,1200);}
 return true;}
// ----- User batting -----
document.querySelectorAll('.shot').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.shot').forEach(x=>x.classList.remove('active'));b.classList.add('active');shot=b.dataset.shot;});
// ----- Animated ball sequences: run-up -> delivery -> timing -> result -----
let anim=null;
const FIELDERS=[[110,110],[610,110],[170,240],[550,240],[360,180],[90,330],[630,330]];
function skinFor(name){let h=0;for(let i=0;i<name.length;i++)h=(h*31+name.charCodeAt(i))%997;return ['#ffdbac','#e8b88a','#c68642','#8d5524'][h%4];}

document.querySelectorAll('.shot').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.shot').forEach(x=>x.classList.remove('active'));b.classList.add('active');shot=b.dataset.shot;});
document.querySelectorAll('.delivery').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.delivery').forEach(x=>x.classList.remove('active'));b.classList.add('active');delivery=b.dataset.del;});

function timingQuality(){
 if(hitTiming===null)return 'miss';
 if(hitTiming>=45&&hitTiming<=55)return 'perfect';
 if(hitTiming>=30&&hitTiming<=70)return 'good';
 return hitTiming<45?'early':'late';}

function pickFielder(){return FIELDERS[Math.floor(Math.random()*FIELDERS.length)];}
function nearestFielder(pt){let best=FIELDERS[0],bd=1e9;FIELDERS.forEach(f=>{const d=(f[0]-pt[0])**2+(f[1]-pt[1])**2;if(d<bd){bd=d;best=f;}});return best;}

function startBattingSeq(){
 if(ballBusy)return;ballBusy=true;hitTiming=null;
 const fl=$('field');if(fl&&fl.scrollIntoView)fl.scrollIntoView({block:'start'});
 $('timing-box').classList.remove('hidden');$('btn-hit').classList.remove('hidden');
 $('timing-needle').style.left='0%';
 $('btn-bowl-ball').disabled=true;
 const r=Math.random();
 const bp=Math.random()<0.5?[110,190]:[610,190];
 anim={kind:'bat',phase:'runup',t0:performance.now(),shot:shot,swingT:null,
   extra:r<0.05?'Wide ball':(r<0.08?'No ball':null),
   fieldFielder:pickFielder(),catchFielder:pickFielder(),boundaryPt:bp,chaseFielder:null};
 anim.chaseFielder=nearestFielder(bp);
 requestAnimationFrame(animLoop);}
function startBowlingSeq(){
 if(ballBusy)return;ballBusy=true;$('btn-bowl-delivery').disabled=true;
 const fl=$('field');if(fl&&fl.scrollIntoView)fl.scrollIntoView({block:'start'});
 const r=Math.random();
 let pre=null;
 if(r<0.05)pre={extra:'Wide ball'};
 else if(r<0.08)pre={extra:'No ball'};
 else pre={extra:null,agg:null,res:null};
 if(pre&&!pre.extra){const o=aiBowlingOutcome();pre.agg=o.agg;pre.res=o.res;}
 const bp=Math.random()<0.5?[110,190]:[610,190];
 anim={kind:'bowl',phase:'runup',t0:performance.now(),pre:pre,swingT:null,
   fieldFielder:pickFielder(),catchFielder:pickFielder(),boundaryPt:bp,chaseFielder:null};
 anim.chaseFielder=nearestFielder(bp);
 requestAnimationFrame(animLoop);}
function aiBowlingOutcome(){
 const inn=M.innings[M.inn-1];
 let agg='normal';const a=Math.random();
 const chasing=inn.target&&inn.target-inn.score>0;
 if(chasing&&inn.balls>0){const req=(inn.target-inn.score)/((overs*6-inn.balls)/6);
   if(req>10)agg=a<0.5?'attack':a<0.8?'loft':'normal';
   else agg=a<0.25?'defend':a<0.65?'normal':a<0.85?'attack':'loft';
 } else agg=a<0.2?'defend':a<0.6?'normal':a<0.85?'attack':'loft';
 let res=battingOutcome(agg,'good',strikerRec().p,curBowler().p);
 if(delivery==='yorker'){if(res.runs===4||res.runs===6){if(Math.random()<0.5)res={runs:0,out:false,how:''};}
   if(!res.out&&Math.random()<0.08)res={runs:0,out:true,how:'bowled'};}
 if(delivery==='slower'&&agg==='attack'&&!res.out&&Math.random()<0.25)res={runs:6,out:false,how:''};
 if(delivery==='spin'&&strikerRec().p.bat<80&&Math.random()<0.12)res={runs:0,out:true,how:'caught'};
 return {agg,res};}
function animLoop(t){
 if(!anim)return;
 const el=t-anim.t0;
 if(anim.phase==='runup'&&el>=1500){anim.phase='deliver';anim.t0=t;}
 else if(anim.phase==='deliver'&&el>=450){
   anim.phase='travel';anim.t0=t;
   if(anim.kind==='bowl'){anim.swingT=t+150;}
   if(anim.kind==='bat'){$('btn-hit').classList.remove('hidden');}
 }
 else if(anim.phase==='travel'){
   const p=Math.min(1,el/1600);
   $('timing-needle').style.left=(p*100)+'%';
   if(p>=1){
     if(anim.kind==='bat'){
       if(!anim.extra){
         const tq=timingQuality();
         anim.outcome=battingOutcome(anim.shot,tq,strikerRec().p,curBowler().p);
         if(tq==='perfect')say('⏱️ Perfect timing!');
         if(!anim.swingT&&tq!=='miss')anim.swingT=t;
       } else anim.outcome=null;
     } else {
       anim.outcome=anim.pre.res||null;
     }
     anim.phase='result';anim.t0=t;
     const oc=anim.outcome;
     if(oc&&(oc.runs===4||oc.runs===6||oc.out))bigText(oc.out?'WICKET! ☝️':(oc.runs===4?'FOUR! 💥':'SIX! 🚀'));
   }
 }
 else if(anim.phase==='result'&&el>=2200){finishSeq();return;}
 drawFrame(t);
 requestAnimationFrame(animLoop);}
function finishSeq(){
 const a=anim;anim=null;ballBusy=false;
 $('timing-box').classList.add('hidden');$('btn-hit').classList.add('hidden');
 $('btn-bowl-ball').disabled=false;$('btn-bowl-delivery').disabled=false;
 if(a.kind==='bat'){
   if(a.extra)applyBall(null,1,a.extra);
   else applyBall(a.outcome,0,null);
 } else {
   if(a.pre.extra)applyBall(null,1,a.pre.extra);
   else{
     say(`🤖 AI plays ${a.pre.agg} vs your ${delivery}.`);
     applyBall(a.pre.res,0,null);
   }
 }
 if(!checkInningsEnd())nextBallPrompt();}
$('btn-bowl-ball').onclick=()=>{unlockAudio();startBattingSeq();};
$('btn-bowl-delivery').onclick=()=>{unlockAudio();startBowlingSeq();};
$('btn-hit').onclick=()=>{unlockAudio();
 if(!ballBusy||!anim||anim.phase==='result'||hitTiming!==null)return;
 const left=parseFloat($('timing-needle').style.left)||0;
 hitTiming=left;$('btn-hit').classList.add('hidden');
 anim.swingT=performance.now();
 beep(600,0.08,'square',0.1);};
$('timing-bar').onclick=()=>{if(anim&&anim.kind==='bat')$('btn-hit').onclick();};

function endMatch(){
 const [i1,i2]=M.innings;
 let title,margin;
 if(i1.score>i2.score){title=`🏆 ${i1.batTeam.name} WIN!`;margin=`Won by ${i1.score-i2.score} runs`;}
 else if(i2.score>i1.score){title=`🏆 ${i2.batTeam.name} WIN!`;
   margin=`Won by ${10-i2.wkts} wickets`;}
 else{title='🤝 MATCH TIED!';margin='Scores level — what a game!';}
 // man of the match: most runs, tie -> most wickets
 let mom=null,bestRuns=-1;
 [...i1.batsmen,...i2.batsmen].forEach(b=>{if(b.runs>bestRuns){bestRuns=b.runs;mom=b;}});
 $('result-title').textContent=title;$('result-margin').textContent=margin;
 $('result-scores').innerHTML=`${i1.batTeam.name}: ${i1.score}/${i1.wkts} (${fmtOvers(i1.balls)})<br>${i2.batTeam.name}: ${i2.score}/${i2.wkts} (${fmtOvers(i2.balls)})`;
 $('result-mom').textContent=mom?`⭐ Man of the Match: ${mom.p.n} — ${mom.runs} runs`:'';
 cheer();speak((title.replace(/[^a-zA-Z0-9 ]/g,'')+'. '+margin));showScreen('screen-result');}
$('btn-rematch').onclick=()=>{startMatch();};
$('btn-new-teams').onclick=()=>{userTeam=null;oppTeam=null;renderTeams();updatePlayBtn();showScreen('screen-home');};

// ===== Animated canvas scene: stadium, articulated players, ball physics =====
const CROWD=[];
for(let i=0;i<140;i++)CROWD.push([20+Math.random()*680,6+Math.random()*22,['#e11d48','#f59e0b','#3b82f6','#ffffff','#22c55e','#a855f7'][i%6]]);

const KITPAT={IND:'shoulder',NZ:'band',SA:'band',PAK:'band',AUS:'shoulder',SL:'stripes',AFG:'band',ENG:'stripes',BAN:'band',WI:'shoulder',ZIM:'band',IRE:'shoulder',SCO:'stripes',NED:'band',USA:'stripes'};
function kitFor(t){return {kit:t.color,accent:t.color2,pattern:KITPAT[t.id]||'band',pants:t.color};}
function drawFigure(c,o){
  const s=o.s||1, x=o.x, y=o.y-(o.jump||0);
  c.fillStyle='rgba(0,0,0,0.28)';c.beginPath();c.ellipse(x,y+2,14*s,4*s,0,0,Math.PI*2);c.fill();
  const lp=(o.leg===null||o.leg===undefined)?0:Math.sin(o.leg)*0.7;
  c.strokeStyle=o.pants||(o.pads?'#f5f5f5':'#1f2937');c.lineWidth=5*s;c.lineCap='round';
  c.beginPath();c.moveTo(x,y-22*s);c.lineTo(x-6*s+lp*6*s,y);c.stroke();
  c.beginPath();c.moveTo(x,y-22*s);c.lineTo(x+6*s-lp*6*s,y);c.stroke();
  if(o.pads){c.fillStyle='#f8f8f8';c.fillRect(x-9*s,y-24*s,7*s,22*s);c.fillRect(x+2*s,y-24*s,7*s,22*s);}
  if(o.pattern==='gradient'){const g=c.createLinearGradient(x-11*s,y-52*s,x+11*s,y-20*s);g.addColorStop(0,o.kit);g.addColorStop(1,o.accent||o.kit);c.fillStyle=g;}else c.fillStyle=o.kit;
  c.beginPath();c.roundRect(x-11*s,y-52*s,22*s,32*s,6);c.fill();
  if(o.accent){c.fillStyle=o.accent;
    if(o.pattern==='band')c.fillRect(x-11*s,y-40*s,22*s,8*s);
    else if(o.pattern==='shoulder'){c.fillRect(x-11*s,y-52*s,8*s,10*s);c.fillRect(x+3*s,y-52*s,8*s,10*s);}
    else if(o.pattern==='stripes')c.fillRect(x-3*s,y-52*s,6*s,32*s);}
  c.fillStyle='rgba(255,255,255,0.28)';c.fillRect(x-11*s,y-52*s,22*s,4*s);
  c.strokeStyle=o.kit;c.lineWidth=4.5*s;
  if(o.arm!==null&&o.arm!==undefined){
    const ax=x+10*s, ay=y-48*s;
    c.beginPath();c.moveTo(ax,ay);c.lineTo(ax+Math.cos(o.arm)*18*s,ay+Math.sin(o.arm)*18*s);c.stroke();
    c.beginPath();c.moveTo(x-10*s,y-48*s);c.lineTo(x-16*s,y-30*s);c.stroke();
  } else {
    c.beginPath();c.moveTo(x-10*s,y-48*s);c.lineTo(x-15*s,y-30*s);c.stroke();
    c.beginPath();c.moveTo(x+10*s,y-48*s);c.lineTo(x+15*s,y-30*s);c.stroke();
  }
  if(o.bat!==null&&o.bat!==undefined){
    c.save();c.translate(x+14*s,y-32*s);c.rotate(o.bat);
    c.fillStyle='#d9a05b';c.fillRect(-2.5*s,0,5*s,30*s);
    c.fillStyle='#8b5a2b';c.fillRect(-2*s,-8*s,4*s,8*s);c.restore();
  }
  c.fillStyle=o.skin;c.beginPath();c.arc(x,y-60*s,9*s,0,Math.PI*2);c.fill();
  c.fillStyle='#1a1a1a';c.beginPath();c.arc(x,y-63*s,9*s,Math.PI,0);c.fill();
  if(o.helmet){
    c.fillStyle='#1f2937';c.beginPath();c.arc(x,y-61*s,10.5*s,Math.PI*0.95,Math.PI*2.05);c.fill();
    c.strokeStyle='#9ca3af';c.lineWidth=1.5*s;c.beginPath();c.moveTo(x-8*s,y-56*s);c.lineTo(x+8*s,y-56*s);c.stroke();
  } else if(o.cap){c.fillStyle=o.kit;c.beginPath();c.arc(x,y-64*s,9*s,Math.PI,0);c.fill();}
  if(o.ball){c.fillStyle='#ff1744';c.beginPath();c.arc(x+14*s,y-52*s,6*s,0,Math.PI*2);c.fill();}
}
function drawStumpsAt(c,x,y,s,broken){
  c.strokeStyle='#ffd700';c.lineWidth=3*s;
  for(let i=-1;i<=1;i++){
    const tilt=broken?(i*0.9+0.4):0;
    c.save();c.translate(x+i*7*s,y);c.rotate(tilt);
    c.beginPath();c.moveTo(0,0);c.lineTo(0,12*s);c.stroke();c.restore();
  }
  if(!broken){c.fillStyle='#ffd700';c.fillRect(x-8*s,y-2*s,5*s,2*s);c.fillRect(x+3*s,y-2*s,5*s,2*s);}
}
function resultOutcome(){
  if(!anim)return null;
  if(anim.kind==='bat')return anim.extra?null:anim.outcome;
  return anim.pre.extra?null:anim.pre.res;
}
function ballXY(now){
  if(!anim)return null;
  if(anim.phase==='runup'){
    const p=Math.min(1,(now-anim.t0)/1500);
    return {x:372,y:329-p*90,r:10};
  }
  if(anim.phase==='deliver'){
    const p=Math.min(1,(now-anim.t0)/450), a=-2.6+p*3.3;
    return {x:370+Math.cos(a)*16,y:244+Math.sin(a)*16,r:10};
  }
  if(anim.phase==='travel'){
    const p=Math.min(1,(now-anim.t0)/1600);
    let x=360+(anim.extra?55*p:0);
    let y=280-195*p;
    if(p>0.6&&p<0.72)y-=Math.sin((p-0.6)/0.12*Math.PI)*5;
    return {x,y,r:6+p*5};
  }
  const q=Math.min(1,(now-anim.t0)/2200);
  const oc=resultOutcome();
  const ex=anim.kind==='bat'?anim.extra:anim.pre.extra;
  if(ex)return {x:360,y:85-q*35,r:10};
  if(!oc)return {x:360,y:50,r:10};
  if(oc.out){
    if(oc.how==='caught'){const f=anim.catchFielder;return {x:360+(f[0]-360)*q,y:85+(315-f[1])*q,r:10};}
    if(oc.how==='bowled'||oc.how==='run out')return {x:360,y:85-q*20,r:10};
    return {x:360,y:85,r:10};
  }
  if(oc.runs===0)return {x:360,y:85-q*35,r:10};
  if(oc.runs===6)return {x:360+(anim.boundaryPt[0]-360)*q*1.4,y:85+q*260,r:10+q*7};
  if(oc.runs===4)return {x:360+(anim.boundaryPt[0]-360)*q,y:85+(315-anim.boundaryPt[1])*q,r:10};
  const f=anim.fieldFielder;return {x:360+(f[0]-360)*q,y:85+(315-f[1])*q,r:10};
}
const grassImg=new Image();grassImg.src='grass.jpg';
const sprBatStance=new Image();sprBatStance.src='bat-stance.png';
const sprBatSwing=new Image();sprBatSwing.src='bat-swing.png';
const sprBowl=new Image();sprBowl.src='bowl-runup.png';
function drawSprite(c,img,x,yFeet,h,alpha){
  if(!img.complete||!img.naturalWidth)return false;
  const w=h*(img.naturalWidth/img.naturalHeight);
  c.save();if(alpha!==undefined)c.globalAlpha=alpha;
  c.drawImage(img,x-w/2,yFeet-h,w,h);c.restore();return true;}
const crowdImg=new Image();crowdImg.src='crowd.jpg';
function pitchHalfW(y){return (44+(96-44)*(y-40)/330)/2;}
function drawFrame(now){
  now=now||performance.now();
  const cv=$('field');if(!cv)return;const c=cv.getContext('2d');
  const inn=M&&M.innings?M.innings[M.inn-1]:null;
  const batCol=inn?inn.batTeam.color:'#1e5aff', bowlCol=inn?inn.bowlTeam.color:'#cc0000';
  const batKit=inn?kitFor(inn.batTeam):{kit:batKit.kit,accent:batKit.accent,pattern:batKit.pattern,pants:batKit.pants,accent:'#ffffff',pattern:'band',pants:batCol};
  const bowlKit=inn?kitFor(inn.bowlTeam):{kit:bowlKit.kit,accent:bowlKit.accent,pattern:bowlKit.pattern,pants:bowlKit.pants,accent:'#ffffff',pattern:'band',pants:bowlCol};
  const ocR=(anim&&anim.phase==='result')?resultOutcome():null;
  const qR=(anim&&anim.phase==='result')?Math.min(1,(now-anim.t0)/2200):0;
  // ---- follow-cam: camera tracks the ball wherever it goes ----
  c.save();
  const bpCam=ballXY(now);
  if(bpCam){
    let zm=1, px=0, py=0;
    if(anim){
      if(anim.phase==='runup'){zm=1.02;px=(bpCam.x-360)*0.20;py=(bpCam.y-200)*0.20;}
      else if(anim.phase==='deliver'){zm=1.03;}
      else if(anim.phase==='travel'){const p=Math.min(1,(now-anim.t0)/1600);zm=1+0.10*p;px=(bpCam.x-360)*0.30;py=(bpCam.y-200)*0.30;}
      else if(anim.phase==='result'){zm=1+0.12*qR;px=(bpCam.x-360)*0.35;py=(bpCam.y-200)*0.35;}
    }
    if(anim&&anim.phase==='result'&&ocR&&ocR.out&&qR<0.2){px+=(Math.random()*6-3);py+=(Math.random()*6-3);}
    px=Math.max(-50,Math.min(50,px));py=Math.max(-40,Math.min(40,py));
    c.translate(360+px,200+py);c.scale(zm,zm);c.translate(-360,-200);
  }
  // ---- real ground texture ----
  if(grassImg.complete&&grassImg.naturalWidth>0){c.drawImage(grassImg,-60,-50,840,500);}
  else{
    const g=c.createLinearGradient(0,36,0,400);g.addColorStop(0,'#3d8b4f');g.addColorStop(1,'#2a6e38');
    c.fillStyle=g;c.fillRect(-60,-50,840,500);
  }
  // ---- real stadium crowd strip ----
  if(crowdImg.complete&&crowdImg.naturalWidth>0){c.drawImage(crowdImg,-60,-20,840,56);}
  else{
    c.fillStyle='#0f2a1d';c.fillRect(-60,-20,840,56);
    CROWD.forEach(d=>{c.fillStyle=d[2];c.beginPath();c.arc(d[0],d[1],2.5,0,Math.PI*2);c.fill();});
  }
  // boundary
  c.strokeStyle='#e8f5e9';c.lineWidth=3;c.beginPath();c.ellipse(360,215,335,178,0,0,Math.PI*2);c.stroke();
  // ---- perspective pitch (wide near camera, narrow far away) ----
  c.fillStyle='#d9c49a';
  c.beginPath();c.moveTo(338,40);c.lineTo(382,40);c.lineTo(408,370);c.lineTo(312,370);c.closePath();c.fill();
  c.fillStyle='rgba(0,0,0,0.06)';
  c.beginPath();c.ellipse(360,200,20,60,0,0,Math.PI*2);c.fill();
  c.beginPath();c.ellipse(360,300,26,30,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#ffffff';c.lineWidth=2;
  c.beginPath();c.moveTo(360-pitchHalfW(72),72);c.lineTo(360+pitchHalfW(72),72);c.stroke();
  c.beginPath();c.moveTo(360-pitchHalfW(330),330);c.lineTo(360+pitchHalfW(330),330);c.stroke();
  // stumps
  let broken=false;
  if(anim&&anim.phase==='result'){
    const oc=resultOutcome(), q=Math.min(1,(now-anim.t0)/2200);
    if(oc&&oc.out&&(oc.how==='bowled'||oc.how==='run out')&&q>0.3)broken=true;
  }
  drawStumpsAt(c,360,342,1.1,false);
  drawStumpsAt(c,360,64,0.8,broken);
  // fielders
  FIELDERS.forEach(f=>{
    let fx=f[0], fy=400-f[1], jump=0;
    if(anim&&anim.phase==='result'&&ocR){
      if(ocR.runs===4&&anim.chaseFielder===f){
        const b=ballXY(now);fx=f[0]+(b.x-f[0])*qR*0.45;fy=fy+(b.y-fy)*qR*0.45;
      }
      if(ocR.out&&ocR.how==='caught'&&anim.catchFielder===f&&qR>0.5)jump=8*Math.sin((qR-0.5)/0.5*Math.PI);
    }
    const s=0.85+(fy/400)*0.5;
    drawFigure(c,{x:fx,y:fy,s:s,kit:bowlKit.kit,accent:bowlKit.accent,pattern:bowlKit.pattern,pants:bowlKit.pants,skin:'#c68642',cap:true,leg:0,jump:jump});
  });
  // keeper
  drawFigure(c,{x:360,y:46,s:0.6,kit:bowlKit.kit,accent:bowlKit.accent,pattern:bowlKit.pattern,pants:bowlKit.pants,skin:'#8d5524',cap:true,leg:0});
  // batsmen positions (running between wickets during result)
  let batY=320, nsY=140;
  if(anim&&anim.phase==='result'&&ocR&&!ocR.out&&ocR.runs>=1&&ocR.runs<=3){
    const prog=qR*ocR.runs, seg=Math.floor(prog), fr=prog-seg;
    if(seg%2===0){batY=320-180*fr;nsY=140+180*fr;}
    else{batY=140+180*fr;nsY=320-180*fr;}
  }
  const batRec=inn?inn.batsmen[inn.striker]:null, nsRec=inn?inn.batsmen[inn.nonStriker]:null;
  const batScrY=400-batY, nsScrY=400-nsY;
  const batSprH=60+batScrY*0.20, nsSprH=60+nsScrY*0.20;
  // non-striker (top end) — realistic sprite, code figure fallback
  if(!drawSprite(c,sprBatStance,300,nsScrY,nsSprH))
    drawFigure(c,{x:300,y:nsScrY,s:0.85+(nsScrY/400)*0.5,kit:batKit.kit,accent:batKit.accent,pattern:batKit.pattern,pants:batKit.pants,skin:nsRec?skinFor(nsRec.p.n):'#ffdbac',helmet:true,pads:true,bat:-0.5,leg:0});
  // striker batsman — realistic sprite, swing crossfades stance -> swing
  let batAngle=-0.5, swung=false;
  if(anim&&anim.swingT){
    const sp=Math.max(0,Math.min(1,(now-anim.swingT)/600));
    const magSrc=anim.kind==='bat'?anim.shot:(anim.pre?anim.pre.agg:'normal');
    const mag={defend:0.7,normal:1,attack:1.2,loft:1.4}[magSrc||'normal'];
    batAngle=-0.5-(1-Math.pow(1-sp,2))*2.3*mag;
    if(sprBatStance.complete&&sprBatStance.naturalWidth){
      drawSprite(c,sprBatStance,360,batScrY,batSprH,1-sp);
      drawSprite(c,sprBatSwing,360,batScrY,batSprH,sp);
      swung=true;
    }
  }
  if(!swung){
    if(!drawSprite(c,sprBatStance,360,batScrY,batSprH))
      drawFigure(c,{x:360,y:batScrY,s:0.85+(batScrY/400)*0.5,kit:batKit.kit,accent:batKit.accent,pattern:batKit.pattern,pants:batKit.pants,skin:batRec?skinFor(batRec.p.n):'#ffdbac',helmet:true,pads:true,bat:batAngle,leg:0});
  }
  // bowler
  let bowY=115, bowLeg=0, bowArm=null, bowBall=false;
  if(anim){
    if(anim.phase==='runup'){const p=Math.min(1,(now-anim.t0)/1500);bowY=25+p*90;bowLeg=(now-anim.t0)*0.03;bowBall=true;}
    else if(anim.phase==='deliver'){const p=Math.min(1,(now-anim.t0)/450);bowArm=-2.6+p*3.3;bowBall=p<0.85;}
    else bowArm=0.9;
  }
  const bowlRec=inn?curBowler():null;
  const bowScrY=400-bowY, bowH=60+bowScrY*0.08;
  if(!drawSprite(c,sprBowl,360,bowScrY,bowH))
    drawFigure(c,{x:360,y:bowScrY,s:0.85+(bowScrY/400)*0.5,kit:bowlKit.kit,accent:bowlKit.accent,pattern:bowlKit.pattern,pants:bowlKit.pants,skin:bowlRec?skinFor(bowlRec.p.n):'#ffdbac',cap:true,leg:bowLeg,arm:bowArm,ball:bowBall});
  // umpire (pink, behind bowler's stumps, like TV)
  drawFigure(c,{x:330,y:378,s:1.1,kit:'#ec4899',pants:'#1f2937',skin:'#8d5524',cap:true,leg:0});
  // ball
  const bp=ballXY(now);
  if(bp){
    c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.ellipse(bp.x,bp.y+10,bp.r*1.2,bp.r*0.4,0,0,Math.PI*2);c.fill();
    if(anim&&anim.phase==='travel'){const p=Math.min(1,(now-anim.t0)/1600);[0.09,0.18].forEach((dp,i)=>{const pp=Math.max(0,p-dp);const tx=360+(anim.extra?55*pp:0);const ty=280-195*pp;c.fillStyle=i===0?'rgba(255,23,68,0.35)':'rgba(255,23,68,0.18)';c.beginPath();c.arc(tx,ty,bp.r*0.7,0,Math.PI*2);c.fill();});}
    c.fillStyle='#ff1744';c.beginPath();c.arc(bp.x,bp.y,bp.r,0,Math.PI*2);c.fill();
    c.strokeStyle='#ffffff';c.lineWidth=2;c.beginPath();c.arc(bp.x,bp.y,bp.r,0,Math.PI*2);c.stroke();
    c.fillStyle='#ffffff';c.beginPath();c.arc(bp.x-bp.r*0.3,bp.y-bp.r*0.3,bp.r*0.3,0,Math.PI*2);c.fill();
  }
  c.restore();
  // labels (fixed, outside camera move)
  c.fillStyle='#ffffff';c.font='bold 15px system-ui';c.textAlign='left';
  if(inn){c.fillText(inn.batTeam.name,16,54);c.fillText(inn.bowlTeam.name,16,392);}
  c.font='13px system-ui';c.fillStyle='#e8f5e9';c.textAlign='right';
  if(inn&&bowlRec)c.fillText('🎳 '+bowlRec.p.n,704,392);
  if(inn&&batRec)c.fillText('🏏 '+batRec.p.n,704,54);
  c.textAlign='left';
}

function drawScene(){drawFrame();}

// ===== Init =====
renderTeams();updatePlayBtn();
