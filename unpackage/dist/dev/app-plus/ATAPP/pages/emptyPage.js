
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"view { width: ",[0,750],"; height: ",[0,1200],"; background-color: ; }\n",],undefined,{path:"./pages/emptyPage.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/emptyPage.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      