// ===== Cricket Clash 3D — Three.js presentation + game flow =====
// Real 3D stadium, procedural 3D athletes (original models, team kits),
// broadcast cameras, full match engine from engine.js.
import * as THREE from 'three';
import {TEAMS, createMatch, startInnings, curBowler, strikerRec, nonStrikerRec,
  battingOutcome, aiBattingOutcome, applyBall, speedFor, fmtOvers, manOfMatch} from './engine.js';
window.__cc3d_loaded = true;
const $=id=>document.getElementById(id);
const showScreen=id=>{document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');};
const initials=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

// ---------- Audio ----------
let AC=null, soundOn=true, crowdGain=null;
function unlockAudio(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();
  const len=AC.sampleRate*2, buf=AC.createBuffer(1,len,AC.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
  const src=AC.createBufferSource();src.buffer=buf;src.loop=true;
  const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=400;
  crowdGain=AC.createGain();crowdGain.gain.value=0.035;
  src.connect(f);f.connect(crowdGain);crowdGain.connect(AC.destination);src.start();
}catch(e){}}
function beep(f=660,t=0.08){if(!AC||!soundOn)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.setValueAtTime(0.08,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+t);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+t);}
function crack(){if(!AC||!soundOn)return;const len=AC.sampleRate*0.12,buf=AC.createBuffer(1,len,AC.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const s=AC.createBufferSource();s.buffer=buf;const g=AC.createGain();g.gain.value=0.25;s.connect(g);g.connect(AC.destination);s.start();}
function cheer(){if(!AC||!soundOn||!crowdGain)return;const t=AC.currentTime;crowdGain.gain.cancelScheduledValues(t);crowdGain.gain.setValueAtTime(0.035,t);crowdGain.gain.linearRampToValueAtTime(0.14,t+0.3);crowdGain.gain.linearRampToValueAtTime(0.035,t+2.5);}
function speak(txt){if(!soundOn||!('speechSynthesis' in window))return;try{const u=new SpeechSynthesisUtterance(txt);u.rate=1.05;speechSynthesis.speak(u);}catch(e){}}
function say(txt){const tk=$('ticker');if(tk)tk.textContent=txt;const ul=$('commentary-list');const li=document.createElement('li');li.textContent=txt;ul.prepend(li);while(ul.children.length>40)ul.lastChild.remove();}

// ---------- Three.js setup ----------
const wrap=$('scene-wrap');
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
wrap.appendChild(renderer.domElement);
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x87b5e0);
scene.fog=new THREE.Fog(0x87b5e0,120,240);
const camera=new THREE.PerspectiveCamera(55,1,0.1,500);
camera.position.set(0,7,-30);
const sun=new THREE.DirectionalLight(0xfff2d0,2.2);
sun.position.set(40,60,-20);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);
sun.shadow.camera.left=-80;sun.shadow.camera.right=80;sun.shadow.camera.top=80;sun.shadow.camera.bottom=-80;
scene.add(sun);scene.add(new THREE.AmbientLight(0xffffff,0.55));

