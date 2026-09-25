// Slide-out menu
  var menuBtn = document.getElementById('menuBtn');
  var menuClose = document.getElementById('menuClose');
  var sideMenu = document.getElementById('sideMenu');
  var overlay = document.getElementById('sideMenuOverlay');
  function openMenu(){ sideMenu.classList.add('open'); overlay.classList.add('open'); }
  function closeMenu(){ sideMenu.classList.remove('open'); overlay.classList.remove('open'); }
  menuBtn && menuBtn.addEventListener('click', openMenu);
  menuClose && menuClose.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);
  sideMenu && sideMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  // About timeline tabs
  var timelineData = [
    {
      year: '10th Grade',
      title: 'Shri Guru Tegh Bahadur Academy, Ratlam',
      desc: 'Completed 10th grade here — the years that built my base in math and science and first pointed me toward computers.',
      badges: ['Ratlam, Madhya Pradesh', '10th Grade']
    },
    {
      year: '2022',
      title: '12th Grade — Morning Star School, Ratlam',
      desc: 'Completed senior secondary school, building the foundation in math and science that pointed me toward computer science and, eventually, machine learning.',
      badges: ['Ratlam, Madhya Pradesh', '12th Grade']
    },
    {
      year: '2022 — 2026',
      title: 'B.Tech CSE (AI & ML) — LNCT University, Bhopal',
      desc: 'Completed my Computer Science & Engineering degree with a specialization in AI & ML — coursework and projects centered on Python, data structures, CNNs and computer vision.',
      badges: ['Bhopal, Madhya Pradesh', 'CGPA: 8.21 / 10']
    },
    {
      year: 'Sept — Nov 2024',
      title: 'Machine Learning Developer — Smart India Hackathon',
      desc: 'Built and fine-tuned the ML models behind an AI-driven crop disease detection and management system, then worked with the team to deploy it inside a working web application.',
      badges: ['Team project', 'Crop Disease Detection']
    }
  ];
  var tlTabs = document.querySelectorAll('.tl-tab');
  var tlPanel = document.getElementById('tlPanel');
  function renderTl(i){
    var d = timelineData[i];
    tlPanel.innerHTML =
      '<div class="tl-year mono">'+d.year+'</div>'+
      '<div class="tl-title">'+d.title+'</div>'+
      '<p class="tl-desc">'+d.desc+'</p>'+
      '<div class="tl-badges">'+d.badges.map(function(b){return '<span class="tl-badge">'+b+'</span>';}).join('')+'</div>';
  }
  tlTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tlTabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      renderTl(parseInt(tab.getAttribute('data-i'),10));
    });
  });
  renderTl(0);

  // Nav color swap over dark sections
  var nav = document.getElementById('nav');
  var darkSections = document.querySelectorAll('.card--ink, .card--maroon, .certs, .contact, .footer');
  var observer = new IntersectionObserver(function(entries){
    var onDark = false;
    entries.forEach(function(e){ if(e.isIntersecting) onDark = true; });
    // check all currently intersecting
    var anyDark = Array.from(darkSections).some(function(sec){
      var r = sec.getBoundingClientRect();
      return r.top < 90 && r.bottom > 60;
    });
    nav.classList.toggle('on-dark', anyDark);
  }, {threshold:[0,0.1,0.5,1]});
  darkSections.forEach(function(s){ observer.observe(s); });
  window.addEventListener('scroll', function(){
    var anyDark = Array.from(darkSections).some(function(sec){
      var r = sec.getBoundingClientRect();
      return r.top < 90 && r.bottom > 60;
    });
    nav.classList.toggle('on-dark', anyDark);
  }, {passive:true});

  // Certificate popup modal
  var certOverlay = document.getElementById('certModalOverlay');
  var certClose = document.getElementById('certModalClose');
  var certTrigger = document.getElementById('certModalTrigger');

  function openCertModal(){
    certOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCertModal(){
    certOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  certTrigger && certTrigger.addEventListener('click', function(e){
    e.preventDefault();
    openCertModal();
  });
  certClose && certClose.addEventListener('click', closeCertModal);
  certOverlay && certOverlay.addEventListener('click', function(e){
    if(e.target === certOverlay) closeCertModal();
  });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeCertModal();
  });

  var modalButtons = document.querySelectorAll('.modal-filter-btn');
  var modalCards = document.querySelectorAll('.modal-cert-card');
  modalButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      modalButtons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      modalCards.forEach(function(c){
        var type = c.getAttribute('data-type');
        c.style.display = (f === 'all' || f === type) ? '' : 'none';
      });
    });
  });
