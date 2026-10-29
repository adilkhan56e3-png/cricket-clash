// ===== Cricket Clash 3D — match engine (DOM-free, pure logic) =====
// Teams: 15 current international squads, real names/roles/skills.
// Player likenesses are NOT used: in-game athletes are original procedural
// 3D models wearing team kits, never real photos or scanned athletes.
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

export {TEAMS};
export const pick=a=>a[Math.floor(Math.random()*a.length)];
export function weightedPick(w){let t=0;for(const k in w)t+=w[k];let r=Math.random()*t;for(const k in w){r-=w[k];if(r<=0)return k;}return '0';}
export const fmtOvers=b=>Math.floor(b/6)+'.'+(b%6);

export function createMatch(userTeam,oppTeam,overs){
  return {userTeam,oppTeam,overs,innings:[],inn:0,tossWinner:null,userBatsFirst:null,result:null,mom:null};
}
export function startInnings(M,batTeam,bowlTeam,target){
  const inn={batTeam,bowlTeam,score:0,wkts:0,balls:0,overBalls:0,target:target||null,
    batsmen:batTeam.players.slice(0,11).map(p=>({p,runs:0,balls:0,fours:0,sixes:0,out:false,howOut:''})),
    striker:0,nonStriker:1,nextIdx:2,
    bowlers:bowlTeam.players.filter(p=>p.r==='BOWL'||p.r==='AR').map(p=>({p,balls:0,runs:0,wkts:0,maidens:0})),
    lastBowler:null,overBowler:null,extras:{runs:0,wides:0,noballs:0,byes:0,legbyes:0},fow:[],overStartRuns:0};
  M.innings.push(inn);M.inn=M.innings.length;return inn;
}
export function curBowler(inn){
  if(!inn.overBowler){
    const opts=inn.bowlers.filter(b=>b!==inn.lastBowler);
    inn.overBowler=opts.length?pick(opts):inn.bowlers[0];
  }
  return inn.overBowler;
}
export function strikerRec(inn){return inn.batsmen[inn.striker];}
export function nonStrikerRec(inn){return inn.batsmen[inn.nonStriker];}

// Timing-based batting outcome. timing: 'perfect'|'good'|'early'|'late'|'miss'|null(AI)
// delivery (optional): the ball type, used for stumped chances on spin.
export function battingOutcome(bat,bowl,timing,shot,delivery){
  const w={0:22,1:26,2:8,3:2,4:16,6:8,W:10};
  const edge=(bat-bowl)/100;
  w[4]=Math.max(2,w[4]+edge*14);w[6]=Math.max(1,w[6]+edge*10);w.W=Math.max(3,w.W-edge*8);
  if(shot==='loft'){w[6]+=6;w.W+=5;w[1]-=4;}
  if(shot==='defend'){w[0]+=14;w[4]-=8;w[6]-=5;w.W-=3;}
  if(shot==='cut'||shot==='pull'){w[4]+=4;}
  if(timing==='perfect'){w[4]+=9;w[6]+=7;w.W=Math.max(1,w.W-7);}
  else if(timing==='good'){w[4]+=3;w[6]+=2;}
  else if(timing==='early'||timing==='late'){w.W+=9;w[4]=Math.max(0,w[4]-5);w[6]=Math.max(0,w[6]-3);}
  else if(timing==='miss'){
    // Ball beats the bat: stumped (spin), byes/leg-byes (ball passes keeper),
    // or bowled. Byes are extras: not charged to bowler or batsman.
    if(delivery==='spin'&&Math.random()<0.10)return {runs:0,out:true,how:'stumped'};
    if(Math.random()<0.12){const runs=+weightedPick({1:5,2:2,3:1,4:2});
      return {runs,out:false,how:'',byes:true,byeType:Math.random()<0.5?'byes':'legbyes'};}
    return {runs:0,out:Math.random()<0.2,how:'bowled'};
  }
  const k=weightedPick(w);
  if(k==='W')return {runs:0,out:true,how:pick(['bowled','caught','LBW','run out'])};
  return {runs:+k,out:false,how:''};
}
// AI batting outcome (used when the user bowls)
export function aiBattingOutcome(bat,bowl,delivery){
  const agg=bat>=80?'attack':(bat>=70?'normal':'defend');
  let res;
  if(delivery==='yorker'){res=Math.random()<0.10?{runs:0,out:true,how:'bowled'}:battingOutcome(bat,bowl,null,'normal');}
  else if(delivery==='bouncer'){res=Math.random()<0.12?{runs:0,out:true,how:'caught'}:battingOutcome(bat,bowl,null,Math.random()<0.5?'pull':'normal');}
  else if(delivery==='slower'){res=Math.random()<0.10?{runs:0,out:true,how:'caught'}:battingOutcome(bat,bowl,null,'attack');}
  else if(delivery==='spin'){
    if(bat<80&&Math.random()<0.08)res={runs:0,out:true,how:'stumped'};
    else if(bat<80&&Math.random()<0.12)res={runs:0,out:true,how:'caught'};
    else res=battingOutcome(bat,bowl,null,'normal');
  }
  else res=battingOutcome(bat,bowl,null,agg==='attack'?'attack':'normal');
  // Occasional bye: ball beats bat and keeper on a dot ball.
  if(!res.out&&res.runs===0&&Math.random()<0.05)
    return {runs:1,out:false,how:'',byes:true,byeType:'byes'};
  return res;
}
export function speedFor(delivery){
  const r=(a,b)=>Math.round(a+Math.random()*(b-a));
  return {fast:r(136,146),swing:r(128,138),seam:r(130,140),yorker:r(138,145),bouncer:r(140,148),slower:r(106,118),spin:r(76,88)}[delivery]||r(125,140);
}