// canvas textures
function canvasTex(w,h,draw,rx=1,ry=1){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;return t;}
const grassTex=canvasTex(512,512,(g,w,h)=>{
  g.fillStyle='#3f9e4d';g.fillRect(0,0,w,h);
  for(let i=0;i<8;i++){if(i%2===0){g.fillStyle='#378a43';g.fillRect(0,i*64,w,64);}}
  for(let i=0;i<9000;i++){g.fillStyle=Math.random()<0.5?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.06)';g.fillRect(Math.random()*w,Math.random()*h,2,2);}
},10,10);
const pitchTex=canvasTex(256,512,(g,w,h)=>{
  g.fillStyle='#c9a06b';g.fillRect(0,0,w,h);
  g.fillStyle='#b89a5e';for(let i=0;i<600;i++)g.fillRect(Math.random()*w,Math.random()*h,2,2);
  g.fillStyle='#ffffff';g.fillRect(10,40,w-20,3);g.fillRect(10,h-43,w-20,3);
  g.fillRect(w/2-2,0,4,h);
});
const crowdTex=canvasTex(512,256,(g,w,h)=>{
  g.fillStyle='#1f2937';g.fillRect(0,0,w,h);
  const cols=['#e11d48','#2563eb','#f59e0b','#16a34a','#f8fafc','#7c3aed','#0ea5e9','#f97316'];
  for(let y=0;y<h;y+=8)for(let x=0;x<w;x+=6){g.fillStyle=cols[Math.floor(Math.random()*cols.length)];g.beginPath();g.arc(x+3,y+4,2.6,0,7);g.fill();}
});
// ---------- Stadium ----------
const ground=new THREE.Mesh(new THREE.CircleGeometry(95,64),new THREE.MeshStandardMaterial({map:grassTex,roughness:1}));
ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const pitch=new THREE.Mesh(new THREE.PlaneGeometry(3.2,23),new THREE.MeshStandardMaterial({map:pitchTex,roughness:1}));
pitch.rotation.x=-Math.PI/2;pitch.position.y=0.02;pitch.receiveShadow=true;scene.add(pitch);
const rope=new THREE.Mesh(new THREE.TorusGeometry(62,0.18,8,80),new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.8}));
rope.rotation.x=Math.PI/2;rope.scale.set(1.12,1,1);rope.position.y=0.1;scene.add(rope);
// stands: ring of tiered blocks with crowd faces
for(let i=0;i<10;i++){
  const a=(i/10)*Math.PI*2+0.31;
  const r=80, x=Math.cos(a)*r*1.12, z=Math.sin(a)*r;
  const stand=new THREE.Mesh(new THREE.BoxGeometry(30,9,7),new THREE.MeshStandardMaterial({color:0x334155,roughness:0.9}));
  stand.position.set(x,4.5,z);stand.lookAt(0,0,0);stand.castShadow=true;scene.add(stand);
  const crowd=new THREE.Mesh(new THREE.PlaneGeometry(29,7),new THREE.MeshStandardMaterial({map:crowdTex,roughness:1}));
  crowd.position.set(0,1.2,3.6);stand.add(crowd);
  const roof=new THREE.Mesh(new THREE.BoxGeometry(31,0.6,9),new THREE.MeshStandardMaterial({color:0x0f172a}));
  roof.position.set(0,9.3,0);stand.add(roof);
}
// floodlights
[[-58,-58],[58,-58],[-58,58],[58,58]].forEach(([x,z])=>{
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.7,30,10),new THREE.MeshStandardMaterial({color:0x475569}));
  pole.position.set(x,15,z);pole.castShadow=true;scene.add(pole);
  const head=new THREE.Mesh(new THREE.BoxGeometry(7,4,0.6),new THREE.MeshStandardMaterial({color:0x1e293b,emissive:0xfff7cc,emissiveIntensity:0.9}));
  head.position.set(x,31,z);head.lookAt(0,0,0);scene.add(head);
});
// ---------- Stumps ----------
function makeStumps(){
  const g=new THREE.Group();const wood=new THREE.MeshStandardMaterial({color:0xfde68a});
  const stumps=[];
  for(let i=-1;i<=1;i++){
    const s=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.72,8),wood);
    s.position.set(i*0.11,0.36,0);s.castShadow=true;g.add(s);stumps.push(s);
  }
  const bails=[];
  for(let i=0;i<2;i++){
    const b=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.11,8),wood);
    b.rotation.z=Math.PI/2;b.position.set(i?0.055:-0.055,0.74,0);g.add(b);bails.push(b);
  }
  g.userData={stumps,bails,broken:false,fly:[]};
  return g;
}
const stumpsBat=makeStumps();stumpsBat.position.set(0,0,10);scene.add(stumpsBat);
const stumpsBowl=makeStumps();stumpsBowl.position.set(0,0,-10);scene.add(stumpsBowl);
function breakStumps(g){
  if(g.userData.broken)return;g.userData.broken=true;
  g.userData.stumps.forEach((s,i)=>{s.rotation.x=-0.9-(i*0.15);});
  g.userData.bails.forEach((b,i)=>{g.userData.fly.push({m:b,v:new THREE.Vector3((i?1:-1)*2.5,4.5,1.5),t:0});});
}
function resetStumps(g){
  g.userData.broken=false;g.userData.fly=[];
  g.userData.stumps.forEach(s=>{s.rotation.x=0;});
  g.userData.bails.forEach((b,i)=>{b.position.set(i?0.055:-0.055,0.74,0);b.rotation.z=Math.PI/2;b.visible=true;});
}
// ---------- Procedural 3D athletes ----------
const matC=(c,r=0.9)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
function capsule(r,len,m){const x=new THREE.Mesh(new THREE.CapsuleGeometry(r,len,4,12),m);x.castShadow=true;return x;}
function makeHumanoid({kit,pants,skin,helmet,padder=false}){
  const g=new THREE.Group();
  const kitM=matC(kit),pantsM=matC(pants),skinM=matC(skin),helmM=matC(helmet||kit);
  const hips=new THREE.Group();hips.position.y=0.98;g.add(hips);
  const torso=capsule(0.165,0.42,kitM);torso.position.y=0.36;hips.add(torso);
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(0.30,0.09,0.02),matC(0xffffff));stripe.position.set(0,0.44,0.15);hips.add(stripe);
  const head=new THREE.Group();head.position.y=0.80;hips.add(head);
  const skull=new THREE.Mesh(new THREE.SphereGeometry(0.125,20,16),skinM);skull.castShadow=true;head.add(skull);
  const helm=new THREE.Mesh(new THREE.SphereGeometry(0.148,20,16),helmM);helm.position.y=0.025;helm.castShadow=true;head.add(helm);
  const visor=new THREE.Mesh(new THREE.BoxGeometry(0.17,0.05,0.03),matC(0x1f2937));visor.position.set(0,0.01,0.14);head.add(visor);
  function arm(side){
    const sh=new THREE.Group();sh.position.set(0.25*side,0.60,0);hips.add(sh);
    const up=capsule(0.055,0.26,kitM);up.position.y=-0.15;sh.add(up);
    const el=new THREE.Group();el.position.y=-0.32;sh.add(el);
    const fo=capsule(0.05,0.24,skinM);fo.position.y=-0.14;el.add(fo);
    const gl=new THREE.Mesh(new THREE.SphereGeometry(0.07,12,10),matC(0xffffff));gl.position.y=-0.31;gl.castShadow=true;el.add(gl);
    return {sh,el};
  }
  function leg(side){
    const hp=new THREE.Group();hp.position.set(0.11*side,0,0);hips.add(hp);
    const th=capsule(0.075,0.38,pantsM);th.position.y=-0.21;hp.add(th);
    const kn=new THREE.Group();kn.position.y=-0.44;hp.add(kn);
    const sh2=capsule(0.06,0.38,pantsM);sh2.position.y=-0.21;kn.add(sh2);
    const shoe=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.08,0.24),matC(0x111827));shoe.position.set(0,-0.45,0.04);shoe.castShadow=true;kn.add(shoe);
    if(padder){const pad=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.46,0.06),matC(0xf8fafc));pad.position.set(0,-0.22,0.09);kn.add(pad);}
    return {hp,kn};
  }
  const aL=arm(-1),aR=arm(1),lL=leg(-1),lR=leg(1);
  const bat=new THREE.Group();
  const blade=new THREE.Mesh(new THREE.BoxGeometry(0.11,0.56,0.035),matC(0xe7c89a,0.7));blade.position.y=-0.28;blade.castShadow=true;bat.add(blade);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.26,8),matC(0x1f2937));handle.position.y=0.13;bat.add(handle);
  bat.position.set(0,-0.36,0.03);aR.el.add(bat);
  return {group:g,hips,head,aL,aR,lL,lR,bat};
}
function setPose(p,o){
  p.hips.position.y=o.hipsY??0.98;p.hips.rotation.x=o.lean??0;
  p.aL.sh.rotation.set(o.aLx??0.15,0,o.aLz??0.25);p.aL.el.rotation.x=o.aLe??-0.4;
  p.aR.sh.rotation.set(o.aRx??0.15,0,o.aRz??-0.25);p.aR.el.rotation.x=o.aRe??-0.4;
  p.lL.hp.rotation.x=o.lLx??0;p.lL.kn.rotation.x=o.lLk??0;
  p.lR.hp.rotation.x=o.lRx??0;p.lR.kn.rotation.x=o.lRk??0;
  p.bat.rotation.x=o.batX??-0.3;p.bat.rotation.z=o.batZ??0;
}
const IDLE={};
const STANCE={hipsY:0.88,lean:0.28,aRx:-0.5,aRz:-0.2,aRe:-0.9,aLx:-0.3,aLz:0.3,aLe:-0.7,lLx:0.35,lLk:-0.55,lRx:0.15,lRk:-0.25,batX:-0.5};
const KEEPER={hipsY:0.60,lean:0.45,aRx:-0.9,aRz:-0.4,aRe:-0.5,aLx:-0.9,aLz:0.4,aLe:-0.5,lLx:0.9,lLk:-1.3,lRx:0.9,lRk:-1.3,batX:-0.3};
const skinTones=[0xffdbac,0xf1c27d,0xe0ac69,0xc68642,0x8d5524];
const skinFor=n=>{let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return skinTones[h%skinTones.length];};
// ---------- Players on field ----------
const FIELD_SPOTS=[{x:3.5,z:12,role:'slip'},{x:-3.5,z:12,role:'slip'},
  {x:15,z:5,role:'point'},{x:18,z:-4,role:'cover'},{x:11,z:-14,role:'mid-off'},{x:-11,z:-14,role:'mid-on'},
  {x:-16,z:5,role:'square-leg'},{x:-9,z:15,role:'fine-leg'},{x:13,z:16,role:'third-man'}];
