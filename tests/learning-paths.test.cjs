"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const base=path.join(__dirname,"..");
const paths=JSON.parse(fs.readFileSync(path.join(base,"data/learning_paths.json"),"utf8"));
const ids=paths.learning_paths.map(x=>x.id);
assert.deepEqual(ids,["MW-001","MW-002"],"pilot cases must retain predictable IDs");
for(const lesson of paths.learning_paths){
 assert(lesson.question && lesson.molecules.length===2,lesson.id+" source incomplete");
 assert(lesson.notebookSteps.length===4,lesson.id+" instructions missing");
 assert(lesson.explanation.length>=2,lesson.id+" explanation missing");
 for(const mol of lesson.molecules) assert(mol.smiles && mol.name,lesson.id+" invalid molecule");
}
const mw2=paths.learning_paths[1];
assert.deepEqual(mw2.molecules.map(x=>x.smiles),["O","S"]);
assert.equal(mw2.targetModule,"Polarität und Löslichkeit");
assert.equal(mw2.targetExample,"Wasser vs. Schwefelwasserstoff");
assert(mw2.notebookSteps[3].includes("Polaritäts-/Löslichkeitsvergleich"));

const tools=JSON.parse(fs.readFileSync(path.join(base,"data/tools.json"),"utf8"));
const code=fs.readFileSync(path.join(base,"app.js"),"utf8");
const elements=fs.readFileSync(path.join(base,"index.html"),"utf8");
new Function(code);
assert(elements.includes('data-case="MW-002"'),"MW-002 start button absent");

function simulate(initial){
  const store={"molekuelwerkstatt:v0.1":JSON.stringify(initial)};
  const dom={};
  const listeners={};
  const doc={
    getElementById(id){
      if(!dom[id]){
        dom[id]={id,innerHTML:"",textContent:"",value:"",hidden:false,disabled:false,
          dataset:{},classList:{add(){},remove(){}},setAttribute(){},removeAttribute(){}};
      }
      return dom[id];
    },
    querySelector(selector){return {
      dataset:{},textContent:"",href:"",setAttribute(){},removeAttribute(){}
    };},
    querySelectorAll(selector){return [];},
    addEventListener(name,callback){listeners[name]=callback;}
  };
  const win={
    location:{href:"https://ekerzendorfer.github.io/MOLEKUELWERKSTATT/#aufgabe",search:"",hash:"#aufgabe"},
    addEventListener(){},scrollTo(){},
    history:{replaceState(a,b,url){
      win.location.href=url;
      const u=new URL(url);win.location.search=u.search;win.location.hash=u.hash;
    }},
    MoleculeHandoff:{makeLink(base,detail){
      return base+"?smiles="+encodeURIComponent(detail.smiles)+"&context="+encodeURIComponent(detail.context);
    }},
    confirm(){return true;}
  };
  const localStorage={
    getItem(k){return store[k]||null;},
    setItem(k,v){store[k]=v;}
  };
  const ctx={document:doc,window:win,localStorage,URL,URLSearchParams,
    navigator:{clipboard:{writeText:async()=>{}}},Blob,console,
    setTimeout(){},fetch(url){
      const p=url.endsWith("learning_paths.json")?paths:tools;
      return Promise.resolve({ok:true,json:()=>Promise.resolve(p)});
    }
  };
  vm.runInNewContext(code,ctx,{filename:"app.js"});
  const clickAction=(action,caseId)=>{
    listeners.click({target:{closest(selector){
      return selector==="[data-action]"?{dataset:{action,case:caseId}}:null;
    }}});
  };
  const input=(field,text)=>{
    listeners.input({target:{dataset:{field},value:text,id:field&&"field-"+field}});
  };
  return {store,dom,win,clickAction,input,listeners};
}
async function test(){
  const app=simulate({
    view:"aufgabe",step:2,hypothesis:"Vorhandene MW-001-Vermutung",
    observation:"Alte Beobachtung",interpretation:"Alte Deutung",conclusion:"",
    investigated:true,explanation:false,done:false,freeSmiles:"CCO",selectedExample:1
  });
  await new Promise(resolve=>setImmediate(resolve));
  const key="molekuelwerkstatt:v0.1";
  assert(app.dom["case-title"].textContent.includes("Summenformel"));
  assert(app.dom["step-body"].innerHTML.includes("Alte Deutung"));
  assert.equal(JSON.parse(app.store[key]).hypothesis,"Vorhandene MW-001-Vermutung");
  app.clickAction("select-case","MW-002");
  assert(app.dom["case-title"].textContent.includes("Schwefelwasserstoff"));
  assert(app.dom["case-molecules"].innerHTML.includes("Wasser"));
  assert(app.dom["case-molecules"].innerHTML.includes('data-copy="S"'));
  assert.equal(app.win.location.search,"?case=MW-002");
  assert.equal(app.dom["step-body"].innerHTML.includes("Alte Deutung"),false);
  app.input("hypothesis","MW-002: Wasserstoffbrücken");
  assert.equal(JSON.parse(app.store[key]).cases["MW-002"].hypothesis,"MW-002: Wasserstoffbrücken");
  assert.equal(JSON.parse(app.store[key]).hypothesis,"Vorhandene MW-001-Vermutung");
  app.clickAction("next-step");
  assert(app.dom["step-body"].innerHTML.includes("Polaritäts-/Löslichkeitsvergleich"));
  assert(app.dom["step-body"].innerHTML.includes("Wasser vs. Schwefelwasserstoff"));
  app.input("observation","Wasser flüssig, H₂S gasförmig.");
  app.clickAction("next-step");
  assert(!app.dom["step-body"].innerHTML.includes("Wasserstoffbrücken-Netzwerk"),
    "Explanation should remain hidden until requested");
  app.clickAction("reveal-answer");
  assert(app.dom["step-body"].innerHTML.includes("Wasserstoffbrücken-Netzwerk"));
  app.clickAction("next-step");
  app.input("conclusion","Wasser bildet starke Wasserstoffbrücken.");
  assert(app.dom["report-preview"].textContent.includes("MW-002"));
  app.clickAction("start-case");
  assert(app.dom["step-body"].innerHTML.includes("Alte Deutung"),
    "MW-001 should reopen at its previous step");
  assert(!app.win.location.search,"MW-001 link should not inherit MW-002 query");
  app.clickAction("select-case","MW-002");
  assert(app.dom["step-body"].innerHTML.includes("Wasser bildet starke Wasserstoffbrücken."),
    "MW-002 conclusion survives switching cases");
  assert.equal(JSON.parse(app.store[key]).cases["MW-002"].conclusion,"Wasser bildet starke Wasserstoffbrücken.");
  app.clickAction("reset-case");
  assert.equal(JSON.parse(app.store[key]).cases["MW-002"].conclusion,"");
  assert.equal(JSON.parse(app.store[key]).hypothesis,"Vorhandene MW-001-Vermutung");
  console.log("MW-001 migration, MW-002 states, instructions, hidden explanation, handoff contexts and reset: OK");
}
test().catch(error=>{console.error(error);process.exitCode=1;});
