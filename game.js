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
function beep(f,d,type='sine',v=0.15){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();
 const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;
 g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+d);
 o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}catch(e){}}
function cheer(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();
 const len=AC.sampleRate*0.8,buf=AC.createBuffer(1,len,AC.sampleRate),d=buf.getChannelData(0);
 for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);
 const s=AC.createBufferSource(),g=AC.createGain();s.buffer=buf;g.gain.value=0.25;
 s.connect(g);g.connect(AC.destination);s.start();}catch(e){}}
function crack(){beep(180,0.12,'square',0.2);beep(90,0.15,'triangle',0.2);}
function sadTrombone(){beep(220,0.4,'sawtooth',0.12);setTimeout(()=>beep(175,0.5,'sawtooth',0.12),350);}

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
 });}
function updatePlayBtn(){
 const b=$('btn-play');
 if(userTeam&&oppTeam&&userTeam!==oppTeam){b.disabled=false;b.textContent=`▶ Play: ${userTeam.name} vs ${oppTeam.name}`;}
 else{b.disabled=true;b.textContent=userTeam===oppTeam&&userTeam?'Pick two DIFFERENT teams':'Select both teams to continue';}}
document.querySelectorAll('#overs-row .pill').forEach(p=>p.onclick=()=>{
 document.querySelectorAll('#overs-row .pill').forEach(x=>x.classList.remove('active'));
 p.classList.add('active');overs=+p.dataset.overs;});