let batFigA=null,batFigB=null,bowlFig=null,keepFig=null,fieldFigs=[];
function kitFor(team){return {kit:team.color,pants:team.id==='IND'||team.id==='PAK'?0xffffff:0x1f2937,helmet:team.color};}
function clearPlayers(){
  [batFigA,batFigB,bowlFig,keepFig,...fieldFigs].forEach(f=>{if(f)scene.remove(f.group);});
  batFigA=batFigB=bowlFig=keepFig=null;fieldFigs=[];
}
function setupPlayers(batTeam,bowlTeam){
  clearPlayers();
  const bk=kitFor(batTeam),wk=kitFor(bowlTeam);
  batFigA=makeHumanoid({...bk,skin:skinFor('A'),padder:true});
  batFigB=makeHumanoid({...bk,skin:skinFor('B'),padder:true});
  bowlFig=makeHumanoid({...wk,skin:skinFor('C')});
  keepFig=makeHumanoid({...wk,skin:skinFor('D'),padder:true});
  scene.add(batFigA.group,batFigB.group,bowlFig.group,keepFig.group);
  FIELD_SPOTS.forEach(sp=>{
    const f=makeHumanoid({...wk,skin:skinFor(sp.role)});
    f.group.position.set(sp.x,0,sp.z);
    f.group.lookAt(0,1,0);
    scene.add(f.group);fieldFigs.push({fig:f,home:{x:sp.x,z:sp.z},role:sp.role});
  });
  // positions: striker near batting stumps, non-striker near bowler stumps
  batFigA.group.position.set(0.95,0,8.6);batFigA.group.rotation.y=Math.PI;
  batFigB.group.position.set(-0.95,0,-8.6);batFigB.group.rotation.y=0;
  bowlFig.group.position.set(0,0,-17);bowlFig.group.rotation.y=0;
  keepFig.group.position.set(0,0,12.6);keepFig.group.rotation.y=Math.PI;
  setPose(batFigA,STANCE);setPose(batFigB,IDLE);setPose(bowlFig,IDLE);setPose(keepFig,KEEPER);
  fieldFigs.forEach(({fig})=>setPose(fig,IDLE));
}
// ---------- Ball ----------
const ballGrp=new THREE.Group();
const ballMesh=new THREE.Mesh(new THREE.SphereGeometry(0.14,20,16),new THREE.MeshStandardMaterial({color:0xdc2626,roughness:0.35}));
ballMesh.castShadow=true;ballGrp.add(ballMesh);
const seam=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.014,8,24),new THREE.MeshStandardMaterial({color:0xffffff}));
ballGrp.add(seam);ballGrp.visible=false;scene.add(ballGrp);
// line-and-length pitch marker (3D, sits on the pitch while bowling)
const markerMesh=new THREE.Group();
const mRing=new THREE.Mesh(new THREE.RingGeometry(0.45,0.62,32),new THREE.MeshBasicMaterial({color:0xffd700,side:THREE.DoubleSide}));
mRing.rotation.x=-Math.PI/2;markerMesh.add(mRing);
const mDot=new THREE.Mesh(new THREE.CircleGeometry(0.13,16),new THREE.MeshBasicMaterial({color:0xdc2626,side:THREE.DoubleSide}));
mDot.rotation.x=-Math.PI/2;mDot.position.y=0.01;markerMesh.add(mDot);
markerMesh.visible=false;scene.add(markerMesh);
const LEN_Z={yorker:8.6,full:7.0,good:4.5,short:1.2};
const currentBounceZ=()=>Math.max(0.5,Math.min(9.0,(LEN_Z[bowlLength]??4.5)+joyY*1.5));
// ---------- Cameras ----------
const CAMS={
  broadcast:{pos:new THREE.Vector3(0,7,-30),look:new THREE.Vector3(0,1.2,6)},
  side:{pos:new THREE.Vector3(28,4,2),look:new THREE.Vector3(0,1,2)},
  closeBat:{pos:new THREE.Vector3(4.5,2.2,14.5),look:new THREE.Vector3(0,1,9.5)},
  closeBowl:{pos:new THREE.Vector3(-4.5,2.2,-14.5),look:new THREE.Vector3(0,1,-9.5)},
};
let camMode='broadcast', camTarget={...CAMS.broadcast}, camAuto=true;
function setCam(name){camMode=name;camTarget=CAMS[name]||CAMS.broadcast;const b=$('btn-cam');if(b){b.textContent='📷';b.title='Camera: '+name;}}
function trackBall(bpos){
  camTarget={pos:new THREE.Vector3(bpos.x*0.55,9,bpos.z-16),look:new THREE.Vector3(bpos.x,bpos.y,bpos.z)};
}