// Apply one legal delivery. Returns an event describing it.
export function applyBall(M,res,extraRuns,extraLabel){
  const inn=M.innings[M.inn-1],b=curBowler(inn),s=strikerRec(inn);
  if(extraLabel){
    inn.score+=extraRuns;b.runs+=extraRuns;inn.extras.runs+=extraRuns;
    if(extraLabel.toLowerCase().includes('wide'))inn.extras.wides++;else inn.extras.noballs++;
    return {extra:true,label:extraLabel,runs:extraRuns};
  }
  inn.balls++;b.balls++;inn.overBalls++;s.balls++;
  if(inn.overBalls===1)inn.overStartRuns=inn.score;
  const ev={runs:res.runs,out:!!res.out,how:res.how||'',howTxt:'',bowler:b,newBatsman:null,overComplete:false,inningsOver:false,outBatter:res.out?s.p.n:null};
  if(res.out){
    inn.wkts++;b.wkts++;s.out=true;
    if(res.how==='bowled')ev.howTxt=`b ${b.p.n}`;
    else if(res.how==='LBW')ev.howTxt=`lbw b ${b.p.n}`;
    else if(res.how==='stumped'){const kp=inn.bowlTeam.players.find(pp=>pp.r==='WK');ev.howTxt=`st ${kp?kp.n:'Keeper'} b ${b.p.n}`;}
    else if(res.how==='run out')ev.howTxt=`run out (${b.p.n})`;
    else if(res.how==='caught'){const opts=inn.bowlTeam.players.filter(pp=>pp!==b.p);const cf=pick(opts);ev.howTxt=`c ${cf.n} b ${b.p.n}`;ev.catcher=cf.n;}
    else ev.howTxt=res.how;
    s.howOut=ev.howTxt;
    inn.fow.push({score:inn.score,wkts:inn.wkts,batter:s.p.n,overs:fmtOvers(inn.balls)});
    if(inn.wkts>=10||inn.nextIdx>=11){ev.inningsOver=true;}
    else{inn.striker=inn.nextIdx++;ev.newBatsman=inn.batsmen[inn.striker];}
  } else if(res.byes){
    // Byes / leg-byes: runs count for the team and extras, never for
    // the batsman or the bowler. Strike still rotates on odd runs.
    inn.score+=res.runs;inn.extras.runs+=res.runs;
    if(res.byeType==='legbyes')inn.extras.legbyes+=res.runs;else inn.extras.byes+=res.runs;
    ev.byes=true;ev.byeType=res.byeType||'byes';
    if(res.runs%2===1){const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;}
  } else {
    inn.score+=res.runs;b.runs+=res.runs;s.runs+=res.runs;
    if(res.runs===4)s.fours++;
    if(res.runs===6)s.sixes++;
    if(res.runs%2===1){const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;}
  }
  if(inn.overBalls===6){
    inn.overBalls=0;ev.overComplete=true;
    if(inn.score===inn.overStartRuns){const bb=inn.bowlers.find(x=>x===b);if(bb)bb.maidens++;}
    const t=inn.striker;inn.striker=inn.nonStriker;inn.nonStriker=t;
    inn.lastBowler=b;inn.overBowler=null;
  }
  if(inn.balls>=M.overs*6)ev.inningsOver=true;
  if(inn.target!==null&&inn.score>=inn.target)ev.inningsOver=true;
  return ev;
}
export function inningsSummary(inn){
  const rr=inn.balls?((inn.score/inn.balls)*6).toFixed(2):'0.00';
  return {score:inn.score,wkts:inn.wkts,overs:fmtOvers(inn.balls),rr};
}
export function manOfMatch(M){
  let best=null,bestPts=-1;
  M.innings.forEach(inn=>{inn.batsmen.forEach(b=>{const pts=b.runs+b.fours*2+b.sixes*4;if(pts>bestPts){bestPts=pts;best=b;}});inn.bowlers.forEach(b=>{const pts=b.wkts*25;if(pts>bestPts){bestPts=pts;best=b;}});});
  return best?best.p:null;
}
