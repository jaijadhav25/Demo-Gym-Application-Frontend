/* Progressive, vanilla-JS enhancements for the GymFlow public landing page. */
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function enhanceNavigation() {
    const header = $('.landing-header'), nav = $('.landing-nav'), links = $('.landing-nav-links');
    if (!header || !nav || !links) return;
    const actions = nav.lastElementChild;
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.className = 'landing-mobile-toggle'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation');
    toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    const firstAction = actions?.querySelector('a');
    if (firstAction) actions.insertBefore(toggle, firstAction); else actions?.append(toggle);
    const drawer = document.createElement('nav'); drawer.className = 'landing-mobile-menu'; drawer.setAttribute('aria-label', 'Mobile navigation');
    $$('.landing-nav-links a').forEach(link => { const copy = document.createElement('a'); copy.href = link.getAttribute('href'); copy.textContent = link.textContent.trim(); drawer.append(copy); });
    nav.append(drawer);
    const setOpen = open => { drawer.classList.toggle('is-open', open); nav.classList.toggle('menu-open',open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); toggle.innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`; };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    drawer.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    nav.addEventListener('click',event=>{if(event.target===nav&&toggle.getAttribute('aria-expanded')==='true')setOpen(false);});
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
    const sectionLinks = [...$$('.landing-nav-links a[href^="#"]')];
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
      $$('.landing-mobile-menu a').forEach(link => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-24% 0px -62% 0px' });
    sectionLinks.forEach(link => { const target = $(link.hash); if (target) sectionObserver.observe(target); });
    const backTop = document.createElement('button'); backTop.type = 'button'; backTop.className = 'landing-back-top'; backTop.setAttribute('aria-label', 'Back to top'); backTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    document.body.append(backTop); backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: motionOff ? 'auto' : 'smooth' }));
    const onScroll = () => { header.classList.toggle('is-scrolled', window.scrollY > 12); backTop.classList.toggle('is-visible', window.scrollY > 650); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  const dashboardModes = {
    overview: { stats: [['Active members','1,248','+12.4% this month','green'],['Today’s attendance','318','89% capacity','blue'],['Monthly revenue','₹8.42L','+8.1% vs last month','green'],['Active trainers','24','5 classes today','purple']], member:[24,31,29,39,43,50,57,68], revenue:[32,39,35,48,51,62,58,77], registrations:[['Aarav Mehta','Premium · Today'],['Priya Nair','Annual · 10:24 AM'],['Rohan Das','Starter · 9:48 AM']], activity:[['Check-in','Ananya Rao · 8:42 AM'],['Payment','₹2,499 received · 8:35 AM'],['Class booking','Yoga Flow · 8:12 AM']] },
    members: { stats: [['Active members','1,248','+86 new this month','green'],['New registrations','86','+14% vs last month','blue'],['Renewals due','42','Next 7 days','amber'],['Retention rate','94.8%','+2.1% this quarter','purple']], member:[18,24,29,34,42,49,61,74], revenue:[25,31,42,38,47,55,64,72], registrations:[['Aarav Mehta','Premium · Today'],['Priya Nair','Annual · Today'],['Rohan Das','Starter · Yesterday']], activity:[['Membership started','Premium · Today'],['Renewal completed','Annual · 9:16 AM'],['Profile updated','New fitness goal · 8:02 AM']] },
    attendance: { stats: [['Today’s check-ins','318','+9.2% vs last Tuesday','blue'],['Peak hour','7–8 AM','84 members checked in','green'],['Classes today','16','4 sessions in progress','purple'],['Avg. visits','4.2 / week','Across active members','amber']], member:[34,39,51,46,62,58,74,82], revenue:[23,29,35,31,43,51,48,63], registrations:[['Morning HIIT','28 / 30 spots'],['Power Yoga','22 / 24 spots'],['Strength Lab','18 / 20 spots']], activity:[['Check-in','Ananya Rao · 8:42 AM'],['Check-in','Kabir Shah · 8:39 AM'],['Class booking','Yoga Flow · 8:12 AM']] },
    revenue: { stats: [['Monthly revenue','₹8.42L','+8.1% vs last month','green'],['Collected','₹7.96L','94.5% collection rate','blue'],['Outstanding','₹46,200','18 invoices pending','amber'],['Avg. membership','₹2,850','Across active plans','purple']], member:[20,26,30,38,44,51,60,67], revenue:[25,34,39,46,42,62,67,84], registrations:[['Premium Monthly','₹3.24L collected'],['Annual Membership','₹2.88L collected'],['Personal Training','₹1.16L collected']], activity:[['Payment received','₹2,499 · 8:35 AM'],['Invoice generated','INV-2026-0842 · 8:10 AM'],['Renewal completed','₹24,000 · 7:54 AM']] }
  };

  function chartSvg(values, bars = false) {
    const max = Math.max(...values), points = values.map((v, i) => `${12 + i * 76 / (values.length - 1)},${78 - v / max * 62}`);
    return bars ? `<svg viewBox="0 0 100 88" role="img" aria-label="Illustrative monthly bar chart"><path class="chart-grid" d="M8 78H96M8 48H96M8 18H96"/><g class="chart-bars">${values.map((v,i)=>`<rect x="${12+i*11}" y="${78-v/max*62}" width="6" height="${v/max*62}" opacity="${.5+i/values.length*.5}"/>`).join('')}</g></svg>` : `<svg viewBox="0 0 100 88" role="img" aria-label="Illustrative growth chart"><path class="chart-grid" d="M8 78H96M8 48H96M8 18H96"/><path class="chart-area" d="M${points.join(' L')} L88 82 L12 82Z"/><path class="chart-line" d="M${points.join(' L')}"/></svg>`;
  }

  function renderDashboard(mode, { animate = true } = {}) {
    const data = dashboardModes[mode], card = $('.hero-visual .preview-card'); if (!card) return;
    const stats = $$('.stats-grid .stat-card', card);
    data.stats.forEach(([label,value,meta],i) => { const item=stats[i]; if(!item)return; $('.stat-label',item).textContent=label; $('.stat-value',item).textContent=value; const metaNode=$('.stat-meta',item); if(metaNode)metaNode.lastElementChild.textContent=meta; if(animate&&!motionOff){item.classList.remove('kpi-pop'); void item.offsetWidth; item.classList.add('kpi-pop');} });
    let insights=$('.dashboard-demo-content',card);
    if(!insights){ insights=document.createElement('div');insights.className='dashboard-demo-content';const anchor=$('.stats-grid',card);anchor?.after(insights); }
    insights.innerHTML=`<div class="dashboard-demo-data"><article class="dashboard-demo-chart"><h4>Membership growth <span>Last 8 months</span></h4>${chartSvg(data.member)}<div class="demo-chart-labels"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div></article><article class="dashboard-demo-chart"><h4>${mode==='attendance'?'Attendance activity':'Revenue trend'} <span>Monthly view</span></h4>${chartSvg(data.revenue,true)}<div class="demo-chart-labels"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div></article></div><div class="dashboard-demo-lower"><article class="dashboard-demo-list"><h4>${mode==='attendance'?'Popular sessions':mode==='revenue'?'Revenue by plan':'Recent registrations'}</h4>${data.registrations.map(([name,meta])=>`<p><strong>${name}</strong><span>${meta}</span></p>`).join('')}</article><article class="dashboard-demo-list"><h4>${mode==='attendance'?'Recent activity':'Recent activity'}</h4>${data.activity.map(([name,meta])=>`<p><strong>${name}</strong><span>${meta}</span></p>`).join('')}</article></div>`;
  }

  function enhanceHeroAndStats() {
    const hero=$('.hero-section'),preview=$('.preview-card'); if(!hero||!preview)return;
    const copy=document.createElement('div');copy.className='hero-copy';const visual=document.createElement('div');visual.className='hero-visual';
    const badge=$('.hero-badge',hero),title=$('.hero-title',hero),desc=$('.hero-desc',hero),buttons=$('.hero-buttons',hero);
    [badge,title,desc,buttons].forEach(node=>node&&copy.append(node));
    const topbar=preview.firstElementChild; if(topbar)topbar.classList.add('preview-window-bar');
    if(topbar){const label=document.createElement('span');label.className='preview-window-label';label.innerHTML='<i class="fa-solid fa-shield-halved" aria-hidden="true"></i> GymFlow Studio · Demo data';topbar.append(label);}
    const tabs=document.createElement('div');tabs.className='dashboard-demo-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Interactive dashboard preview');
    [['overview','Overview'],['members','Members'],['attendance','Attendance'],['revenue','Revenue']].forEach(([key,label],index)=>{const button=document.createElement('button');button.type='button';button.className=`dashboard-demo-tab${index===0?' is-active':''}`;button.dataset.dashboardMode=key;button.setAttribute('role','tab');button.setAttribute('aria-selected',String(index===0));button.textContent=label;tabs.append(button);});
    if(topbar)topbar.after(tabs);else preview.prepend(tabs);visual.append(preview);
    [['hero-notice-one','fa-user-plus','New member registered','Maya Chen · Premium plan'],['hero-notice-two','fa-circle-check','Payment received','₹2,499 membership payment'],['hero-notice-three','fa-id-card-clip','Attendance checked in','Aarav Mehta · just now']].forEach(([cls,icon,titleText,detail])=>{const notice=document.createElement('div');notice.className=`hero-notice ${cls}`;notice.innerHTML=`<i class="fa-solid ${icon}" aria-hidden="true"></i><span><strong>${titleText}</strong>${detail}</span>`;visual.append(notice);});
    hero.classList.add('hero-split');hero.append(copy,visual);
    const highlight=$('.hero-title span',hero);if(highlight){highlight.classList.add('hero-highlight');highlight.setAttribute('aria-live','off');const phrases=['One Powerful SaaS','Smarter Member Growth','Effortless Gym Operations','Real-Time Business Insights'];let index=0;if(!motionOff)window.setInterval(()=>{index=(index+1)%phrases.length;highlight.classList.add('is-changing');window.setTimeout(()=>{highlight.textContent=phrases[index];highlight.classList.remove('is-changing');},160);},3600);}
    tabs.addEventListener('click',event=>{const button=event.target.closest('[data-dashboard-mode]');if(!button)return;tabs.querySelectorAll('.dashboard-demo-tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});renderDashboard(button.dataset.dashboardMode);});
    renderDashboard('overview',{animate:false});
    const stats=document.createElement('section');stats.className='platform-stats landing-reveal';stats.setAttribute('aria-label','GymFlow platform statistics');stats.innerHTML=`<div class="platform-stats-inner"><p class="platform-stats-heading">Illustrative platform activity · demonstration values</p><div class="platform-stats-grid">${[['Registered Gyms',1240],['Active Members',86400],['Total Branches',2760],['Daily Check-ins',31200]].map(([label,value])=>`<div class="platform-stat"><strong data-count="${value}">0</strong><span>${label}</span></div>`).join('')}</div></div>`;
    hero.after(stats);
    const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const node=entry.target;countObserver.unobserve(node);const target=Number(node.dataset.count);if(motionOff){node.textContent=target.toLocaleString('en-IN');return;}const start=performance.now(),duration=1100;const tick=now=>{const p=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-p,3);node.textContent=Math.round(target*ease).toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}),{threshold:.45});
    $$('[data-count]',stats).forEach(node=>countObserver.observe(node));
  }

  function enhanceFeatures() {
    const section=$('#features'), grid=$('#features .grid-3');if(!section||!grid)return;
    const features=$$('.card',grid).map((card,index)=>({title:$('h4',card)?.textContent.trim()||'',description:$('p',card)?.textContent.trim()||'',icon:$('i',card)?.className||'fa-solid fa-dumbbell',color:$('.stat-icon',card)?.className||'stat-icon green',benefits:[['Separate gym data and branding','Consolidated oversight across branches'],['Fast, reliable member check-ins','Clear visit history and attendance trends'],['Easy class discovery and booking','Capacity-aware schedules and waitlists'],['Branded invoices and payment records','Clearer membership revenue tracking'],['Maintenance tickets and inventory','Warranty and repair history in one place'],['Self-service plans and workout access','Bookings, progress, and receipts on mobile']][index]}));
    if(features.length!==6)return;
    const explorer=document.createElement('div');explorer.className='feature-explorer';const nav=document.createElement('div');nav.className='feature-nav';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','GymFlow features');
    const panel=document.createElement('article');panel.className='feature-showcase';panel.setAttribute('aria-live','polite');
    const render=(index)=>{const f=features[index];panel.innerHTML=`<div class="feature-copy"><span class="${f.color}"><i class="${f.icon}" aria-hidden="true"></i></span><h3>${f.title}</h3><p>${f.description}</p><ul class="feature-benefits">${f.benefits.map(item=>`<li><i class="fa-solid fa-check" aria-hidden="true"></i>${item}</li>`).join('')}</ul></div><div class="feature-visual" aria-hidden="true"><div class="feature-visual-card"><div class="feature-visual-top"><span>GymFlow workspace</span><i class="${f.icon}"></i></div><div class="feature-visual-bars"><span></span><span></span><span></span><span></span></div></div></div>`;};
    features.forEach((f,index)=>{const button=document.createElement('button');button.type='button';button.className=`feature-nav-button${index===0?' is-active':''}`;button.setAttribute('role','tab');button.setAttribute('aria-selected',String(index===0));button.innerHTML=`<span class="${f.color}"><i class="${f.icon}" aria-hidden="true"></i></span><span>${f.title}</span>`;button.addEventListener('click',()=>{nav.querySelectorAll('button').forEach(node=>{const active=node===button;node.classList.toggle('is-active',active);node.setAttribute('aria-selected',String(active));});panel.classList.add('is-changing');window.setTimeout(()=>{render(index);panel.classList.remove('is-changing');},motionOff?0:120);});nav.append(button);});
    render(0);explorer.append(nav,panel);grid.replaceWith(explorer);
  }

  function enhanceRolesAndProcess() {
    const roles=$('#roles'),grid=roles?.querySelector('.grid-3');if(!roles||!grid)return;
    const cards=$$('.card',grid);if(cards.length===3){const shell=document.createElement('div');shell.className='grid-3';const tabs=document.createElement('div');tabs.className='role-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Explore GymFlow roles');const preview=document.createElement('div');preview.className='role-preview';
      const names=['Super Admin','Gym Admin','Member'];cards.forEach((card,index)=>{const title=$('h3',card)?.textContent.trim()||names[index],desc=$('p',card)?.textContent.trim()||'';const button=document.createElement('button');button.type='button';button.className=`role-tab${index===0?' is-active':''}`;button.setAttribute('role','tab');button.setAttribute('aria-selected',String(index===0));button.innerHTML=`<strong>${names[index]}</strong><span>${title}</span>`;button.onclick=()=>{tabs.querySelectorAll('.role-tab').forEach(node=>{const active=node===button;node.classList.toggle('is-active',active);node.setAttribute('aria-selected',String(active));});cards.forEach((item,i)=>item.classList.toggle('is-active',i===index));};tabs.append(button);card.classList.toggle('is-active',index===0);preview.append(card);});shell.append(tabs,preview);grid.replaceWith(shell);}
    const steps=document.createElement('section');steps.className='how-it-works landing-reveal';steps.id='how-it-works';steps.innerHTML=`<div class="section-title"><h2>How GymFlow Works</h2><p>From first signup to daily operations, bring your fitness business together in three steps.</p></div><div class="process-steps"><article class="process-step"><span class="process-step-icon"><i class="fa-solid fa-building-circle-check" aria-hidden="true"></i></span><h3>Register Your Gym</h3><p>Create your gym organization and get started with your GymFlow workspace.</p></article><article class="process-step"><span class="process-step-icon"><i class="fa-solid fa-sliders" aria-hidden="true"></i></span><h3>Configure Your Platform</h3><p>Set up branches, staff, membership plans, and everyday operations.</p></article><article class="process-step"><span class="process-step-icon"><i class="fa-solid fa-chart-line" aria-hidden="true"></i></span><h3>Manage Your Gym</h3><p>Manage members, attendance, payments, and fitness operations in one place.</p></article></div>`;
    roles.after(steps);
  }

  function enhancePricingAndFaq() {
    const container=$('#pricing-plans-container');
    const expandFeatures=()=>$$('.live-plan-card',container||document).forEach(card=>{const list=$('.live-plan-features',card);if(!list||list.dataset.enhanced||list.children.length<=3)return;list.dataset.enhanced='true';const extras=[...list.children].slice(3);extras.forEach(item=>item.remove());const details=document.createElement('details');details.className='live-feature-details';details.innerHTML=`<summary>See ${extras.length} more included features</summary><ul class="live-plan-features"></ul>`;extras.forEach(item=>details.querySelector('ul').append(item));list.after(details);});
    if(container){new MutationObserver(expandFeatures).observe(container,{childList:true,subtree:true});expandFeatures();}
    $$('.faq-question').forEach(question=>{question.setAttribute('role','button');question.setAttribute('tabindex','0');question.setAttribute('aria-expanded',String(question.parentElement.classList.contains('active')));question.addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();question.click();});});
    const faqObserver=new MutationObserver(records=>records.forEach(record=>{if(record.attributeName==='class'){const item=record.target,question=$('.faq-question',item);question?.setAttribute('aria-expanded',String(item.classList.contains('active')));}}));
    $$('.faq-item').forEach(item=>faqObserver.observe(item,{attributes:true,attributeFilter:['class']}));
  }

  function enhanceFooterAndReveal() {
    const footer=$('.footer');if(footer){$$('.footer-grid > div',footer).forEach(column=>column.classList.add('landing-footer-column'));$$('.footer-grid > div:first-child a',footer).forEach(link=>link.classList.add('footer-social-link'));const socials=$('.footer-grid > div:first-child div[style*="display: flex"]',footer);socials?.classList.add('footer-socials');const bottom=footer.lastElementChild;if(bottom){bottom.removeAttribute('style');bottom.classList.add('footer-bottom');}}
    const revealTargets=$$('.features-section,.roles-section,.pricing-section,.faq-section,#how-it-works,.platform-stats');
    if(motionOff){revealTargets.forEach(target=>target.classList.add('is-revealed'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}),{threshold:.08});revealTargets.forEach(target=>{target.classList.add('landing-reveal');observer.observe(target);});
  }

  document.addEventListener('DOMContentLoaded',()=>{
    enhanceNavigation();enhanceHeroAndStats();enhanceFeatures();enhanceRolesAndProcess();enhancePricingAndFaq();enhanceFooterAndReveal();
  },{once:true});
})();