// ---------- Game state ----------
let userTeam=null,oppTeam=null,overs=5,M=null,userBatsFirst=true;
let shot='drive',delivery='fast',ballBusy=false,paused=false,qualityHigh=true;
let joyX=0,joyY=0,bowlType='fast',bowlLength='good',bowlPower=50,curPower=50;
let phase='idle',phaseT0=0,gameTime=0,hitDone=false,hitP=null,lastTiming=null;
let ballData=null,lastEv=null,lastShotDir=null,lastBounce=null,shotsLog=[];
let strikerFig=null,nonStrikerFig=null;
const SHOT_DIRS={drive:{x:0.25,z:1},cut:{x:1,z:0.15},pull:{x:-1,z:0.1},sweep:{x:-0.8,z:0.6},loft:{x:0.35,z:1},defend:{x:0,z:0.2}};
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
function bigText(txt,ms=1800){const el=$('big-text');el.textContent=txt;el.classList.remove('hidden');setTimeout(()=>el.classList.add('hidden'),ms);}
function innNow(){return M.innings[M.inn-1];}
function userBattingNow(){const inn=innNow();return inn&&((M.inn===1&&userBatsFirst)||(M.inn===2&&!userBatsFirst));}
// ---------- HUD ----------
function renderAll(){
  const inn=innNow();if(!inn)return;
  const bat=inn.batTeam,bowl=inn.bowlTeam;
  const s=inn.batsmen[inn.striker],ns=inn.batsmen[inn.nonStriker],b=curBowler(inn);
  $('sb-abbr-bat').textContent=bat.id;$('sb-score2').textContent=`${inn.score}/${inn.wkts}`;
  $('sb-overs2').textContent=`${fmtOvers(inn.balls)} ov`;
  $('sb-left').style.background=bat.color;$('sb-right').style.background=bowl.color;$('sb-abbr-bowl').textContent=bowl.id;
  $('sb-face1').textContent=s?initials(s.p.n):'';$('sb-bat1').textContent=s?`${s.p.n}* ${s.runs} (${s.balls})`:'';
  $('sb-face2').textContent=ns?initials(ns.p.n):'';$('sb-bat2').textContent=ns?`${ns.p.n} ${ns.runs} (${ns.balls})`:'';
  $('sb-bowl-face').textContent=b?initials(b.p.n):'';$('sb-bowl1').textContent=b?`${b.p.n} ${b.wkts}-${b.runs} (${fmtOvers(b.balls)})`:'';
  const rr=inn.balls?((inn.score/inn.balls)*6).toFixed(2):'0.00';
  $('sb-rr').textContent=`RR ${rr}`;
  if(inn.target){const need=Math.max(0,inn.target-inn.score),left=Math.max(0,M.overs*6-inn.balls);
    $('sb-target').textContent=`Target ${inn.target} • Need ${need} off ${left}`;}
  else $('sb-target').textContent='';
  if(ballData&&ballData.speed)$('sb-speed').textContent=`Ball speed ${ballData.speed} km/h`;
  drawPitchMap();drawWagon();
}
function drawPitchMap(){
  const c=$('pitch-map'),g=c.getContext('2d');g.clearRect(0,0,220,150);
  g.fillStyle='#c9a06b';g.fillRect(70,10,80,130);
  g.fillStyle='#fff';g.fillRect(70,18,80,3);g.fillRect(70,129,80,3);
  g.fillStyle='#1c3a28';g.font='11px system-ui';g.fillText('Bowler',88,8);g.fillText('Batsman',86,148);
  if(lastBounce){const x=110+lastBounce.x*18, y=10+((10-lastBounce.z)/20)*130;
    g.fillStyle='#dc2626';g.beginPath();g.arc(x,y,6,0,7);g.fill();
    const len=lastBounce.z>7?'Full':lastBounce.z>3?'Good length':'Short';
    g.fillStyle='#fff';g.fillText(len,150,75);}
}
function drawWagon(){
  const c=$('wagon'),g=c.getContext('2d');g.clearRect(0,0,220,150);
  g.strokeStyle='#2a4a38';g.beginPath();g.arc(110,75,60,0,7);g.stroke();
  g.fillStyle='#c9a06b';g.fillRect(104,68,12,14);
  shotsLog.forEach((sh,i)=>{const a=Math.atan2(sh.dir.x,sh.dir.z);
    g.strokeStyle=i===shotsLog.length-1?'#ffd700':'rgba(255,255,255,0.35)';g.lineWidth=i===shotsLog.length-1?3:1;
    g.beginPath();g.moveTo(110,75);g.lineTo(110+Math.sin(a)*58,75+Math.cos(a)*58);g.stroke();});
}
function sr(b){return b.balls?((b.runs/b.balls)*100).toFixed(1):'0.0';}
function econ(b){return b.balls?((b.runs/(b.balls/6))).toFixed(2):'0.00';}
function renderScorecard(){
  let h='';
  M.innings.forEach((inn,idx)=>{
    const atCrease1=inn.striker,atCrease2=inn.nonStriker;
    h+=`<h3>Innings ${idx+1}: ${inn.batTeam.name} ${inn.score}/${inn.wkts} (${fmtOvers(inn.balls)} ov)</h3>`;
    h+=`<table><tr><th>Batter</th><th>Dismissal</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>`;
    inn.batsmen.forEach((b,i)=>{if(b.balls>0||b.out||i===atCrease1||i===atCrease2)
      h+=`<tr><td>${b.p.n}${(!b.out&&(i===atCrease1||i===atCrease2))?'*':''}</td><td style="opacity:.75">${b.out?b.howOut:'not out'}</td><td>${b.runs}</td><td>${b.balls}</td><td>${b.fours}</td><td>${b.sixes}</td><td>${sr(b)}</td></tr>`;});
    if(inn.batsmen.some(b=>b.balls===0&&!b.out))h+=`<tr><td colspan="7" style="opacity:.75">Did not bat: ${inn.batsmen.filter(b=>b.balls===0&&!b.out).map(b=>b.p.n).join(', ')}</td></tr>`;
    h+=`<tr><td colspan="7">Extras ${inn.extras.runs} (w ${inn.extras.wides}, nb ${inn.extras.noballs}) • Fall of wickets: ${inn.fow.map(f=>`${f.score}/${f.wkts} ${f.batter} (${f.overs})`).join(', ')||'—'}</td></tr></table>`;
    h+=`<table><tr><th>Bowler</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th></tr>`;
    inn.bowlers.forEach(b=>{if(b.balls>0)h+=`<tr><td>${b.p.n}</td><td>${fmtOvers(b.balls)}</td><td>${b.maidens}</td><td>${b.runs}</td><td>${b.wkts}</td><td>${econ(b)}</td></tr>`;});
    h+=`</table>`;
  });
  $('scorecard-wrap').innerHTML=h;$('result-scorecard').innerHTML=h;
}
// ---------- Team select / toss ----------
function teamCard(t,selected,onClick){
  const d=document.createElement('div');d.className='team-card'+(selected?' sel':'');d.style.borderColor=selected?t.color:'';
  d.innerHTML=`<div class="tc-name"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${t.color}"></span> ${t.name}</div><div class="tc-rank">ICC ODI Rank #${t.rank}</div><div class="tc-stars">★★★★★</div>`;
  d.onclick=()=>onClick(t);return d;
}
function renderTeams(){
  const g=$('team-grid'),o=$('opp-grid');g.innerHTML='';o.innerHTML='';
  TEAMS.forEach(t=>{
    g.appendChild(teamCard(t,userTeam===t,x=>{userTeam=x;renderTeams();}));
    o.appendChild(teamCard(t,oppTeam===t,x=>{oppTeam=x;renderTeams();}));
  });
  let h='';
  [userTeam,oppTeam].forEach(t=>{if(!t)return;h+=`<div><b style="color:${t.color2}">● ${t.name} — Playing XI</b><br>`+t.players.map((p,i)=>`${i+1}. ${p.n} <span style="opacity:.7">${p.r}</span>`).join(' • ')+'</div>';});
  $('xi-preview').innerHTML=h||'Pick both teams to see the playing XIs.';
  $('btn-play').disabled=!(userTeam&&oppTeam);
}
userTeam=TEAMS.find(t=>t.id==='PAK');oppTeam=TEAMS.find(t=>t.id==='IND');renderTeams();
document.querySelectorAll('.over').forEach(b=>b.onclick=()=>{document.querySelectorAll('.over').forEach(x=>x.classList.remove('active'));b.classList.add('active');overs=+b.dataset.over;});
$('btn-play').onclick=()=>{unlockAudio();M=createMatch(userTeam,oppTeam,overs);showScreen('screen-toss');$('toss-result').textContent='';$('toss-choice').classList.add('hidden');$('btn-start-match').classList.add('hidden');};
function tossDone(userWon){
  $('toss-result').textContent=userWon?`${userTeam.name} won the toss!`:`${oppTeam.name} won the toss and chose to ${Math.random()<0.5?'bat':'bowl'} first.`;
  if(userWon){$('toss-choice').classList.remove('hidden');}
  else{userBatsFirst=!(Math.random()<0.5);$('btn-start-match').classList.remove('hidden');}
  M.tossWinner=userWon?userTeam:oppTeam;M.userBatsFirst=userBatsFirst;
}
$('btn-heads').onclick=()=>{const won=Math.random()<0.5;tossDone(won);if(won)$('toss-text').textContent='Heads! You called correctly.';else $('toss-text').textContent='Tails — you lost the toss.';};
$('btn-tails').onclick=()=>{const won=Math.random()<0.5;tossDone(won);if(won)$('toss-text').textContent='Tails! You called correctly.';else $('toss-text').textContent='Heads — you lost the toss.';};
$('btn-bat-first').onclick=()=>{userBatsFirst=true;$('btn-start-match').classList.remove('hidden');};
$('btn-bowl-first').onclick=()=>{userBatsFirst=false;$('btn-start-match').classList.remove('hidden');};
$('btn-start-match').onclick=()=>{
  document.body.classList.add('in-match');
  showScreen('screen-match');
  const batFirst=userBatsFirst?userTeam:oppTeam, bowlFirst=userBatsFirst?oppTeam:userTeam;
  startInnings(M,batFirst,bowlFirst,null);
  setupPlayers(batFirst,bowlFirst);
  strikerFig=batFigA;nonStrikerFig=batFigB;
  $('commentary-list').innerHTML='';$('scorecard-wrap').classList.add('hidden');
  say(`🏏 Match started: ${userTeam.name} vs ${oppTeam.name}, ${overs} overs. ${batFirst.name} batting first.`);
  speak(`Welcome to Cricket Clash 3D. ${batFirst.name} batting first.`);
  resetBall();renderAll();updateControls();
};
function updateControls(){
  const ub=userBattingNow();
  $('bat-overlay').classList.toggle('hidden',!ub);
  $('bowl-overlay').classList.toggle('hidden',ub);
  $('timing-box').classList.add('hidden');$('btn-hit').classList.add('hidden');
  $('joy-caption').textContent=ub?'Shot direction':'Bowling direction';
  $('btn-bowl-ball').disabled=false;$('btn-bowl-delivery').disabled=false;
}
function resetBall(){
  ballGrp.visible=false;phase='idle';ballBusy=false;
  joyX=0;joyY=0;const kb=$('joystick-knob');if(kb)kb.style.transform='';const ja=$('joy-arrow');if(ja)ja.textContent='▲';
  bowlFig.group.position.set(0,0,-17);setPose(bowlFig,IDLE);
  strikerFig.group.position.set(0.95,0,8.6);strikerFig.group.rotation.y=Math.PI;setPose(strikerFig,STANCE);
  nonStrikerFig.group.position.set(-0.95,0,-8.6);nonStrikerFig.group.rotation.y=0;setPose(nonStrikerFig,IDLE);
  fieldFigs.forEach(({fig,home})=>{fig.group.position.set(home.x,0,home.z);setPose(fig,IDLE);});
  setPose(keepFig,KEEPER);resetStumps(stumpsBat);resetStumps(stumpsBowl);
  $('btn-bowl-ball').disabled=false;$('btn-bowl-delivery').disabled=false;
}
// ---------- Ball sequence ----------
function startBall(){
  if(ballBusy)return;ballBusy=true;unlockAudio();
  $('stats-overlay').classList.add('hidden');$('scorecard-wrap').classList.add('hidden');
  const ub=userBattingNow();
  const del=ub?['fast','swing','seam','spin','slower','yorker','bouncer'][Math.floor(Math.random()*7)]
    :(bowlLength==='yorker'?'yorker':(bowlLength==='short'?'bouncer':bowlType));
  const inn=innNow();
  const extraRoll=Math.random();
  const extra=extraRoll<0.05?'Wide ball':(extraRoll<0.08?'No ball':null);
  ballData={shot,userBatting:ub,delivery:del,extra,joyX,joyY,lineX:ub?0:joyX*1.2,
    speed:speedFor(del),
    swing:(del==='swing'||del==='seam')?(Math.random()<0.5?-1:1)*(0.8+Math.random()*0.7):(Math.random()-0.5)*0.4,
    spinDev:del==='spin'?(Math.random()<0.5?-1:1)*(1.0+Math.random()*0.8):0,
    bounceZ:ub?(del==='yorker'?8.6:(del==='bouncer'?1.2:3.5+Math.random()*2.5)):currentBounceZ(),
    wideX:extra==='Wide ball'?(Math.random()<0.5?-1:1)*2.6:0};
  hitDone=false;hitP=null;lastTiming=null;$('timing-hint').textContent='';
  $('btn-bowl-ball').disabled=true;$('btn-bowl-delivery').disabled=true;
  if(ballData.userBatting){$('timing-box').classList.remove('hidden');$('btn-hit').classList.remove('hidden');}
  setCam('broadcast');
  phase='runup';phaseT0=gameTime;
}
function deliveryPath(p,bd){
  const z=-10+20*p;
  const tb=(bd.bounceZ+10)/20;
  let y,x;
  if(p<tb){const u=p/tb;y=2.3*(1-u)+0.1*Math.sin(Math.PI*u);x=bd.swing*Math.sin(Math.PI*p*0.9)*(p/tb);}
  else{const u=(p-tb)/(1-tb);const bh=bd.delivery==='yorker'?0.25:(bd.delivery==='bouncer'?1.5:0.75);y=0.9*u+bh*Math.sin(Math.PI*u);x=bd.swing*Math.sin(Math.PI*0.9)+bd.spinDev*u+bd.wideX*u;}
  if(bd.wideX)x=bd.wideX*p+bd.swing*Math.sin(Math.PI*p*0.9)*0.3;
  else x+=(bd.lineX||0)*p;
  return V3(x,y,z);
}
function onHit(){
  if(phase!=='travel'||!ballData.userBatting||hitDone)return;
  hitDone=true;hitP=(gameTime-phaseT0)/1.8;
  lastTiming=hitP>=0.45&&hitP<=0.55?'perfect':(hitP>=0.35&&hitP<=0.65?'good':(hitP<0.35?'early':'late'));
  $('timing-hint').textContent=lastTiming.toUpperCase()+'!';
  $('btn-hit').classList.add('hidden');beep(lastTiming==='perfect'?880:660,0.12);
}
function finishTravel(){
  const inn=innNow(),b=curBowler(inn);
  let res,ev;
  lastBounce={x:ballData.swing,z:ballData.bounceZ};
  if(ballData.extra){
    ev=applyBall(M,null,1,ballData.extra);
    res={runs:0,out:false,how:'',extra:true};
    say(`⚠️ ${ballData.extra} — +1 run.`);
  } else if(ballData.userBatting){
    if(!hitDone)lastTiming='miss';
    const s=strikerRec(inn);
    res=battingOutcome(s.p.bat,b.p.bowl,lastTiming,ballData.shot);
    ev=applyBall(M,res,0,null);
  } else {
    const s=strikerRec(inn);
    res=aiBattingOutcome(s.p.bat,b.p.bowl,ballData.delivery);
    ev=applyBall(M,res,0,null);
  }
  lastEv=ev;
  // shot direction for animation + wagon wheel
  let dir;
  if(ballData.userBatting){dir={...SHOT_DIRS[ballData.shot]};dir.x=Math.max(-1.4,Math.min(1.4,dir.x+(ballData.joyX||0)*0.7));dir.z=Math.max(0.1,Math.min(1.3,dir.z+(ballData.joyY||0)*0.25));}
  else dir=Object.values(SHOT_DIRS)[Math.floor(Math.random()*6)];
  if(res.runs===4||res.runs===6)dir={x:dir.x*1.2,z:dir.z};
  lastShotDir=dir;shotsLog.push({dir,runs:res.runs||0});
  if(shotsLog.length>14)shotsLog.shift();
  // result animation setup
  const anim={type:'dot',from:V3(0,0.9,9.6),to:V3(0,0.9,12.6),arc:0.4,arrive:0.6,dur:1.3,catcher:null};
  if(res.extra){anim.type='wide';anim.to=V3(ballData.wideX,0.8,12.6);anim.dur=1.2;}
  else if(res.out&&res.how==='bowled'){anim.type='bowled';anim.to=V3(0,0.4,10);anim.arc=0.2;anim.arrive=0.25;anim.dur=1.8;}
  else if(res.out&&res.how==='LBW'){anim.type='lbw';anim.to=V3(0,0.5,9.4);anim.arc=0.2;anim.arrive=0.35;anim.dur=1.6;}
  else if(res.out&&res.how==='caught'){
    const f=fieldFigs.reduce((a,c)=>{const dx=c.home.x-dir.x*20,dz=c.home.z-dir.z*20;return (dx*dx+dz*dz)<(a.d*a.d)?{f:c,d:Math.hypot(dx,dz)}:a;},{f:fieldFigs[0],d:1e9}).f;
    anim.type='caught';anim.catcher=f;anim.to=V3(f.home.x,1.3,f.home.z);anim.arc=2.2;anim.arrive=0.85;anim.dur=1.8;
  }
  else if(res.out&&res.how==='run out'){anim.type='runout';anim.to=V3(0,0.4,10);anim.arc=1.2;anim.arrive=0.9;anim.dur=2.0;}
  else if(res.runs===4){const bp=boundaryPoint(dir);anim.type='four';anim.to=V3(bp.x,0.14,bp.z);anim.arc=0.8;anim.arrive=1;anim.dur=1.7;}
  else if(res.runs===6){const bp=boundaryPoint(dir);anim.type='six';anim.to=V3(bp.x*1.1,0.5,bp.z*1.1);anim.arc=11;anim.arrive=1;anim.dur=1.9;}
  else if(res.runs>0){
    const f=fieldFigs.reduce((a,c)=>{const dx=c.home.x-dir.x*20,dz=c.home.z-dir.z*20;return (dx*dx+dz*dz)<(a.d*a.d)?{f:c,d:Math.hypot(dx,dz)}:a;},{f:fieldFigs[0],d:1e9}).f;
    anim.type='runs';anim.fielder=f;anim.to=V3(f.home.x,1.0,f.home.z);anim.arc=0.9;anim.arrive=0.8;anim.dur=1.7;anim.runs=res.runs;
  }
  ballData.anim=anim;ballData.res=res;
  phase='result';phaseT0=gameTime;
  $('timing-box').classList.add('hidden');$('btn-hit').classList.add('hidden');
  // overlays + sound + camera
  if(res.out){
    bigText('WICKET! ☝️',2000);cheer();speak(`Wicket! ${res.how}! The crowd goes wild!`);
    say(`☝️ WICKET! ${ev.outBatter} ${ev.howTxt}. ${inn.batTeam.name} ${inn.score}/${inn.wkts}`);
    if(camMode==='broadcast')setCam('closeBat');
  } else if(res.runs===4){bigText('FOUR! 💥',1800);crack();cheer();speak('What a shot! Four runs!');say(`💥 FOUR! ${inn.score}/${inn.wkts}`);if(camMode==='broadcast')trackBall(V3(0,1,10));}
  else if(res.runs===6){bigText('SIX! 🚀',1800);crack();cheer();speak('Huge six! That has gone all the way!');say(`🚀 SIX! ${inn.score}/${inn.wkts}`);if(camMode==='broadcast')trackBall(V3(0,4,10));}
  else if(res.runs>0){crack();say(`🏃 ${res.runs} run${res.runs>1?'s':''}. ${inn.score}/${inn.wkts}`);}
  else if(!res.extra){say(`Dot ball. Good bowling. ${inn.score}/${inn.wkts}`);}
  renderAll();renderScorecard();
}
function boundaryPoint(dir){
  const l=Math.hypot(dir.x,dir.z)||1,a=Math.atan2(dir.x/l,dir.z/l);
  return {x:Math.sin(a)*62*1.05,z:Math.cos(a)*62};
}
function endBall(){
  const ev=lastEv,inn=innNow();
  ballGrp.visible=false;
  if(ev&&ev.overComplete){say(`🏏 End of over ${fmtOvers(inn.balls)}: ${inn.score}/${inn.wkts}`);}
  if(ev&&ev.inningsOver){
    if(M.inn===1){
      const target=inn.score+1;
      bigText(`Innings break! Target ${target}`,2600);
      say(`🏏 Innings break. ${inn.batTeam.name} ${inn.score}/${inn.wkts}. Target: ${target}.`);
      setTimeout(()=>{
        const batFirst=!userBatsFirst?userTeam:oppTeam, bowlFirst=!userBatsFirst?oppTeam:userTeam;
        startInnings(M,batFirst,bowlFirst,target);
        setupPlayers(batFirst,bowlFirst);
        strikerFig=batFigA;nonStrikerFig=batFigB;
        resetBall();renderAll();updateControls();setCam('broadcast');
        say(`🏏 Second innings: ${batFirst.name} need ${target} to win.`);
      },2600);
    } else {
      endMatch();
    }
  } else {
    resetBall();renderAll();updateControls();
  }
  ballBusy=false;ballData=null;
}
function endMatch(){
  const [i1,i2]=M.innings;
  let title,sub;
  if(i1.score>i2.score){const m=i1.score-i2.score;title=`${i1.batTeam.name} win by ${m} run${m>1?'s':''}!`;sub=`${i1.batTeam.name} ${i1.score}/${i1.wkts} beat ${i2.batTeam.name} ${i2.score}/${i2.wkts}`;}
  else if(i2.score>i1.score){const w=10-i2.wkts;title=`${i2.batTeam.name} win by ${w} wicket${w>1?'s':''}!`;sub=`${i2.batTeam.name} ${i2.score}/${i2.wkts} beat ${i1.batTeam.name} ${i1.score}/${i1.wkts}`;}
  else{title=`Match tied!`;sub=`${i1.batTeam.name} ${i1.score}/${i1.wkts} — ${i2.batTeam.name} ${i2.score}/${i2.wkts}`;}
  document.body.classList.remove('in-match');
  const mom=manOfMatch(M);
  $('result-title').textContent=title;$('result-sub').textContent=sub+(mom?` • 🏆 Player of the Match: ${mom.n}`:'');
  renderScorecard();showScreen('screen-result');cheer();
}
// ---------- Controls wiring ----------
document.querySelectorAll('.shot').forEach(b=>b.onclick=()=>{document.querySelectorAll('.shot').forEach(x=>x.classList.remove('active'));b.classList.add('active');shot=b.dataset.shot;unlockAudio();});
document.querySelectorAll('.btype').forEach(b=>b.onclick=()=>{document.querySelectorAll('.btype').forEach(x=>x.classList.remove('active'));b.classList.add('active');bowlType=b.dataset.btype;unlockAudio();});
document.querySelectorAll('.blen').forEach(b=>b.onclick=()=>{document.querySelectorAll('.blen').forEach(x=>x.classList.remove('active'));b.classList.add('active');bowlLength=b.dataset.blen;unlockAudio();});
$('btn-stats').onclick=()=>{$('stats-overlay').classList.toggle('hidden');};
$('btn-close-stats').onclick=()=>{$('stats-overlay').classList.add('hidden');};
(function initJoystick(){
  const base=$('joystick-base'),knob=$('joystick-knob'),arrow=$('joy-arrow');if(!base)return;
  let drag=false;
  const upd=e=>{const r=base.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    let dx=e.clientX-cx,dy=e.clientY-cy;const m=Math.hypot(dx,dy),max=32;
    if(m>max){dx=dx/m*max;dy=dy/m*max;}
    knob.style.transform=`translate(${dx}px,${dy}px)`;
    joyX=dx/max;joyY=-dy/max;
    const a=Math.atan2(joyY,joyX);
    arrow.textContent=Math.abs(joyX)<0.25&&Math.abs(joyY)<0.25?'▲':(a>=-0.4&&a<0.4?'▶':(a>=0.4&&a<1.2?'◗':(a>=1.2&&a<1.9?'▲':(a>=1.9||a<-1.9?'◖':(a>=-1.9&&a<-1.2?'▼':'◗')))));
  };
  base.addEventListener('pointerdown',e=>{drag=true;base.setPointerCapture(e.pointerId);upd(e);});
  base.addEventListener('pointermove',e=>{if(drag)upd(e);});
  base.addEventListener('pointerup',()=>{drag=false;});
})();
$('btn-bowl-ball').onclick=startBall;$('btn-bowl-delivery').onclick=startBall;$('btn-hit').onclick=onHit;
$('btn-pause').onclick=()=>{paused=!paused;$('btn-pause').textContent=paused?'▶':'⏸';};
$('btn-sound').onclick=()=>{soundOn=!soundOn;if(!soundOn&&('speechSynthesis' in window))speechSynthesis.cancel();if(crowdGain)crowdGain.gain.value=soundOn?0.035:0;$('btn-sound').textContent=soundOn?'🔊':'🔇';};
$('btn-quality').onclick=()=>{qualityHigh=!qualityHigh;renderer.shadowMap.enabled=qualityHigh;renderer.setPixelRatio(qualityHigh?Math.min(devicePixelRatio,2):1);scene.traverse(o=>{if(o.material)o.material.needsUpdate=true;});$('btn-quality').textContent=qualityHigh?'🎞 High':'🎞 Low';};
$('btn-cam').onclick=()=>{const order=['broadcast','side','follow'];const nx=order[(order.indexOf(camMode)+1)%order.length];camMode=nx;if(nx==='follow'){const b=$('btn-cam');if(b){b.textContent='📷';b.title='Camera: Follow';}}else setCam(nx);};
$('btn-scorecard').onclick=()=>{$('scorecard-wrap').classList.toggle('hidden');renderScorecard();};
$('btn-rematch').onclick=()=>{document.body.classList.remove('in-match');M=createMatch(userTeam,oppTeam,overs);showScreen('screen-toss');$('toss-result').textContent='';$('toss-choice').classList.add('hidden');$('btn-start-match').classList.add('hidden');$('toss-text').textContent='Call it:';};
$('btn-home').onclick=()=>{document.body.classList.remove('in-match');showScreen('screen-home');renderTeams();};
document.addEventListener('keydown',e=>{
  if(e.code==='Space'){e.preventDefault();if(phase==='travel')onHit();else if(phase==='idle')startBall();}
  if(e.code==='Digit1')document.querySelector('[data-shot="defend"]')?.click();
  if(e.code==='Digit2')document.querySelector('[data-shot="drive"]')?.click();
  if(e.code==='Digit3')document.querySelector('[data-shot="cut"]')?.click();
  if(e.code==='Digit4')document.querySelector('[data-shot="pull"]')?.click();
  if(e.code==='Digit5')document.querySelector('[data-shot="sweep"]')?.click();
  if(e.code==='Digit6')document.querySelector('[data-shot="loft"]')?.click();
  if(e.code==='KeyP')$('btn-pause').click();
});
// ---------- Animation loop ----------
const clock=new THREE.Clock();
const camPos=new THREE.Vector3(0,7,-30),camLook=new THREE.Vector3(0,1.2,6);
function easeOut(t){return 1-Math.pow(1-t,3);}
function updatePhase(){
  if(!ballData&&phase!=='result')return;
  if(phase==='runup'){
    const p=Math.min(1,(gameTime-phaseT0)/1.15);
    bowlFig.group.position.z=-17+6*easeOut(p);
    const s=Math.sin(gameTime*14);
    setPose(bowlFig,{lLx:s*0.8,lLk:-0.6,lRx:-s*0.8,lRk:-0.6,aLx:-s*0.6,aRx:s*0.6,hipsY:0.98});
    ballGrp.visible=false;
    if(ballData&&!ballData.userBatting){
      curPower=Math.round((Math.sin(gameTime*5)+1)/2*100);
      const pn=$('power-needle');if(pn)pn.style.width=curPower+'%';
      const pt=$('power-text');if(pt)pt.textContent=`Power ${curPower}% — set by the moving meter at delivery`;
    }
    if(p>=1){
      if(ballData&&!ballData.userBatting){
        bowlPower=curPower;ballData.speed=Math.round(speedFor(ballData.delivery)*(0.85+bowlPower/100*0.3));
        if(bowlPower>90||bowlPower<25)ballData.swing+=(Math.random()-0.5)*1.0;
        const ss=$('sb-speed');if(ss)ss.textContent=`Ball speed ${ballData.speed} km/h`;
      }
      phase='deliver';phaseT0=gameTime;}
  } else if(phase==='deliver'){
    const p=Math.min(1,(gameTime-phaseT0)/0.45);
    bowlFig.group.position.z=-11+1.5*p;
    setPose(bowlFig,{aRx:-2.4+3.3*p,aRz:-0.2,aRe:-0.2,hipsY:0.98,lean:0.15});
    ballGrp.visible=true;ballGrp.position.set(0.35,2.0,-10.8+0.8*p);
    if(p>=1){phase='travel';phaseT0=gameTime;}
  } else if(phase==='travel'){
    const p=Math.min(1,(gameTime-phaseT0)/1.8);
    ballGrp.visible=true;ballGrp.position.copy(deliveryPath(p,ballData));
    ballGrp.rotation.x+=0.15;
    $('timing-needle').style.left=(p*100)+'%';
    setPose(bowlFig,{aRx:0.9,aRe:-0.2,hipsY:0.98});
    // batsman trigger swing when ball is close
    if(p>0.75&&ballData.userBatting&&hitDone)setPose(strikerFig,{...STANCE,batX:-2.6,batZ:0.4,lean:0.4});
    else setPose(strikerFig,STANCE);
    if(p>=1)finishTravel();
  } else if(phase==='result'&&ballData&&ballData.anim){
    const a=ballData.anim,p=Math.min(1,(gameTime-phaseT0)/a.dur),q=Math.min(1,p/(a.arrive||1));
    ballGrp.visible=true;
    ballGrp.position.lerpVectors(a.from,a.to,q);
    ballGrp.position.y=a.from.y+(a.to.y-a.from.y)*q+a.arc*Math.sin(Math.PI*q);
    if(a.type==='bowled'&&q>0.2)breakStumps(stumpsBat);
    if(a.type==='runout'&&q>0.85)breakStumps(stumpsBat);
    if(a.type==='caught'&&a.catcher){
      const f=a.catcher.fig;
      f.group.position.lerp(V3(a.catcher.home.x,0,a.catcher.home.z),V3(a.to.x,0,a.to.z),q);
      f.group.position.y=q>0.7?Math.sin((q-0.7)/0.3*Math.PI)*0.8:0;
      setPose(f,{aLx:-2.4,aLz:0.5,aRx:-2.4,aRz:-0.5,hipsY:0.98});
    }
    if(a.type==='runs'&&a.fielder){
      const f=a.fielder.fig;
      f.group.position.lerp(V3(a.fielder.home.x,0,a.fielder.home.z),V3(a.to.x,0,a.to.z),q);
      const s=Math.sin(gameTime*16);setPose(f,{lLx:s*0.7,lRx:-s*0.7,hipsY:0.98});
    }
    if(a.type==='runs'||a.type==='runout'){
      const runs=a.runs||1,prog=p*runs,seg=Math.floor(prog),fr=prog-seg;
      const sz=seg%2===0?8.6-17.2*fr:-8.6+17.2*fr;
      const nz=seg%2===0?-8.6+17.2*fr:8.6-17.2*fr;
      strikerFig.group.position.set(0.95,0,sz);strikerFig.group.rotation.y=seg%2===0?Math.PI:0;
      nonStrikerFig.group.position.set(-0.95,0,nz);nonStrikerFig.group.rotation.y=seg%2===0?0:Math.PI;
      const s=Math.sin(gameTime*16);
      setPose(strikerFig,{...STANCE,lLx:s*0.7,lRx:-s*0.7});
      setPose(nonStrikerFig,{lLx:-s*0.7,lRx:s*0.7});
      if(p>=1&&(runs%2===1)){const t=strikerFig;strikerFig=nonStrikerFig;nonStrikerFig=t;}
    }
    if(a.type==='four'||a.type==='six'){trackBall(ballGrp.position);}
    if(p>=1){endBall();}
  }
  // bails flying
  [stumpsBat,stumpsBowl].forEach(g=>{
    g.userData.fly.forEach(f=>{f.t+=0.016;f.m.position.x+=f.v.x*0.016;f.m.position.y+=f.v.y*0.016-4.9*f.t*f.t*0.5;f.m.position.z+=f.v.z*0.016;if(f.t>1.2)f.m.visible=false;});
  });
}
function resize(){
  const w=wrap.clientWidth,h=wrap.clientHeight||500;
  if(w<=0)return;
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize);resize();
function loop(){
  requestAnimationFrame(loop);
  const dt=Math.min(0.05,clock.getDelta());
  if(!paused)gameTime+=dt;
  const ww=wrap.clientWidth,hh=wrap.clientHeight||500;
  if(ww>0&&Math.abs(camera.aspect-ww/hh)>0.001)resize();
  updatePhase();
  if(markerMesh){
    const show=!!(M&&!userBattingNow()&&(phase==='idle'||phase==='runup'||phase==='deliver'));
    markerMesh.visible=show;
    if(show)markerMesh.position.set(joyX*1.2,0.06,currentBounceZ());
  }
  // camera smoothing
  let targetPos=camTarget.pos,targetLook=camTarget.look;
  if(camMode==='follow'&&ballGrp.visible){targetPos=V3(ballGrp.position.x*0.55,9,ballGrp.position.z-16);targetLook=ballGrp.position.clone();}
  camPos.lerp(targetPos,0.06);camLook.lerp(targetLook,0.08);
  camera.position.copy(camPos);camera.lookAt(camLook);
  renderer.render(scene,camera);
}
loop();
