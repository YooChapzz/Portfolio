/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Add custom formatting for specific counters
   */
  setTimeout(() => {
    const hoursCounter = document.querySelector('[data-purecounter-end="5000"]');
    const projectsCounter = document.querySelector('[data-purecounter-end="30"]'); // MUDANÇA: de 38 para 30
    
    if (hoursCounter) {
      // Add + prefix to the hours counter
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const currentText = hoursCounter.textContent;
            if (currentText && !currentText.startsWith('+') && currentText !== '0') {
              hoursCounter.textContent = '+' + currentText;
            }
          }
        });
      });
      
      observer.observe(hoursCounter, {
        childList: true,
        characterData: true,
        subtree: true
      });
      
      // Also check after animation completes
      setTimeout(() => {
        const finalText = hoursCounter.textContent;
        if (finalText && !finalText.startsWith('+')) {
          hoursCounter.textContent = '+' + finalText;
        }
      }, 2000);
    }

    if (projectsCounter) {
      // Add + prefix to the projects counter
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const currentText = projectsCounter.textContent;
            if (currentText && !currentText.startsWith('+') && currentText !== '0') {
              projectsCounter.textContent = '+' + currentText;
            }
          }
        });
      });
      
      observer.observe(projectsCounter, {
        childList: true,
        characterData: true,
        subtree: true
      });
      
      // Also check after animation completes
      setTimeout(() => {
        const finalText = projectsCounter.textContent;
        if (finalText && !finalText.startsWith('+')) {
          projectsCounter.textContent = '+' + finalText;
        }
      }, 2000);
    }
  }, 100);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Animate Complex Data Analytics circular progress charts - RAIO 72 (185px)
   */
  let complexCircles = document.querySelectorAll('.data-analytics-card .complex-circle');
  complexCircles.forEach((circle) => {
    new Waypoint({
      element: circle,
      offset: '80%',
      handler: function(direction) {
        if (direction === 'down') {
          const progressCircle = circle.querySelector('.circle-progress');
          const percentageNumber = circle.querySelector('.percentage-number');
          const percentage = parseInt(circle.getAttribute('data-percentage'));
          
          // Use radius 72 for 185x185 SVG
          const radius = 72;
          const circumference = 2 * Math.PI * radius; // 452.39
          
          // Calculate the correct offset for the percentage
          const progressLength = (percentage / 100) * circumference;
          const offset = circumference - progressLength;
          
          if (progressCircle) {
            progressCircle.style.strokeDasharray = `${circumference}`;
            progressCircle.style.strokeDashoffset = `${circumference}`;
            progressCircle.style.transition = 'none';
            progressCircle.style.opacity = '1';
            
            progressCircle.getBoundingClientRect();
            
            setTimeout(() => {
              progressCircle.style.transition = 'stroke-dashoffset 2.5s ease-in-out';
              progressCircle.style.strokeDashoffset = `${offset}`;
            }, 200);
          }
          
          if (percentageNumber) {
            let currentValue = 0;
            const increment = percentage / 75;
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= percentage) {
                currentValue = percentage;
                clearInterval(timer);
              }
              percentageNumber.textContent = Math.round(currentValue);
            }, 33);
          }
        }
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * CERTIFICATES CAROUSEL - SIMPLIFIED VERSION
   */
  
  // Simple Certificates Carousel
  class CertificatesCarousel {
    constructor() {
      this.container = document.querySelector('.certificates-carousel-container');
      this.track = document.querySelector('.certificates-track');
      this.prevBtn = document.querySelector('.certificates-nav-prev');
      this.nextBtn = document.querySelector('.certificates-nav-next');
      this.loadingElement = document.querySelector('.certificates-loading');
      
      this.certificates = [];
      this.currentIndex = 0;
      this.itemWidth = 275;
      this.isAnimating = false;
      this.autoPlayInterval = null;
      
      this.init();
    }
    
    init() {
      // Sempre carregar 3 certificados fixos
      this.certificates = this.getFixedCertificates();
      this.render();
      this.bindEvents();
      this.startAutoPlay();
      this.hideLoading();
    }
    
    getFixedCertificates() {
      return [
        {
          title: 'CV Duarte Costa',
          issuer: 'Portfolio Document',
          date: '15/01/2025',
          image: 'assets/certificates/CV_Duarte_Costa.pdf',
          type: 'CV',
          isPdf: true
        },
        {
          title: 'Documento Académico',
          issuer: 'Universidade do Minho',
          date: '10/01/2024',
          image: 'assets/certificates/Pedido_1068540.pdf', // CORRIGIDO: volta a ser PDF
          type: 'ACADEMIC',
          isPdf: true // CORRIGIDO: é PDF sim
        },
        {
          title: 'Demo Certificate Example',
          issuer: 'Demo Institution',
          date: '20/11/2023',
          image: 'assets/img/certificates-placeholder.jpg',
          type: 'DEMO',
          isPdf: false,
          isDemo: true
        }
      ];
    }
    
    render() {
      if (!this.track) return;
      
      this.track.innerHTML = '';
      this.certificates.forEach((cert, index) => {
        const item = this.createCertificateItem(cert, index);
        this.track.appendChild(item);
      });
    }
    
    createCertificateItem(cert, index) {
      const item = document.createElement('div');
      item.className = `certificate-item ${index === 0 ? 'active' : ''}`;
      item.setAttribute('data-index', index);
      
      // HTML do certificado
      let imageHtml;
      if (cert.isPdf) {
        // CORRIGIDO: Para qualquer PDF (CV ou Academic), mostrar placeholder PDF
        if (cert.type === 'ACADEMIC') {
          imageHtml = `
            <div class="certificate-academic-placeholder">
              <i class="bi bi-mortarboard-fill" style="font-size: 3rem; color: var(--accent-color);"></i>
              <span>Academic PDF</span>
            </div>
          `;
        } else {
          imageHtml = `
            <div class="certificate-pdf-placeholder">
              <i class="bi bi-file-earmark-pdf" style="font-size: 3rem; color: var(--accent-color);"></i>
              <span>PDF Certificate</span>
            </div>
          `;
        }
      } else {
        imageHtml = `<img src="${cert.image}" alt="${cert.title}" onerror="this.style.display='none'">`;
      }
      
      let clickInstruction = '';
      if (cert.isPdf && !cert.isDemo) {
        // CORRIGIDO: Qualquer PDF (incluindo académico) pode ser aberto
        clickInstruction = '<p style="font-size: 0.8rem; color: var(--accent-color); margin-top: 8px; cursor: pointer;"><i class="bi bi-download"></i> Click to view PDF</p>';
      } else if (cert.isDemo) {
        clickInstruction = '<p style="font-size: 0.8rem; color: #888; margin-top: 8px;"><i class="bi bi-info-circle"></i> Demo certificate</p>';
      }
      
      item.innerHTML = `
        <div class="certificate-image" style="cursor: pointer;">
          ${imageHtml}
          <div class="certificate-badge">${cert.type}</div>
        </div>
        <div class="certificate-content">
          <h4 class="certificate-title" style="cursor: pointer;">${cert.title}</h4>
          <p class="certificate-issuer">${cert.issuer}</p>
          <div class="certificate-date">
            <i class="bi bi-calendar-event"></i>
            <span>${cert.date}</span>
          </div>
          ${clickInstruction}
        </div>
      `;
      
      // CORRIGIDO: Event listeners simplificados - se é PDF, abre PDF
      const imageElement = item.querySelector('.certificate-image');
      const titleElement = item.querySelector('.certificate-title');
      const instructionElement = item.querySelector('.certificate-content p:last-child');
      
      if (cert.isPdf && !cert.isDemo) {
        // QUALQUER PDF (CV ou Academic) - abrir em nova aba
        const openPDF = () => window.open(cert.image, '_blank');
        imageElement?.addEventListener('click', openPDF);
        titleElement?.addEventListener('click', openPDF);
        instructionElement?.addEventListener('click', openPDF);
      } else if (cert.isDemo) {
        // Certificados demo - mostrar alerta
        const showAlert = () => alert('This is a demo certificate. Upload your real certificates to the assets/certificates/ folder.');
        imageElement?.addEventListener('click', showAlert);
        titleElement?.addEventListener('click', showAlert);
      }
      
      return item;
    }
    
    bindEvents() {
      if (!this.container) return;
      
      this.prevBtn?.addEventListener('click', () => this.previousSlide());
      this.nextBtn?.addEventListener('click', () => this.nextSlide());
      
      // Pause autoplay on hover
      this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    previousSlide() {
      if (this.isAnimating) return;
      const newIndex = this.currentIndex === 0 ? this.certificates.length - 1 : this.currentIndex - 1;
      this.goToSlide(newIndex);
    }
    
    nextSlide() {
      if (this.isAnimating) return;
      const newIndex = this.currentIndex === this.certificates.length - 1 ? 0 : this.currentIndex + 1;
      this.goToSlide(newIndex);
    }
    
    goToSlide(index) {
      if (this.isAnimating || index === this.currentIndex) return;
      
      this.isAnimating = true;
      this.currentIndex = index;
      
      // Como sempre temos 3 certificados, não precisamos de movimento
      // O carrossel fica fixo, apenas mudamos o certificado ativo
      this.updateActiveStates();
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
    
    updateActiveStates() {
      const items = this.track?.querySelectorAll('.certificate-item');
      items?.forEach((item, index) => {
        item.classList.toggle('active', index === this.currentIndex);
      });
    }
    
    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
    
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
    
    hideLoading() {
      if (this.loadingElement) {
        this.loadingElement.style.display = 'none';
      }
    }
  }
  
  // Initialize immediately
  let certificatesCarousel = null;
  
  function initCertificatesCarousel() {
    const certificatesSection = document.querySelector('#certificates');
    if (certificatesSection) {
      certificatesCarousel = new CertificatesCarousel();
    }
  }
  
  // Initialize on load
  window.addEventListener('load', initCertificatesCarousel);

})();