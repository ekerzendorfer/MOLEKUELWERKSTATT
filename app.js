/* MOLEKÜL-WERKSTATT V0.4 – 3 research templates, 5 active paths, independent notes */
(function () {
  "use strict";
  // Keep original storage key: MW-001 flat fields and MW-002 data must survive the update.
  var STORE_KEY="molekuelwerkstatt:v0.1";
  var PATH_IDS=["MW-001","MW-002","MW-009","MW-015","MW-024"];
  var VARIANT_ID="MW-015";
  var VARIANT_NAMES=["Kohlenstoffdioxid","Wasser","Ammoniak","Methan"];
  var STEPS=["Vermuten","Untersuchen","Deuten","Sichern"];
  var VIEWS=["start","aufgabe","frei"];
  var NOTE_FIELDS=["hypothesis","observation","interpretation","conclusion"];
  var emptyCase={step:0,hypothesis:"",observation:"",observationParts:[],interpretation:"",conclusion:"",
    investigated:false,explanation:false,done:false};
  var data=null,toolData=null,canSave=true,state=readState();

  function elem(id){return document.getElementById(id);}
  function escapeHtml(value){
    return String(value==null?"":value).replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function cleanCase(obj){
    var result=Object.assign({},emptyCase);
    if(obj&&typeof obj==="object"&&!Array.isArray(obj)){
      Object.keys(emptyCase).forEach(function(key){
        if(typeof obj[key]===typeof result[key])result[key]=obj[key];
      });
    }
    result.step=Math.min(3,Math.max(0,Math.floor(result.step)||0));
    NOTE_FIELDS.forEach(function(key){result[key]=result[key].slice(0,4000);});
    result.observationParts=Array.isArray(obj&&obj.observationParts)?
      obj.observationParts.slice(0,5).map(function(value){
        return typeof value==="string"?value.slice(0,1200):"";
      }):[];
    return result;
  }
  function readState(){
    var saved={};
    try{var raw=localStorage.getItem(STORE_KEY);if(raw)saved=JSON.parse(raw)||{};}
    catch(error){canSave=false;}
    var defaults={view:"start",caseId:"MW-001",freeSmiles:"CCO",selectedExample:1};
    var result=Object.assign({},cleanCase(saved),defaults);
    Object.keys(defaults).forEach(function(key){
      if(typeof saved[key]===typeof defaults[key])result[key]=saved[key];
    });
    if(!VIEWS.includes(result.view))result.view="start";
    if(!PATH_IDS.includes(result.caseId))result.caseId="MW-001";
    result.freeSmiles=result.freeSmiles.slice(0,3000);
    result.selectedExample=Math.trunc(result.selectedExample);
    var older=saved.cases&&typeof saved.cases==="object"?saved.cases:{};
    result.cases={};
    ["MW-002","MW-009","MW-024"].forEach(function(id){
      result.cases[id]=cleanCase(older[id]);
    });
    var old15=older[VARIANT_ID]&&typeof older[VARIANT_ID]==="object"?older[VARIANT_ID]:{};
    var selected=VARIANT_NAMES.includes(old15.selectedMolecule)?old15.selectedMolecule:VARIANT_NAMES[0];
    result.cases[VARIANT_ID]={selectedMolecule:selected,variants:{}};
    VARIANT_NAMES.forEach(function(name){
      result.cases[VARIANT_ID].variants[name]=cleanCase(old15.variants&&old15.variants[name]);
    });
    return result;
  }
  function persist(){
    if(!canSave)return;
    try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}
    catch(error){canSave=false;notice("Speichern ist hier nicht verfügbar. Notizen bitte kopieren.");}
  }
  function notice(message){var n=elem("notice");n.textContent=message;n.hidden=false;}
  function clearNotice(){elem("notice").hidden=true;}
  function currentPath(){
    if(!data||!Array.isArray(data.learning_paths))return null;
    return data.learning_paths.find(function(p){return p.id===state.caseId;})||null;
  }
  function selectedMolecule(){
    var p=currentPath();
    if(!p)return null;
    var name=state.cases[VARIANT_ID].selectedMolecule;
    return p.template==="B"?p.molecules.find(function(m){return m.name===name;})||p.molecules[0]:p.molecules[0];
  }
  function activeNotes(){
    if(state.caseId==="MW-001")return state; // historical MW-001 flat fields
    if(state.caseId===VARIANT_ID){
      var b=state.cases[VARIANT_ID];
      return b.variants[b.selectedMolecule];
    }
    return state.cases[state.caseId];
  }
  function hasProgress(id){
    var cases=id===VARIANT_ID?
      Object.values(state.cases[VARIANT_ID].variants):
      [id==="MW-001"?state:state.cases[id]];
    return cases.some(function(c){
      return c.done||c.step>0||NOTE_FIELDS.some(function(k){return !!c[k].trim();})||
         (c.observationParts||[]).some(function(v){return !!v.trim();});
    });
  }
  function toolUrl(id){
    var t=((toolData&&toolData.tools)||[]).find(function(x){return x.id===id;});
    return t&&/^https:\/\//.test(t.url)?t.url:"";
  }
  function molLink(smiles,name,context){
    if(!window.MoleculeHandoff)throw Error("Das Übergabemodul fehlt.");
    return window.MoleculeHandoff.makeLink(toolUrl("MOLLAB_PRO"),
      {smiles:smiles,name:name,context:context});
  }
  function renderHome(){
    var first=document.querySelector('[data-action="start-case"]');
    if(first)first.textContent=hasProgress("MW-001")?
      "An MW-001 weiterarbeiten →":"Vergleich MW-001 starten →";
    if(!data)return;
    var more=elem("case-choices");
    more.innerHTML=data.learning_paths.filter(function(p){return p.id!=="MW-001";}).map(function(p){
      var description=p.id==="MW-015"?"Vier Moleküle zur Wahl – ein Beispiel genügt.":
        p.id==="MW-024"?"Vier Ringformen in drei kurzen Beobachtungsaufgaben.":
        p.id==="MW-009"?"Aldehyd und Keton bei gleicher Summenformel.":
        "Wasserstoffbrücken und zwischenmolekulare Kräfte.";
      var kind=p.template==="A"?"Vergleichen":p.template==="B"?"Entdecken":"Konformere";
      return '<article class="case-choice-card"><span class="case-kicker">'+escapeHtml(p.id)+
        ' · '+kind+'</span><h3>'+escapeHtml(p.title)+'</h3><p>'+description+
        '</p><button type="button" class="btn btn-secondary" data-action="select-case" data-case="'+
        escapeHtml(p.id)+'">'+(hasProgress(p.id)?"Weiterarbeiten →":"Forschungsweg starten →")+
        '</button></article>';
    }).join("");
  }
  function renderCaseHeader(){
    var p=currentPath();if(!p)return;
    elem("case-eyebrow").textContent="Geführter Lernweg · "+p.id+
      " · "+(p.template==="A"?"Vergleichen":p.template==="B"?"Molekülgeometrie":"Konformere");
    elem("case-title").textContent=p.title;
    elem("case-intro").textContent=p.intro||p.question;
    elem("case-side-heading").textContent=p.template==="B"?
      "Wähle ein Molekül – optional weitere ansehen":"Die untersuchten Moleküle";
    var chosen=selectedMolecule();
    elem("case-molecules").innerHTML=p.molecules.map(function(m,i){
      var formula=m.formula==="C2H6O"?"C₂H₆O":m.formula;
      var selected=p.template==="B"&&chosen&&m.name===chosen.name;
      return '<div class="'+(selected?'active-molecule':'')+'"><strong>'+escapeHtml(m.name)+
        (selected?' · aktuell':'')+'</strong><small>'+escapeHtml(m.kind||(i===0?"Alkohol":"Ether"))+
        ' · '+escapeHtml(formula)+'</small><code>'+escapeHtml(m.smiles)+'</code>'+
        '<button type="button" class="copy-mini" data-copy="'+escapeHtml(m.smiles)+
        '" aria-label="SMILES von '+escapeHtml(m.name)+' kopieren">SMILES kopieren</button>'+
        '<a id="case-handoff-'+i+'" class="case-handoff" href="'+escapeHtml(toolUrl("MOLLAB_PRO"))+
        '" target="_blank" rel="noopener noreferrer">In 2D/3D betrachten ↗</a></div>';
    }).join("");
    p.molecules.forEach(function(m,i){
      var link=elem("case-handoff-"+i);if(!link)return;
      try{link.href=molLink(m.smiles,m.name,p.id);link.title=m.name+" im MOLLAB_PRO öffnen";}
      catch(error){link.removeAttribute("href");link.title=error.message;}
    });
  }
  function showView(view,updateHash){
    if(!VIEWS.includes(view))view="start";
    state.view=view;persist();clearNotice();
    VIEWS.forEach(function(v){elem("view-"+v).hidden=(v!==view);});
    document.querySelectorAll(".nav-btn[data-view]").forEach(function(b){
      if(b.dataset.view===view)b.setAttribute("aria-current","page");
      else b.removeAttribute("aria-current");
    });
    if(view==="aufgabe"){renderCaseHeader();renderStep();}
    if(view==="start")renderHome();
    if(view==="frei")renderFree();
    if(updateHash&&window.location.hash!=="#"+view)window.location.hash=view;
    window.scrollTo({top:0,behavior:"instant"});
  }
  function selectCase(id){
    if(!data||!data.learning_paths.some(function(p){return p.id===id;}))return;
    state.caseId=id;persist();
    var url=new URL(window.location.href);
    if(id==="MW-001")url.searchParams.delete("case");
    else url.searchParams.set("case",id);
    url.hash="aufgabe";window.history.replaceState(null,"",url.href);
    showView("aufgabe",false);
  }
  function selectMolecule(name){
    var p=currentPath();
    if(!p||p.template!=="B"||!p.molecules.some(function(m){return m.name===name;}))return;
    state.cases[VARIANT_ID].selectedMolecule=name;
    persist();renderCaseHeader();renderStep();
  }
  function stepTo(n){activeNotes().step=Math.min(3,Math.max(0,n));persist();renderStep();}
  function renderStatus(){
    var n=activeNotes(),count=NOTE_FIELDS.filter(function(k){return !!n[k].trim();}).length;
    if(state.caseId==="MW-024"&&!n.observation.trim()&&
       (n.observationParts||[]).some(function(v){return !!v.trim();}))count++;
    var text=count+" von 4 Notizfeldern bearbeitet";
    if(n.investigated)text+=" · Untersuchung selbst bestätigt";
    if(n.done)text+=" · abgeschlossen";
    if(state.caseId===VARIANT_ID)text+=" · "+state.cases[VARIANT_ID].selectedMolecule;
    elem("case-status").textContent=text+".";
  }
  function variantSelector(p){
    if(p.template!=="B")return "";
    var name=state.cases[VARIANT_ID].selectedMolecule;
    return '<div class="variant-selector"><label for="variant-select">Welches Molekül möchtest du untersuchen?</label>'+
      '<select id="variant-select">'+p.molecules.map(function(m){
        return '<option value="'+escapeHtml(m.name)+'"'+(m.name===name?' selected':'')+'>'+
          escapeHtml(m.name)+'</option>';
      }).join("")+'</select>'+
      '<p>Ein Beispiel genügt. Beim Wechsel bleiben die Notizen für jedes Molekül getrennt gespeichert.</p></div>';
  }
  function renderStep(){
    var p=currentPath(),n=activeNotes();if(!p)return;
    var step=n.step;
    elem("step-fraction").textContent="Schritt "+(step+1)+" von 4";
    elem("steps").innerHTML=STEPS.map(function(label,i){
      return '<button type="button" data-step="'+i+'" class="step-button'+(i<step?' step-done':'')+
        '"'+(i===step?' aria-current="step"':'')+'><span class="step-line" aria-hidden="true"></span><span>'+
        (i+1)+'. '+label+'</span></button>';
    }).join("");
    var chosen=selectedMolecule(),name=chosen?chosen.name:"";
    var html=variantSelector(p);
    if(step===0){
      var particular=p.variantQuestions&&p.variantQuestions[name];
      html+='<p class="eyebrow dark">Schritt 1 · eigene Idee</p><h4>Was vermutest du?</h4>'+
        '<p class="question">'+escapeHtml(particular||p.question)+'</p>'+
        '<p>'+escapeHtml(p.predictionHint||"Überlege zunächst, was du erwartest.")+'</p>'+
        '<label class="field-label" for="field-hypothesis">Deine erste Vermutung</label>'+
        '<textarea id="field-hypothesis" data-field="hypothesis" maxlength="4000" placeholder="Ich vermute, dass …">'+
        escapeHtml(n.hypothesis)+'</textarea>'+
        '<p class="example-input">Die Erklärung bleibt vorerst verborgen. Halte deine erste Idee fest.</p>';
    }else if(step===1){
      var steps=p.notebookSteps.map(function(line){
        line=line.replace(/\{name\}/g,name);
        var colon=line.indexOf(":");
        return '<li>'+(colon>=0?'<strong>'+escapeHtml(line.slice(0,colon+1))+'</strong> '+
          escapeHtml(line.slice(colon+1).trim()):escapeHtml(line))+'</li>';
      }).join("");
      var heading=p.template==="A"?"Vergleiche die beiden Moleküle":
        p.template==="B"?"Untersuche "+name:"Untersuche die räumliche Ringstruktur";
      html+='<p class="eyebrow dark">Schritt 2 · digital untersuchen</p><h4>'+escapeHtml(heading)+'</h4>'+
        '<p>'+escapeHtml(p.investigationIntro)+'</p>'+
        '<div class="callout"><strong>Im DIDACTIC-Notebook:</strong><ol class="notebook-steps">'+
        steps+'</ol></div>'+
        '<div class="lab-launch"><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="'+
        escapeHtml(toolUrl("MOL_LAB_DIDACTIC"))+'">MOL_LAB DIDACTIC öffnen ↗</a>'+
        '<span class="tool-note">Öffnet in einem neuen Tab. Die Colab-Laufzeit muss gestartet werden; es erfolgt keine automatische Auswahl.</span></div>';
      if(p.optionalDeepTool){
        html+='<div class="deep-link-panel"><strong>'+escapeHtml(p.deepTitle||"Wissenschaftliche Vertiefung")+
          '</strong><p>'+escapeHtml(p.deepDescription||"")+'</p>'+
          '<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="'+
          escapeHtml(toolUrl(p.optionalDeepTool))+'">Optional: MOL_LAB in Colab öffnen ↗</a></div>';
      }
      html+='<label class="check-row"><input type="checkbox" id="investigated"'+(n.investigated?' checked':'')+
        '>Ich habe die Untersuchung im externen Werkzeug selbst durchgeführt.</label>'+
        '<p class="field-label">'+escapeHtml(p.observationPrompt||"Was hast du beobachtet?")+'</p>';
      if(Array.isArray(p.observationTasks)&&p.observationTasks.length){
        html+=p.observationTasks.map(function(task,i){
          return '<section class="micro-observation" aria-labelledby="observation-title-'+i+'">'+
            '<h5 id="observation-title-'+i+'">'+escapeHtml(task.title)+'</h5>'+
            '<p>'+escapeHtml(task.question)+'</p>'+
            '<p class="example-input">'+escapeHtml(task.hint||"")+'</p>'+
            '<label class="field-label" for="observation-part-'+i+'">Deine Antwort</label>'+
            '<textarea id="observation-part-'+i+'" data-observation-index="'+i+
            '" maxlength="1200" placeholder="'+escapeHtml(task.placeholder||"Ich sehe …")+'">'+
            escapeHtml((n.observationParts||[])[i]||"")+'</textarea></section>';
        }).join("");
        if(p.advancedObservation){
          html+='<details class="micro-advanced"><summary>Freiwillige Vertiefung: Torsionswinkel und Koplanarität</summary>'+
            '<p>'+escapeHtml(p.advancedObservation)+'</p></details>';
        }
        html+='<label class="field-label" for="field-observation">Weitere Beobachtungen (freiwillig)</label>';
      }else{
        html+='<label class="field-label" for="field-observation">Deine Beobachtung</label>';
      }
      html+='<textarea id="field-observation" data-field="observation" maxlength="4000" placeholder="'+
        escapeHtml(p.observationPlaceholder||"Meine Beobachtung …")+'">'+escapeHtml(n.observation)+'</textarea>'+
        (p.id==="MW-002"?
          '<p class="example-input">H₂S ist giftig – diese Aufgabe ist ausschließlich für die digitale Untersuchung vorgesehen.</p>':
          '<p class="example-input">Die Untersuchungsbestätigung ist eine Selbstangabe. Es werden keine Ergebnisse aus Colab übernommen.</p>');
    }else if(step===2){
      html+='<p class="eyebrow dark">Schritt 3 · chemisch begründen</p><h4>Wie erklärst du das Ergebnis?</h4>'+
        '<p class="question">'+escapeHtml(p.interpretationQuestion)+'</p>'+
        '<label class="field-label" for="field-interpretation">Deine Begründung</label>'+
        '<textarea id="field-interpretation" data-field="interpretation" maxlength="4000" placeholder="'+
        escapeHtml(p.interpretationPlaceholder||"Meine Erklärung …")+'">'+escapeHtml(n.interpretation)+'</textarea>'+
        '<div class="reveal">'+(n.explanation?
          '<div class="answer-box"><strong>Fachliche Erklärung</strong>'+
          p.explanation.map(function(x){return '<p>'+escapeHtml(x)+'</p>';}).join("")+
          (p.variantExplanations&&p.variantExplanations[name]?
            '<p><strong>Bezug zu '+escapeHtml(name)+':</strong> '+escapeHtml(p.variantExplanations[name])+'</p>':'')+
          '</div>':
          '<button type="button" class="btn btn-outline" data-action="reveal-answer">Erklärung anzeigen – erst nach eigener Überlegung</button>')+
        '</div>';
    }else{
      html+='<p class="eyebrow dark">Schritt 4 · Erkenntnisse sichern</p>'+
        '<h4>Was nimmst du aus der Untersuchung mit?</h4>'+
        '<p>'+escapeHtml(p.conclusionPrompt)+'</p>'+
        '<label class="field-label" for="field-conclusion">Dein Fazit</label>'+
        '<textarea id="field-conclusion" data-field="conclusion" maxlength="4000" placeholder="'+
        escapeHtml(p.conclusionPlaceholder||"Meine Schlussfolgerung …")+'">'+escapeHtml(n.conclusion)+'</textarea>'+
        '<div class="callout secondary"><strong>Dein persönlicher Ergebnistext</strong>'+
        '<p>Enthält nur deine Notizen und die Leitfrage; keine Serverübertragung.</p>'+
        '<div class="report-actions">'+
        '<button type="button" class="btn btn-secondary" data-action="copy-report">Protokoll kopieren</button>'+
        '<button type="button" class="btn btn-outline" data-action="download-report">Als .md speichern</button></div>'+
        '<pre class="report" id="report-preview">'+escapeHtml(buildReport())+'</pre></div>';
    }
    if(p.caution){
      html+='<div class="callout warm"><strong>Grenze des Modells</strong><p>'+escapeHtml(p.caution)+'</p></div>';
    }
    elem("step-body").innerHTML=html;
    elem("prev-step").disabled=step===0;
    elem("next-step").textContent=step===3?(n.done?"Zur Übersicht →":"Aufgabe abschließen →"):"Weiter →";
    renderStatus();
  }
  function buildReport(){
    var p=currentPath(),n=activeNotes(),chosen=selectedMolecule();
    var molecules=p.template==="B"?[chosen]:p.molecules;
    return "# MOLEKÜL-WERKSTATT – "+p.id+"\n\n"+
      "**Leitfrage:** "+p.question+"\n"+
      "**Molekül"+(molecules.length===1?"":"e")+":** "+
        molecules.map(function(m){return m.name+" ("+m.smiles+")";}).join("; ")+"\n"+
      (p.template==="B"?"**Untersuchtes Beispiel:** "+chosen.name+"\n":"")+
      "\n## Vermutung\n"+(n.hypothesis.trim()||"(nicht eingetragen)")+
      "\n\n## Beobachtungen\n"+
      ((Array.isArray(p.observationTasks)&&p.observationTasks.length)?
       p.observationTasks.map(function(task,i){
         return "### "+task.title+"\n"+
                (((n.observationParts||[])[i]||"").trim()||"(nicht eingetragen)");
       }).join("\n\n")+
       (n.observation.trim()?"\n\nZusatznotiz: "+n.observation.trim():""):
       (n.observation.trim()||"(nicht eingetragen)"))+
      "\n\n## Deutung\n"+(n.interpretation.trim()||"(nicht eingetragen)")+
      "\n\n## Fazit\n"+(n.conclusion.trim()||"(nicht eingetragen)")+
      "\n\n**Digitale Untersuchung:** "+(n.investigated?"von mir bestätigt":"nicht bestätigt")+
      "\n**Hinweis:** Eigene Aufzeichnungen; keine automatische Auswertung oder Leistungsbeurteilung.\n";
  }
  function renderFree(){
    if(!data)return;
    elem("example-chips").innerHTML=data.free_examples.map(function(m,i){
      return '<button type="button" class="example-chip" data-example="'+i+
        '" aria-pressed="'+(i===state.selectedExample?'true':'false')+'">'+escapeHtml(m.name)+'</button>';
    }).join("");
    elem("free-smiles").value=state.freeSmiles;
    updateFreeLink();
    if(toolUrl("MOL_LAB"))elem("free-colab-link").href=toolUrl("MOL_LAB");
  }
  function updateFreeLink(){
    if(!toolData)return;
    var link=elem("free-mollab-link"),info=elem("free-transfer-status");
    var smiles=state.freeSmiles.trim(),selected=data&&data.free_examples[state.selectedExample];
    var name=selected&&selected.smiles===smiles?selected.name:"Eigenes Molekül";
    if(!smiles){
      link.href=toolUrl("MOLLAB_PRO");link.textContent="MOLLAB_PRO ohne Molekül öffnen ↗";
      info.textContent="Ohne ausgewählte Struktur wird der 2D-Sketcher leer geöffnet.";return;
    }
    try{
      link.href=molLink(smiles,name,"frei");
      link.textContent=name+" in MOLLAB_PRO öffnen ↗";
      info.textContent="Die 2D-Struktur wird übernommen. Die 3D-Erzeugung startest du dort selbst.";
    }catch(error){
      link.href=toolUrl("MOLLAB_PRO");
      link.textContent="MOLLAB_PRO ohne Übergabe öffnen ↗";
      info.textContent="Übergabe nicht möglich: "+error.message;
    }
  }
  async function copyText(text){
    if(!text){notice("Kein Text zum Kopieren eingetragen.");return;}
    try{await navigator.clipboard.writeText(text);notice("Text in die Zwischenablage kopiert.");}
    catch(error){
      var tmp=document.createElement("textarea");
      tmp.value=text;tmp.style.position="fixed";tmp.style.left="-9999px";
      document.body.appendChild(tmp);tmp.select();
      var ok=document.execCommand("copy");tmp.remove();
      notice(ok?"Text in die Zwischenablage kopiert.":"Text bitte markieren und manuell kopieren.");
    }
  }
  function downloadReport(){
    var p=currentPath(),chosen=selectedMolecule();
    var filename=p.id+(p.template==="B"?"_"+chosen.name.replace(/[^A-Za-z0-9_-]/g,"_"):"")+"_Forschungsprotokoll.md";
    var file=new Blob([buildReport()],{type:"text/markdown;charset=utf-8"});
    var url=URL.createObjectURL(file),a=document.createElement("a");
    a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  function resetCurrentCase(){
    var id=state.caseId,chosen=selectedMolecule();
    var label=id===VARIANT_ID?id+" · "+chosen.name:id;
    if(!window.confirm("Nur den Arbeitsstand von "+label+" auf diesem Gerät zurücksetzen?"))return;
    if(id==="MW-001"){
      Object.keys(emptyCase).forEach(function(key){state[key]=emptyCase[key];});
    }else if(id===VARIANT_ID){
      state.cases[VARIANT_ID].variants[chosen.name]=cleanCase(null);
    }else{
      state.cases[id]=cleanCase(null);
    }
    persist();renderStep();notice(label+" wurde zurückgesetzt; andere Arbeitsstände bleiben erhalten.");
  }
  document.addEventListener("click",function(event){
    var item=event.target.closest("[data-view]");
    if(item){showView(item.dataset.view,true);return;}
    item=event.target.closest("[data-view-link]");
    if(item){event.preventDefault();showView(item.dataset.viewLink,true);return;}
    item=event.target.closest("[data-step]");
    if(item&&state.view==="aufgabe"){stepTo(Number(item.dataset.step));return;}
    item=event.target.closest("[data-example]");
    if(item&&data){
      var ex=data.free_examples[Number(item.dataset.example)];
      if(ex){state.selectedExample=Number(item.dataset.example);state.freeSmiles=ex.smiles;persist();renderFree();}
      return;
    }
    item=event.target.closest("[data-copy]");
    if(item){copyText(item.dataset.copy);return;}
    var b=event.target.closest("[data-action]");
    if(!b)return;
    switch(b.dataset.action){
      case "start-case":selectCase("MW-001");break;
      case "select-case":selectCase(b.dataset.case);break;
      case "prev-step":stepTo(activeNotes().step-1);break;
      case "next-step":
        if(activeNotes().step<3)stepTo(activeNotes().step+1);
        else{activeNotes().done=true;persist();showView("start",true);
          notice(state.caseId+" ist als abgeschlossen markiert.");}
        break;
      case "reveal-answer":activeNotes().explanation=true;persist();renderStep();break;
      case "copy-report":copyText(buildReport());break;
      case "download-report":downloadReport();break;
      case "reset-case":resetCurrentCase();break;
      case "copy-free-smiles":copyText(state.freeSmiles.trim());break;
    }
  });
  document.addEventListener("input",function(event){
    var input=event.target,field=input.dataset.field;
    var index=input.dataset.observationIndex;
    if(index!==undefined&&state.caseId==="MW-024"){
      var pos=Number(index),p=currentPath(),n=activeNotes();
      if(Number.isInteger(pos)&&pos>=0&&p&&Array.isArray(p.observationTasks)&&
         pos<p.observationTasks.length){
        if(!Array.isArray(n.observationParts))n.observationParts=[];
        n.observationParts[pos]=input.value.slice(0,1200);
        n.done=false;persist();renderStatus();
      }
      return;
    }
    if(NOTE_FIELDS.includes(field)){
      var n=activeNotes();n[field]=input.value.slice(0,4000);n.done=false;
      persist();renderStatus();
      if(n.step===3&&elem("report-preview"))elem("report-preview").textContent=buildReport();
    }
    if(input.id==="free-smiles"){
      state.freeSmiles=input.value.slice(0,3000);state.selectedExample=-1;persist();
      document.querySelectorAll("[data-example]").forEach(function(b){b.setAttribute("aria-pressed","false");});
      updateFreeLink();
    }
  });
  document.addEventListener("change",function(event){
    if(event.target.id==="variant-select"){selectMolecule(event.target.value);return;}
    if(event.target.id==="investigated"){
      var n=activeNotes();n.investigated=event.target.checked;n.done=false;persist();renderStatus();
    }
  });
  function handleLocation(){
    var target=new URLSearchParams(window.location.search).get("case");
    var view=window.location.hash.slice(1);
    if(view==="aufgabe")state.caseId=PATH_IDS.includes(target)?target:"MW-001";
    showView(VIEWS.includes(view)?view:state.view,false);
  }
  window.addEventListener("hashchange",handleLocation);
  window.addEventListener("popstate",handleLocation);
  Promise.all([
    fetch("./data/learning_paths.json").then(function(r){if(!r.ok)throw Error("Lernwege nicht geladen");return r.json();}),
    fetch("./data/tools.json").then(function(r){if(!r.ok)throw Error("Werkzeugliste nicht geladen");return r.json();})
  ]).then(function(result){
    data=result[0];toolData=result[1];
    if(!Array.isArray(data.learning_paths)||data.learning_paths.length!==5 ||
      !PATH_IDS.every(function(id){return data.learning_paths.some(function(p){
        return p.id===id&&p.molecules.length>=1&&p.notebookSteps.length>=4&&p.explanation.length>=2&&
          ["A","B","C"].includes(p.template);
      });}))throw Error("Lernwege unvollständig");
    var selected=data.free_examples[state.selectedExample];
    if(state.selectedExample>=0&&(!selected||selected.smiles!==state.freeSmiles))state.selectedExample=-1;
    handleLocation();persist();
    if(!canSave)notice("Lokales Speichern ist hier deaktiviert; Notizen bitte kopieren.");
  }).catch(function(error){
    notice("Aufgabendaten konnten nicht geladen werden. Bitte Seite neu laden. ("+error.message+")");
    document.querySelectorAll('[data-action="start-case"],[data-action="select-case"]').forEach(function(b){b.disabled=true;});
  });
})();
