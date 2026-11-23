"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const dir=path.join(__dirname,"..");
const read=p=>JSON.parse(fs.readFileSync(path.join(dir,p),"utf8"));
const catalog=read("data/forschungswege_katalog_v0.1.json");
const manifest=read("data/didactic_quellen_manifest_v0.1.json");
const published=read("data/learning_paths.json");
assert.equal(catalog.version,"0.1");
assert.equal(catalog.sourceSha,manifest.sourceSha,"catalog and manifest source versions differ");
assert.equal(manifest.entries.length,61);
assert.equal(manifest.isomerPairs.length,7);
assert.equal(manifest.polarityPairs.length,7);
assert.equal(catalog.paths.length,30);
const ids=catalog.paths.map(p=>p.id);
assert.equal(new Set(ids).size,ids.length,"research path ID duplication");
assert.deepEqual(ids,Array.from({length:30},(_,i)=>"MW-"+String(i+1).padStart(3,"0")));
const sourceKeys=new Map(manifest.entries.map(e=>[e.module+"/"+e.id,e]));
assert.equal(sourceKeys.size,61,"DIDACTIC source module IDs must be unique");
const counts={A:0,B:0,C:0};
const coverage=new Set(),smiles=new Set();
let pairCount=0,liveCount=0;
for(const p of catalog.paths){
 assert(Object.hasOwn(counts,p.template),"unknown lesson template "+p.id);
 counts[p.template]++;
 assert(["planned","live"].includes(p.status));
 if(p.status==="live"){
   liveCount++;
   assert(published.learning_paths.some(x=>x.id===p.id),p.id+" marked live without implemented learning path");
 }else{
   assert(!published.learning_paths.some(x=>x.id===p.id),p.id+" planned but already in active learning path data");
 }
 assert(typeof p.question==="string"&&p.question.length>15,p.id+" lacks research question");
 assert(p.learningGoal&&p.modelLimits&&p.sourceRefs.length,"missing didactic metadata for "+p.id);
 assert.equal(p.primaryTool,"MOL_LAB_DIDACTIC","DIDACTIC should be default educational source");
 if(p.template==="C")assert(p.optionalTools.includes("MOL_LAB"),"missing scientific conformer path");
 for(const ref of p.sourceRefs){
   const key=ref.module+"/"+ref.id;
   const source=sourceKeys.get(key);
   assert(source,"unknown DIDACTIC card "+key);
   assert.equal(ref.smiles,source.smiles,"SMILES mismatch for "+key);
   assert.equal(ref.name,source.name,"name mismatch for "+key);
   assert.equal(ref.sourceModuleEntryKey,key);
   coverage.add(key);smiles.add(ref.smiles);
 }
 if(p.sourcePair){
   pairCount++;
   if(p.sourcePair.collection==="isomer"){
     const pair=manifest.isomerPairs.find(x=>[x.left,x.right].includes(p.sourcePair.key));
     assert(pair,p.id+" unknown isomer pair "+p.sourcePair.key);
     const pairedNames=p.sourceRefs.map(x=>x.name);
     assert(pairedNames.includes(pair.left)&&pairedNames.includes(pair.right),p.id+" missing isomer pair constituents");
   }else{
     assert.equal(p.sourcePair.collection,"polarity");
     const pair=manifest.polarityPairs.find(x=>x.key===p.sourcePair.key);
     assert(pair,p.id+" unknown polarity pair");
     assert(p.sourceRefs.some(x=>x.name===pair.a));
     assert(p.sourceRefs.some(x=>x.name===pair.b));
   }
 }
}
assert.deepEqual(counts,{A:14,B:10,C:6});
assert.equal(pairCount,14);
assert.equal(liveCount,2);
assert.equal(coverage.size,61,"not all DIDACTIC entries represented");
assert.equal(smiles.size,53,"not all distinct DIDACTIC SMILES represented");
assert.equal(catalog.sourceModuleEntries,61);
assert.equal(catalog.coveredSourceEntries,61);
assert.equal(catalog.sourceUniqueSmiles,53);
assert.equal(catalog.coveredDistinctSmiles,53);
assert.equal(manifest.entries.filter(x=>x.physicalDataFields===0).length,35);
assert.equal(manifest.entries.filter(x=>x.isGenericQuestion).length,7);
console.log("Research catalog: 30 paths, 14 original pairs, 61/61 module entries, 53/53 SMILES and 2 live paths – OK");
