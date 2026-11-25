"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const base=path.join(__dirname,"..");
const source=JSON.parse(fs.readFileSync(path.join(base,"data/learning_paths.json"),"utf8"));
const lessons=source.learning_paths;
const ids=lessons.map(x=>x.id);
assert.deepEqual(ids,["MW-001","MW-002","MW-009","MW-015","MW-024"]);
assert.deepEqual(lessons.map(x=>x.template),["A","A","A","B","C"]);
for(const lesson of lessons){
 assert(lesson.question && lesson.molecules.length>=1,lesson.id+" source incomplete");
 assert(lesson.notebookSteps.length>=4,lesson.id+" instructions missing");
 assert(lesson.explanation.length>=2,lesson.id+" explanation missing");
 for(const mol of lesson.molecules)assert(mol.smiles&&mol.name,lesson.id+" invalid molecule");
}
assert.deepEqual(lessons[1].molecules.map(x=>x.smiles),["O","S"]);
assert(lessons[1].notebookSteps[3].includes("Polaritäts-/Löslichkeitsvergleich"));
assert.deepEqual(lessons[2].molecules.map(x=>x.smiles),["CCC=O","CC(=O)C"]);
assert.equal(lessons[2].targetExample,"Propanal");
assert.deepEqual(lessons[3].molecules.map(x=>x.smiles),["O=C=O","O","N","C"]);
assert.equal(lessons[3].targetModule,"Polarität und Löslichkeit");
assert.equal(lessons[4].targetExample,"Cyclohexan");
assert(lessons[4].notebookSteps.some(s=>s.includes("Molekül analysieren")));
assert(lessons[4].notebookSteps.some(s=>s.includes("Konformere berechnen")));
assert(lessons[4].notebookSteps.some(s=>s.includes("vier 3D-Ringformen")));
assert(lessons[4].investigationIntro.includes("keine stabilen Minima"));
assert(lessons[4].caution.includes("Sattelgeometrie"));
assert(lessons[4].explanation.some(s=>s.includes("Flaggenmast")));
assert(lessons[4].explanation.some(s=>s.includes("Halbsessel")));
assert(lessons[4].observationPrompt.includes("Drei kleine Beobachtungen"));
assert.equal(lessons[4].observationTasks.length,3);
assert(lessons[4].advancedObservation.includes("nicht zur Pflichtaufgabe"));
assert(lessons[4].caution.includes("nicht gemessen"));
assert.equal(lessons[4].optionalDeepTool,"MOL_LAB");

const tools=JSON.parse(fs.readFileSync(path.join(base,"data/tools.json"),"utf8"));
const code=fs.readFileSync(path.join(base,"app.js"),"utf8");
const html=fs.readFileSync(path.join(base,"index.html"),"utf8");
new Function(code);
assert(html.includes('id="case-choices"'),"research paths container is missing");

