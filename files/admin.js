// admin.js — واجهة بسيطة لتعديل البيانات وحفظها في localStorage
(function(){
  const defaultData = {
    heroImage: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
    stats: { projects: 24, companies: 7, beneficiaries: 12000, years: 11 },
    projects: [
      { id: 'scolata', title: 'مجمع ايادي سكولاتا', desc: 'موقع استراتيجي – خدمات متكاملة – مباني عصرية', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80' },
      { id: 'garden', title: 'ايادي كاردن سيتي / الدورة', desc: 'مدينة سكنية متكاملة مع مدارس وحدائق وخدمات', img: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=80' }
    ],
    companies: [
      { id:'cement', title: 'شركة الإسمنت', desc:'مصنع حديث للإسمنت', img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' }
    ],
    contact: { phones: ['0780 000 0000','0770 000 0000'], address: 'بغداد - العراق' }
  };

  let data = JSON.parse(localStorage.getItem('ayadi_siteData') || 'null') || defaultData;

  // Elements
  const heroImage = document.getElementById('heroImage');
  const aboutImage = document.getElementById('aboutImage');
  const saveHero = document.getElementById('saveHero');
  const projectsList = document.getElementById('projectsList');
  const companiesList = document.getElementById('companiesList');
  const addProjBtn = document.getElementById('addProj');
  const addCompBtn = document.getElementById('addComp');
  const projTitle = document.getElementById('projTitle');
  const projDesc = document.getElementById('projDesc');
  const projImg = document.getElementById('projImg');
  const compTitle = document.getElementById('compTitle');
  const compDesc = document.getElementById('compDesc');
  const compImg = document.getElementById('compImg');
  const statProjects = document.getElementById('statProjects');
  const statCompanies = document.getElementById('statCompanies');
  const statBenef = document.getElementById('statBenef');
  const statYears = document.getElementById('statYears');
  const saveStats = document.getElementById('saveStats');
  const phone1 = document.getElementById('phone1');
  const phone2 = document.getElementById('phone2');
  const address = document.getElementById('address');
  const saveContact = document.getElementById('saveContact');
  const resetBtn = document.getElementById('resetBtn');

  function renderLists(){
    projectsList.innerHTML = '';
    data.projects.forEach(p=>{
      const div = document.createElement('div');
      div.className = 'list-item';
      div.innerHTML = `<div>
        <strong>${p.title}</strong><div class="small">${p.desc}</div>
      </div>
      <div>
        <button data-id="${p.id}" class="edit-proj">تعديل</button>
        <button data-id="${p.id}" class="del-proj">حذف</button>
      </div>`;
      projectsList.appendChild(div);
    });

    companiesList.innerHTML = '';
    data.companies.forEach(c=>{
      const div = document.createElement('div');
      div.className = 'list-item';
      div.innerHTML = `<div>
        <strong>${c.title}</strong><div class="small">${c.desc}</div>
      </div>
      <div>
        <button data-id="${c.id}" class="edit-comp">تعديل</button>
        <button data-id="${c.id}" class="del-comp">حذف</button>
      </div>`;
      companiesList.appendChild(div);
    });
  }

  function saveData(){
    localStorage.setItem('ayadi_siteData', JSON.stringify(data));
    alert('تم الحفظ — افتح index.html لمعاينة التغييرات');
  }

  // init form values
  function init(){
    heroImage.value = data.heroImage || '';
    aboutImage.value = data.aboutImage || '';
    statProjects.value = data.stats.projects || 0;
    statCompanies.value = data.stats.companies || 0;
    statBenef.value = data.stats.beneficiaries || 0;
    statYears.value = data.stats.years || 0;
    phone1.value = data.contact.phones[0] || '';
    phone2.value = data.contact.phones[1] || '';
    address.value = data.contact.address || '';
    renderLists();
  }

  // events
  saveHero.addEventListener('click', ()=>{
    data.heroImage = heroImage.value || data.heroImage;
    data.aboutImage = aboutImage.value || data.aboutImage;
    saveData();
    init();
  });

  addProjBtn.addEventListener('click', ()=>{
    if(!projTitle.value) return alert('أدخل عنوان المشروع');
    const id = 'p_'+Date.now();
    data.projects.push({ id, title: projTitle.value, desc: projDesc.value||'', img: projImg.value||'' });
    projTitle.value='';projDesc.value='';projImg.value='';
    saveData(); renderLists();
  });

  addCompBtn.addEventListener('click', ()=>{
    if(!compTitle.value) return alert('أدخل اسم الشركة');
    const id = 'c_'+Date.now();
    data.companies.push({ id, title: compTitle.value, desc: compDesc.value||'', img: compImg.value||'' });
    compTitle.value='';compDesc.value='';compImg.value='';
    saveData(); renderLists();
  });

  projectsList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('del-proj')){
      const id = e.target.dataset.id;
      data.projects = data.projects.filter(p=>p.id!==id);
      saveData(); renderLists();
    }
    if(e.target.classList.contains('edit-proj')){
      const id = e.target.dataset.id;
      const p = data.projects.find(x=>x.id===id);
      const newTitle = prompt('عنوان المشروع', p.title);
      if(newTitle!==null) p.title = newTitle;
      const newDesc = prompt('وصف المشروع', p.desc);
      if(newDesc!==null) p.desc = newDesc;
      const newImg = prompt('رابط الصورة', p.img);
      if(newImg!==null) p.img = newImg;
      saveData(); renderLists();
    }
  });

  companiesList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('del-comp')){
      const id = e.target.dataset.id;
      data.companies = data.companies.filter(p=>p.id!==id);
      saveData(); renderLists();
    }
    if(e.target.classList.contains('edit-comp')){
      const id = e.target.dataset.id;
      const p = data.companies.find(x=>x.id===id);
      const newTitle = prompt('اسم الشركة', p.title);
      if(newTitle!==null) p.title = newTitle;
      const newDesc = prompt('وصف الشركة', p.desc);
      if(newDesc!==null) p.desc = newDesc;
      const newImg = prompt('رابط الصورة', p.img);
      if(newImg!==null) p.img = newImg;
      saveData(); renderLists();
    }
  });

  saveStats.addEventListener('click', ()=>{
    data.stats.projects = Number(statProjects.value)||0;
    data.stats.companies = Number(statCompanies.value)||0;
    data.stats.beneficiaries = Number(statBenef.value)||0;
    data.stats.years = Number(statYears.value)||0;
    saveData(); init();
  });

  saveContact.addEventListener('click', ()=>{
    data.contact.phones[0] = phone1.value||data.contact.phones[0];
    data.contact.phones[1] = phone2.value||data.contact.phones[1];
    data.contact.address = address.value||data.contact.address;
    saveData(); init();
  });

  resetBtn.addEventListener('click', ()=>{
    if(confirm('هل تريد إعادة كل الإعدادات إلى الافتراضي؟')) {
      data = defaultData;
      localStorage.removeItem('ayadi_siteData');
      init();
      alert('تمت إعادة الافتراضيات');
    }
  });

  init();
})();