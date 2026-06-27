// Winkhaus BOM Calculator — GEALAN 자동입력
(function(){
  'use strict';
  function init(){
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const w = params.get('w');
    const h = params.get('h');
    const rail = params.get('rail');
    const qty = params.get('qty');
    const dir = params.get('dir');
    const autocalc = params.get('autocalc') === '1';
    if (!type && !w && !h) return;
    
    const tabMap = {
      'TS': 'ts_damper', 'TT': 'tt_basic',
      'TO': 'to', 'PJ': 'pj', 'PROJ': 'pj',
      'DOOR': 'door_cyl'
    };
    const targetTab = tabMap[type] || type;
    
    if (targetTab) {
      const tabBtn = document.querySelector('button.tab[data-tab="' + targetTab + '"]');
      if (tabBtn) tabBtn.click();
    }
    
    setTimeout(function(){
      setInput('w', w);
      setInput('h', h);
      setInput('rail', rail);
      setInput('qty', qty);
      
      if (dir) {
        const dirBtn = document.querySelector('button.seg-btn[data-dir="' + dir.toUpperCase() + '"]');
        if (dirBtn) dirBtn.click();
      }
      
      if (autocalc) {
        setTimeout(function(){
          const calcBtn = Array.from(document.querySelectorAll('button')).find(function(b){
            return b.textContent.trim().includes('계산하기');
          });
          if (calcBtn) calcBtn.click();
        }, 100);
      }
    }, 300);
    
    function setInput(name, value){
      if (!value) return;
      const inp = document.querySelector('input[data-input="' + name + '"]');
      if (inp) {
        inp.value = value;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