function simulate(initial,locationUrl="https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/#aufgabe"){
 const key="molekuelwerkstatt:v0.1";
 const store={[key]:JSON.stringify(initial)};
 const dom={},listeners={};
 const doc={
  getElementById(id){
   if(!dom[id])dom[id]={
    id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,href:"",
    classList:{add(){},remove(){}},setAttribute(){},removeAttribute(){},dataset:{}
   };
   return dom[id];
  },
  querySelector(){return {textContent:"",href:"",setAttribute(){},removeAttribute(){}};},
  querySelectorAll(){return [];},
  addEventListener(name,handler){listeners[name]=handler;}
 };
 const starting=new URL(locationUrl);
 const win={
  location:{href:starting.href,search:starting.search,hash:starting.hash},
  scrollTo(){},addEventListener(){},confirm(){return true;},
  history:{replaceState(a,b,url){
   win.location.href=url;const parsed=new URL(url);
   win.location.search=parsed.search;win.location.hash=parsed.hash;
  }},
  MoleculeHandoff:{makeLink(base,detail){
   return base+"?smiles="+encodeURIComponent(detail.smiles)+"&context="+encodeURIComponent(detail.context);
  }}
 };
 const localStorage={getItem(k){return store[k]||null;},setItem(k,v){store[k]=v;}};
 const ctx={document:doc,window:win,localStorage,URL,URLSearchParams,
  navigator:{clipboard:{writeText:async()=>{}}},Blob,console,setTimeout(){},
  fetch(url){const response=url.endsWith("learning_paths.json")?source:tools;
   return Promise.resolve({ok:true,json:()=>Promise.resolve(response)});}
 };
 vm.runInNewContext(code,ctx,{filename:"app.js"});
 function click(action,caseId){
  listeners.click({target:{closest(selector){
   return selector==="[data-action]"?{dataset:{action,case:caseId}}:null;
  }}});
 }
 function view(name) {
  listeners.click({target:{closest(selector){
    return selector==="[data-view]"?{dataset:{view:name}}:null;
  }}});
 }
 function input(field,value){
  listeners.input({target:{dataset:{field},value,id:"field-"+field}});
 }
 function miniObservation(i,value){
  listeners.input({target:{dataset:{observationIndex:String(i)},value,id:"observation-part-"+i}});
 }
 function change(id,value,checked){
  listeners.change({target:{id,value,checked}});
 }
 function current(){return JSON.parse(store[key]);}
 return {store,dom,win,click,view,input,miniObservation,change,current};
}
async function test(){
 const app=simulate({
  view:"aufgabe",step:2,hypothesis:"Meine alte MW-001 Vermutung",
  observation:"Meine alte MW-001 Beobachtung",interpretation:"Alte Deutung MW001",
  conclusion:"",investigated:true,explanation:false,done:false,
  freeSmiles:"CCO",selectedExample:1,
  cases:{"MW-002":{step:1,hypothesis:"Gespeicherte MW002-Hypothese",observation:"",interpretation:"",conclusion:"",
   investigated:false,explanation:false,done:false}}
 });
 await new Promise(resolve=>setImmediate(resolve));
 assert(app.dom["case-title"].textContent.includes("Summenformel"));
 assert(app.dom["step-body"].innerHTML.includes("Alte Deutung MW001"));
 assert.equal(app.current().hypothesis,"Meine alte MW-001 Vermutung");
 assert.equal(app.current().cases["MW-002"].hypothesis,"Gespeicherte MW002-Hypothese");
 app.view("start");
 assert(app.dom["case-choices"].innerHTML.includes("MW-024"),"all new paths should be visible");
 app.view("aufgabe");
 app.click("select-case","MW-002");
 assert(app.dom["case-title"].textContent.includes("Schwefelwasserstoff"));
 assert(app.dom["step-body"].innerHTML.includes("Gespeicherte MW002-Hypothese")===false,
   "MW002 must restore its saved step (investigation), not jump to the start");
 assert.equal(app.dom["step-fraction"].textContent,"Schritt 2 von 4");
 assert(app.dom["step-body"].innerHTML.includes("Polaritäts-/Löslichkeitsvergleich"));
 app.input("observation","Wasser flüssig, H₂S gasförmig");
 assert.equal(app.current().cases["MW-002"].observation,"Wasser flüssig, H₂S gasförmig");
 app.click("start-case");
 assert(app.dom["step-body"].innerHTML.includes("Alte Deutung MW001"));
 assert.equal(app.current().cases["MW-002"].hypothesis,"Gespeicherte MW002-Hypothese");

 // Third comparison uses the same A-template, without leaking notes.
 app.click("select-case","MW-009");
 assert.equal(app.win.location.search,"?case=MW-009");
 assert(app.dom["case-molecules"].innerHTML.includes("Propanal"));
 assert(app.dom["case-molecules"].innerHTML.includes("Aceton"));
 assert(app.dom["case-handoff-0"].href.includes("context=MW-009"),"MOLLAB return context lost");
 app.input("hypothesis","Aldehyd statt Keton");
 app.click("next-step");
 assert(app.dom["step-body"].innerHTML.includes("Propanal ↔ Aceton"));
 assert(app.dom["step-body"].innerHTML.includes("Propanal"));
 app.click("next-step");
 assert(!app.dom["step-body"].innerHTML.includes("Aldehyde können unter geeigneten Bedingungen"),
   "MC/solution should not reveal answer prematurely");
 app.click("reveal-answer");
 assert(app.dom["step-body"].innerHTML.includes("Aldehyde können unter geeigneten Bedingungen"));
 assert.equal(app.current().cases["MW-009"].hypothesis,"Aldehyd statt Keton");

 // B-template: one optional molecule at a time, each with independent notes.
 app.click("select-case","MW-015");
 assert.equal(app.win.location.search,"?case=MW-015");
 assert(app.dom["step-body"].innerHTML.includes('id="variant-select"'),"molecule chooser missing");
 assert(app.dom["step-body"].innerHTML.includes("Kohlenstoffdioxid"));
 assert(app.dom["case-molecules"].innerHTML.includes("Ammoniak"));
 assert(app.dom["case-handoff-3"].href.includes("smiles=C"),"methane handoff missing");
 app.input("hypothesis","CO2: Dipole kompensieren sich");
 app.click("next-step");
 assert(app.dom["step-body"].innerHTML.includes("Beispiel:</strong> Kohlenstoffdioxid"));
 assert(app.dom["step-body"].innerHTML.includes("Molekül analysieren"));
 app.change("variant-select","Wasser");
 assert.equal(app.dom["step-fraction"].textContent,"Schritt 1 von 4",
   "new molecule should have own step state");
 assert(!app.dom["step-body"].innerHTML.includes("CO2: Dipole kompensieren sich"),
   "CO2 notes must not appear in water task");
 app.input("hypothesis","Wasser ist gewinkelt");
 app.click("next-step");
 assert(app.dom["step-body"].innerHTML.includes("Beispiel:</strong> Wasser"));
 app.change("variant-select","Kohlenstoffdioxid");
 assert.equal(app.dom["step-fraction"].textContent,"Schritt 2 von 4");
 app.click("prev-step");
 assert(app.dom["step-body"].innerHTML.includes("CO2: Dipole kompensieren sich"));
 assert.equal(app.current().cases["MW-015"].variants.Wasser.hypothesis,"Wasser ist gewinkelt");
 app.click("reset-case");
 assert.equal(app.current().cases["MW-015"].variants.Kohlenstoffdioxid.hypothesis,"");
 assert.equal(app.current().cases["MW-015"].variants.Wasser.hypothesis,"Wasser ist gewinkelt");

 // C-template: single molecule + concrete conformer instructions and optional depth.
 app.click("select-case","MW-024");
 assert.equal(app.win.location.search,"?case=MW-024");
 assert(app.dom["case-molecules"].innerHTML.includes("Cyclohexan"));
 assert(app.dom["case-handoff-0"].href.includes("context=MW-024"));
 app.input("hypothesis","Cyclohexan ist nicht planar");
 app.click("next-step");
 assert(app.dom["step-body"].innerHTML.includes("Molekül analysieren"));
 assert(app.dom["step-body"].innerHTML.includes("Konformere berechnen"));
 assert(app.dom["step-body"].innerHTML.includes("Optional: MOL_LAB in Colab öffnen"));
 assert(app.dom["step-body"].innerHTML.includes("Ringinversion"));
 assert.equal(source.learning_paths[4].observationTasks.length,3);
 assert(app.dom["step-body"].innerHTML.includes('id="observation-part-0"'));
 assert(app.dom["step-body"].innerHTML.includes('id="observation-part-1"'));
 assert(app.dom["step-body"].innerHTML.includes('id="observation-part-2"'));
 assert(app.dom["step-body"].innerHTML.includes("Freiwillige Vertiefung"));
 app.miniObservation(0,"Der Ring ist nicht flach.");
 app.miniObservation(1,"Sessel: Null, Halbsessel: größter Wert.");
 app.miniObservation(2,"Sessel und Twist sind Minima.");
 assert.deepEqual(app.current().cases["MW-024"].observationParts,[
   "Der Ring ist nicht flach.",
   "Sessel: Null, Halbsessel: größter Wert.",
   "Sessel und Twist sind Minima."
 ]);
 app.input("observation","Ich sehe eine Sesselstruktur");
 app.click("next-step");
 assert(!app.dom["step-body"].innerHTML.includes("Winkel- und Torsionsspannung deutlich reduziert"),
   "Cyclohexan explanation should be hidden before user requests it");
 app.click("reveal-answer");
 assert(app.dom["step-body"].innerHTML.includes("Winkel- und Torsionsspannung deutlich reduziert"));
 app.click("next-step");
 app.input("conclusion","Sessel: gestaffelte Bindungen");
 assert(app.dom["report-preview"].textContent.includes("MW-024"));
 assert(app.dom["report-preview"].textContent.includes("Sessel und Twist sind Minima."));
 assert(app.dom["report-preview"].textContent.includes("Der Ring ist nicht flach."));
 app.click("start-case");
 assert.equal(app.current().hypothesis,"Meine alte MW-001 Vermutung");
 app.click("select-case","MW-024");
 assert(app.dom["step-body"].innerHTML.includes("Sessel: gestaffelte Bindungen"));
 app.click("reset-case");
 assert.equal(app.current().cases["MW-024"].conclusion,"");
 assert.deepEqual(app.current().cases["MW-024"].observationParts,[]);
 assert.equal(app.current().cases["MW-009"].hypothesis,"Aldehyd statt Keton");
 assert.equal(app.current().cases["MW-015"].variants.Wasser.hypothesis,"Wasser ist gewinkelt");
 assert.equal(app.current().cases["MW-002"].hypothesis,"Gespeicherte MW002-Hypothese");
 assert.equal(app.current().hypothesis,"Meine alte MW-001 Vermutung");

 // Deep link to each new path must reopen exactly that task after browser refresh.
 for(const id of ["MW-009","MW-015","MW-024"]){
  const copy=simulate(app.current(),"https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/?case="+id+"#aufgabe");
  await new Promise(resolve=>setImmediate(resolve));
  assert(copy.dom["case-eyebrow"].textContent.includes(id),"deep link failed for "+id);
 }
 console.log("5 paths, A/B/C templates, independent B-variants, previous state migration, hidden explanations, reset and deep links: OK");
}
test().catch(error=>{console.error(error);process.exitCode=1;});
