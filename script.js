// script.js — بسيط لإظهار البيانات الممكن تعديلها من لوحة الإدارة (localStorage)
(function(){
  const defaults = {
    heroImage: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
    stats: { projects: 24, companies: 7, beneficiaries: 12000, years: 11 },
    projects: [
      { id: 'scolata', title: 'مجمع ايادي بسكولاتة', desc: 'موقع استراتيجي – خدمات متكاملة – مباني عصرية', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80' },
      { id: 'garden', title: 'ايادي كاردن سيتي / الدورة', desc: 'مدينة سكنية متكاملة مع مدارس وحدائق وخدمات', img: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=80' },
      { id: 'kadhimiya', title: 'مجمع ايادي الكاظمية', desc: 'وحدات سكنية حديثة قريبة من مركز بغداد', img: 'https://images.unsplash.com/photo-1505691723518-36a0f35c2d43?auto=format&fit=crop&w=900&q=80' },
      { id: 'adal', title: 'مجمع ايادي العدل', desc: 'مشروع سكني راقٍ للعوائل وذوي الدخل المتوسط', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80' }
    ],
    companies: [
      { id:'cement', title: 'شركة الإسمنت', desc:'مصنع حديث للإسمنت ليدعم مشاريع البناء', img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
      { id:'bricks', title:'شركة الطابوق', desc:'إنتاج طابوق بجودة صناعية عالية', img:'https://images.unsplash.com/photo-1581092795365-2f83b3d4f2d0?auto=format&fit=crop&w=800&q=80' },
      { id:'glass', title:'شركة الزجاج', desc:'ألواح زجاجية عزل وواجهات', img:'https://images.unsplash.com/photo-1505455184866-62a1ae5b9ea3?auto=format&fit=crop&w=800&q=80' },
      { id:'aluminum', title:'شركة الألمنيوم', desc:'تصنيع واجهات وأبواب ألمنيوم', img:'https://images.unsplash.com/photo-1547592180-2d8f1f4a50d2?auto=format&fit=crop&w=800&q=80' }
    ],
    contact: { phones: ['0780 000 0000','0770 000 0000'], address: 'بغداد - العراق', socials: { facebook:'https://facebook.com/thejaaf', instagram:'https://instagram.com/ayadi.group' } }
  };

  // load saved or defaults
  const siteData = JSON.parse(localStorage.getItem('ayadi_siteData') || 'null') || defaults;
  const sliderElement = document.getElementById('projectSlider');
let currentPos = 0; // متتبع الموضع الحالي
const step = 340; // مسافة التمرير (تعادل عرض شريحة واحدة تقريباً)

// تعريف دالة التحريك اليدوي
window.moveSlider = function(direction) {
    if (!sliderElement) return;

    // حساب الموضع الجديد
    if (direction === 'next') {
        currentPos += step;
    } else if (direction === 'prev') {
        currentPos -= step;
    }

    // التأكد من عدم تجاوز البداية أو النهاية
    const maxScroll = sliderElement.scrollWidth - sliderElement.clientWidth;

    if (currentPos < 0) {
        currentPos = 0; // التوقف عند البداية
    } else if (currentPos > maxScroll) {
        currentPos = maxScroll; // التوقف عند النهاية
    }

    // تطبيق الحركة
    sliderElement.scrollTo({ left: currentPos, behavior: 'smooth' });
}

  // apply hero background
  document.documentElement.style.setProperty('--hero-bg', `url('${siteData.heroImage}')`);
  const aboutImage = document.getElementById('aboutImage');
  if(aboutImage) aboutImage.src = siteData.aboutImage;

  // stats
  document.getElementById('stat-projects').textContent = siteData.stats.projects;
  document.getElementById('stat-companies').textContent = siteData.stats.companies;
  document.getElementById('stat-beneficiaries').textContent = siteData.stats.beneficiaries;
  document.getElementById('stat-years').textContent = siteData.stats.years;

  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // render slider
  const slider = document.getElementById('projectSlider');
  slider.innerHTML = '';
  siteData.projects.slice(0,4).forEach(p=>{
    const slide = document.createElement('article');
    slide.className = 'slide';
    slide.dataset.projectId = p.id; 
    slide.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <a class="btn open-modal-btn" href="#projects" data-project-id="${p.id}">عرض المشروع</a>
    `;
    slider.appendChild(slide);
  });
  
  // render projects grid
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = '';
  siteData.projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.projectId = p.id; 
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="actions">
        <a class="btn open-modal-btn" href="#projects" data-project-id="${p.id}">عرض التفاصيل</a>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  // render companies
  const companiesGrid = document.getElementById('companiesGrid');
  companiesGrid.innerHTML = '';
  siteData.companies.forEach(c=>{
    const card = document.createElement('div');
    card.className = 'company-card';
    card.innerHTML = `
      <img src="${c.img}" alt="${c.title}" />
      <h5>${c.title}</h5>
      <p>${c.desc}</p>
    `;
    companiesGrid.appendChild(card);
  });


  // mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  navToggle && navToggle.addEventListener('click', ()=> {
    if(mainNav.style.display === 'block') mainNav.style.display = '';
    else mainNav.style.display = 'block';
  });


    // =======================================================
    // 💡 كود النافذة المنبثقة (MODAL) المُصحَّح
    // =======================================================

    const modal = document.getElementById('project-modal');
    const closeBtn = modal.querySelector('.close-btn');
    
    // ✅ التصحيح: استهداف أزرار السلايدر (.slide .btn) وأزرار الشبكة (.project-card .btn)
    const projectBtns = document.querySelectorAll('.slide .btn, .project-card .btn'); 
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image img');
    const modalCategory = modal.querySelector('.modal-category');
    const modalUl = modal.querySelector('.modal-info ul'); // استهداف قائمة المميزات
    const modalAddress = modal.querySelector('.modal-info p:nth-of-type(3)'); // استهداف العنوان
    
    // وظيفة لفتح النافذة
    function openModal() {
        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden'; 
    }

    // وظيفة لإغلاق النافذة
    function closeModal() {
        modal.classList.remove('is-visible');
        document.body.style.overflow = ''; 
    }

    // 1. فتح النافذة عند الضغط على زر التفاصيل
    projectBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const projectId = button.dataset.projectId;
            const projectDetails = siteData.projects.find(p => p.id === projectId);
            
            if (projectDetails) {
                // تحديث محتوى النافذة المنبثقة ديناميكياً
                modalTitle.textContent = projectDetails.title;
                modalImage.src = projectDetails.img;
                modalImage.alt = projectDetails.title;
                modalCategory.textContent = projectDetails.desc; // استخدام الوصف كفئة للمثال

                // هذه تفاصيل وهمية يجب أن تكون موجودة في siteData.projects إذا أردت عرضها بشكل ديناميكي
                // إذا لم تكن موجودة، ستبقى التفاصيل المعروضة هي التفاصيل الثابتة في HTML.

                openModal();
            }
        });
    });

    // 2. إغلاق النافذة عند الضغط على X
    closeBtn.addEventListener('click', closeModal);

    // 3. إغلاق النافذة عند الضغط خارج المحتوى
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // 4. إغلاق النافذة عند الضغط على مفتاح Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });
})();
