// One focus boundary for drawers and dialogs, including dynamically rendered forms.
export function initFocusManagement(){
 let active=null,scheduled=false;
 const visible=element=>element.isConnected&&!element.hidden&&getComputedStyle(element).display!=='none'&&element.getClientRects().length>0;
 const controls=element=>[...element.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node=>!node.disabled&&node.tabIndex>=0&&visible(node));
 const release=()=>{if(!active)return;const previous=active;active=null;previous.inert.forEach(([node,value])=>node.inert=value);previous.element.removeAttribute('aria-modal');for(const name of ['role','tabindex']){const value=previous.attributes[name];if(value===null)previous.element.removeAttribute(name);else previous.element.setAttribute(name,value);}if(previous.opener?.isConnected)previous.opener.focus();};
 const check=()=>{
  scheduled=false;
  const dialogs=[...document.querySelectorAll('[id$="-modal"]')].filter(visible);
  const drawer=document.querySelector('.navigation-open #sidebar-container');
  const element=dialogs.at(-1)||drawer;
  if(active?.element===element)return;release();if(!element)return;
  const inert=[];let branch=element;
  while(branch.parentElement&&branch.parentElement!==document.documentElement){for(const sibling of branch.parentElement.children)if(sibling!==branch&&!['SCRIPT','STYLE','LINK'].includes(sibling.tagName)){inert.push([sibling,sibling.inert]);sibling.inert=true;}branch=branch.parentElement;}
  const opener=document.activeElement,attributes={role:element.getAttribute('role'),tabindex:element.getAttribute('tabindex')};element.setAttribute('role','dialog');element.setAttribute('aria-modal','true');if(!element.hasAttribute('aria-label')&&!element.hasAttribute('aria-labelledby'))element.setAttribute('aria-label',({'auth-modal':'Sign in','settings-modal':'AI settings','theme-studio-modal':'Appearance','custom-formula-modal':'Add formula','doubt-post-modal':'Add study note'})[element.id]||'Dialog');element.tabIndex=-1;active={element,opener,inert,attributes};(controls(element)[0]||element).focus();
 };
 const observer=new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(check);}});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden']});
 document.addEventListener('keydown',event=>{
  if(!active)return;const {element}=active;
  if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();if(element.id==='sidebar-container'){document.querySelector('.app-shell')?.classList.remove('navigation-open');document.getElementById('mobile-menu-toggle')?.setAttribute('aria-expanded','false');const backdrop=document.getElementById('sidebar-backdrop');if(backdrop)backdrop.hidden=true;}else element.classList.add('hidden');check();}
  if(event.key==='Tab'){const items=controls(element),first=items[0],last=items.at(-1);if(!items.length){event.preventDefault();element.focus();}else if(event.shiftKey&&(document.activeElement===first||document.activeElement===element)){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
 },true);
 document.addEventListener('focusin',event=>{if(active&&!active.element.contains(event.target))(controls(active.element)[0]||active.element).focus();});check();
 return ()=>{observer.disconnect();release();};
}