$('btn-play').onclick=()=>{
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
$('btn-start-match').onclick=()=>{startMatch();};

// ===== Match engine =====
function attackOf(team){return [...team.players].filter(p=>p.bowl>=40).sort((a,b)=>b.bowl-a.bowl).slice(0,5);}
function newInnings(batTeam,bowlTeam,target){
 const atk=attackOf(bowlTeam);
 return {batTeam,bowlTeam,target,score:0,wkts:0,balls:0,
  batsmen:batTeam.players.map(p=>({p,runs:0,balls:0,fours:0,sixes:0,out:false,howOut:''})),
  striker:0,nonStriker:1,nextIdx:2,
  bowlers:atk.map(p=>({p,balls:0,runs:0,wkts:0})),
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
 $('sb-bat-team').textContent=bat.name;
 $('sb-score').textContent=`${inn.score}/${inn.wkts}`;
 $('sb-vs').textContent=`vs ${bowl.name}`;
 $('sb-overs').textContent=`Overs ${fmtOvers(inn.balls)}/${overs}`;
 const rr=inn.balls?((inn.score/(inn.balls/6))).toFixed(2):'0.00';
 $('sb-rr').textContent=`RR ${rr}`;
 $('sb-target').textContent=inn.target?`Target ${inn.target} • Need ${Math.max(0,inn.target-inn.score)} off ${Math.max(0,overs*6-inn.balls)}`:'';
 const s=inn.batsmen[inn.striker],ns=inn.batsmen[inn.nonStriker];
 $('sb-striker').textContent=s?`${s.p.n}* ${s.runs} (${s.balls})`:'';
 $('sb-nonstriker').textContent=ns?`${ns.p.n} ${ns.runs} (${ns.balls})`:'';
 const b=curBowler();
 $('sb-bowler').textContent=b?`🎳 ${b.p.n} ${fmtOvers(b.balls)} ov • ${b.runs} runs • ${b.wkts} wkts`:'';
 const userBatting=(bat===userTeam);
 $('bat-controls').classList.toggle('hidden',!userBatting||inn.done);
 $('bowl-controls').classList.toggle('hidden',userBatting||inn.done);
 renderScorecard();}
function renderScorecard(){
 const inn=M.innings[M.inn-1];let h=`<b>${inn.batTeam.name} — ${inn.score}/${inn.wkts} (${fmtOvers(inn.balls)} ov)</b><br>`;
 inn.batsmen.forEach((b,i)=>{
   if(i>inn.nextIdx-1&&!b.out&&i!==inn.striker&&i!==inn.nonStriker)return;
   if(b.balls===0&&!b.out&&i!==inn.striker&&i!==inn.nonStriker)return;
   h+=`${b.p.n} ${b.out?b.howOut:'not out'} — ${b.runs} (${b.balls}) 4s:${b.fours} 6s:${b.sixes}<br>`;});
 h+='<br><b>Bowling</b><br>';
 inn.bowlers.forEach(b=>{if(b.balls>0)h+=`${b.p.n} ${fmtOvers(b.balls)}-${b.runs}-${b.wkts}<br>`;});
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
 if(extraLabel){inn.score+=extraRuns;b.runs+=extraRuns;say(`⚠️ ${extraLabel} — +${extraRuns} run.`);renderAll();return 'extra';}
 inn.balls++;b.balls++;inn.overBalls++;
 s.balls++;
 if(res.out){
   inn.wkts++;b.wkts++;s.out=true;s.howOut=res.how+` (b ${b.p.n})`;
   inn.fow.push(`${inn.score}/${inn.wkts} — ${s.p.n}`);
   say(`☝️ WICKET! ${s.p.n} ${res.how} by ${b.p.n}. ${inn.batTeam.name} ${inn.score}/${inn.wkts}`);
   sadTrombone();bigText('WICKET! ☝️');
   if(inn.wkts>=10||inn.nextIdx>=11){/* all out handled below */ }
   else{inn.striker=inn.nextIdx++; }
 } else {
   inn.score+=res.runs;b.runs+=res.runs;s.runs+=res.runs;
   if(res.runs===4){s.fours++;crack();cheer();bigText('FOUR! 💥');}
   else if(res.runs===6){s.sixes++;crack();cheer();bigText('SIX! 🚀');}
   else if(res.runs>0)crack();
   say(`🎳 ${b.p.n} to ${s.p.n}: ${outcomeText(res.runs,false)} ${inn.batTeam.name} ${inn.score}/${inn.wkts}`);
   if(res.runs%2===1){const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;}
 }
 if(inn.overBalls>=6){inn.overBalls=0;
   const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;
   inn.prevBowler=inn.bowlerIdx;
   do{inn.bowlerIdx=(inn.bowlerIdx+1)%inn.bowlers.length;}while(inn.bowlerIdx===inn.prevBowler&&inn.bowlers.length>1);}
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
$('btn-bowl-ball').onclick=()=>{
 if(ballBusy)return;ballBusy=true;hitTiming=null;
 $('timing-box').classList.remove('hidden');$('btn-hit').classList.remove('hidden');
 $('btn-bowl-ball').disabled=true;
 const t0=performance.now(),DUR=1000;
 const step=(t)=>{
   const p=Math.min(1,(t-t0)/DUR);
   $('timing-needle').style.left=(p*100)+'%';
   drawScene(p);
   if(p<1&&ballBusy)sweepRAF=requestAnimationFrame(step);
   else finishBattingBall();};
 sweepRAF=requestAnimationFrame(step);};
$('btn-hit').onclick=()=>{
 if(!ballBusy)return;
 const left=parseFloat($('timing-needle').style.left)||0;
 hitTiming=left;$('btn-hit').classList.add('hidden');
 beep(600,0.08,'square',0.1);};
function timingQuality(){
 if(hitTiming===null)return 'miss';
 if(hitTiming>=45&&hitTiming<=55)return 'perfect';
 if(hitTiming>=30&&hitTiming<=70)return 'good';
 return hitTiming<45?'early':'late';}
function finishBattingBall(){
 ballBusy=false;$('timing-box').classList.add('hidden');$('btn-hit').classList.add('hidden');
 $('btn-bowl-ball').disabled=false;
 const inn=M.innings[M.inn-1];
 // extras
 const r=Math.random();
 if(r<0.05){applyBall(null,1,'Wide ball');checkInningsEnd();return;}
 if(r<0.08){applyBall(null,1,'No ball');checkInningsEnd();return;}
 const res=battingOutcome(shot,timingQuality(),strikerRec().p,curBowler().p);
 const tq=timingQuality();
 if(tq==='perfect')say('⏱️ Perfect timing!');
 applyBall(res,0,null);
 if(!checkInningsEnd())nextBallPrompt();}
// ----- User bowling -----
document.querySelectorAll('.delivery').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.delivery').forEach(x=>x.classList.remove('active'));b.classList.add('active');delivery=b.dataset.del;});
$('btn-bowl-delivery').onclick=()=>{
 if(ballBusy)return;ballBusy=true;$('btn-bowl-delivery').disabled=true;
 const t0=performance.now(),DUR=800;
 const step=(t)=>{const p=Math.min(1,(t-t0)/DUR);drawScene(p);
   if(p<1)sweepRAF=requestAnimationFrame(step);else finishBowlingBall();};
 sweepRAF=requestAnimationFrame(step);};
function finishBowlingBall(){
 ballBusy=false;$('btn-bowl-delivery').disabled=false;
 const inn=M.innings[M.inn-1];
 const r=Math.random();
 if(r<0.05){applyBall(null,1,'Wide ball');checkInningsEnd();return;}
 if(r<0.08){applyBall(null,1,'No ball');checkInningsEnd();return;}
 // AI batsman aggression
 let agg='normal';const a=Math.random();
 const chasing=inn.target&&inn.target-inn.score>0;
 if(chasing&&inn.balls>0){const req=(inn.target-inn.score)/((overs*6-inn.balls)/6);
   if(req>10)agg=a<0.5?'attack':a<0.8?'loft':'normal';
   else agg=a<0.25?'defend':a<0.65?'normal':a<0.85?'attack':'loft';
 } else agg=a<0.2?'defend':a<0.6?'normal':a<0.85?'attack':'loft';
 let res=battingOutcome(agg,'good',strikerRec().p,curBowler().p);
 // delivery modifiers
 if(delivery==='yorker'){if(res.runs===4||res.runs===6){if(Math.random()<0.5)res={runs:0,out:false,how:''};}
   if(!res.out&&Math.random()<0.08)res={runs:0,out:true,how:'bowled'};}
 if(delivery==='slower'&&agg==='attack'&&!res.out&&Math.random()<0.25)res={runs:6,out:false,how:''};
 if(delivery==='spin'&&strikerRec().p.bat<80&&Math.random()<0.12)res={runs:0,out:true,how:'caught'};
 say(`🤖 AI plays ${agg} vs your ${delivery}.`);
 applyBall(res,0,null);
 if(!checkInningsEnd())nextBallPrompt();}
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
 cheer();showScreen('screen-result');}
$('btn-rematch').onclick=()=>{startMatch();};
$('btn-new-teams').onclick=()=>{userTeam=null;oppTeam=null;renderTeams();updatePlayBtn();showScreen('screen-home');};

// ===== Canvas scene =====
function drawScene(p){
 const cv=$('field');if(!cv)return;const c=cv.getContext('2d');
 const inn=M&&M.innings?M.innings[M.inn-1]:null;
 const batCol=inn?inn.batTeam.color:'#1e5aff', bowlCol=inn?inn.bowlTeam.color:'#cc0000';
 // outfield
 const g=c.createLinearGradient(0,0,0,400);g.addColorStop(0,'#3d8b4f');g.addColorStop(1,'#2f7a3d');
 c.fillStyle=g;c.fillRect(0,0,720,400);
 // boundary
 c.strokeStyle='#e8f5e9';c.lineWidth=3;c.beginPath();c.ellipse(360,200,330,175,0,0,Math.PI*2);c.stroke();
 // pitch
 c.fillStyle='#d9c49a';c.fillRect(330,30,60,340);
 c.fillStyle='#c9b184';c.fillRect(330,30,60,340);
 c.strokeStyle='#fff';c.lineWidth=2;
 c.strokeRect(330,60,60,6);c.strokeRect(330,334,60,6);
 // stumps
 const stumps=(y)=>{c.strokeStyle='#ffd700';c.lineWidth=3;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(360+i*8,y);c.lineTo(360+i*8,y+12);c.stroke();}};
 stumps(52);stumps(336);
 // fielders (bowling team colour dots)
 const fielders=[[120,120],[600,120],[180,260],[540,260],[360,180],[90,320],[630,320]];
 c.fillStyle=bowlCol;fielders.forEach(f=>{c.beginPath();c.arc(f[0],f[1],10,0,Math.PI*2);c.fill();
   c.fillStyle='#ffdbac';c.beginPath();c.arc(f[0],f[1]-2,4,0,Math.PI*2);c.fill();c.fillStyle=bowlCol;});
 // bowler avatar (top)
 const bx=360,by=70;
 c.fillStyle=bowlCol;c.beginPath();c.roundRect(bx-14,by,28,44,8);c.fill();
 c.fillStyle='#ffdbac';c.beginPath();c.arc(bx,by-6,11,0,Math.PI*2);c.fill();
 c.fillStyle='#222';c.beginPath();c.arc(bx,by-10,11,0,Math.PI);c.fill();
 // batsman avatar (bottom, batting team kit)
 const px=360,py=300;
 c.fillStyle=batCol;c.beginPath();c.roundRect(px-14,py,28,44,8);c.fill();
 c.fillStyle='#ffdbac';c.beginPath();c.arc(px,py-6,11,0,Math.PI*2);c.fill();
 c.fillStyle='#222';c.beginPath();c.arc(px,py-10,11,0,Math.PI);c.fill();
 // bat
 c.save();c.translate(px+18,py+10);c.rotate(-0.5);c.fillStyle='#8b5a2b';c.fillRect(0,0,7,34);c.restore();
 // ball
 if(p!==undefined&&p!==null){
   const sx=360,sy=95,ex=360,ey=300;
   const x=sx+(ex-sx)*p+Math.sin(p*Math.PI)*30*(p<0.5?1:-1)*0.3;
   const y=sy+(ey-sy)*p;
   c.fillStyle='#ff1744';c.beginPath();c.arc(x,y,8,0,Math.PI*2);c.fill();
   c.fillStyle='#fff';c.beginPath();c.arc(x-2,y-2,2.5,0,Math.PI*2);c.fill();}
 // labels
 c.fillStyle='#fff';c.font='bold 15px system-ui';
 if(inn){c.fillText(inn.bowlTeam.name,16,26);c.fillText(inn.batTeam.name,16,390);}
 c.font='13px system-ui';c.fillStyle='#e8f5e9';
 if(inn&&inn.batsmen[inn.striker])c.fillText('🏏 '+inn.batsmen[inn.striker].p.n,430,390);}

// ===== Init =====
renderTeams();updatePlayBtn();
