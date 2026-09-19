/**
 * EssMendes Tecnologia - Interatividade & Lógica do Site
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Header Scroll Shadow & Blur Effect --- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 2. Mobile Drawer Menu Navigation --- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    /* --- 3. FAQ Accordion Interativo --- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            // If not previously active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }

    /* --- 4. Calculadora Interativa de Potencial de Clientes --- */
    const ticketInput = document.getElementById('ticketMedio');
    const rangeBuscas = document.getElementById('rangeBuscas');
    const valBuscas = document.getElementById('valBuscas');
    const nicheBtns = document.querySelectorAll('.niche-btn');
    
    const resContatos = document.getElementById('resContatos');
    const resClientes = document.getElementById('resClientes');
    const resFaturamento = document.getElementById('resFaturamento');

    // Niche conversion multipliers (taxa de conversão de cliques para contato e cliente)
    const nicheMultipliers = {
        'comercio': { clickRate: 0.035, closeRate: 0.25 },
        'clinica': { clickRate: 0.030, closeRate: 0.22 },
        'automotivo': { clickRate: 0.040, closeRate: 0.30 },
        'gastronomia': { clickRate: 0.050, closeRate: 0.35 },
        'servicos': { clickRate: 0.032, closeRate: 0.25 }
    };

    let currentNiche = 'comercio';

    function calculatePotential() {
        if (!ticketInput || !rangeBuscas) return;

        const ticket = parseFloat(ticketInput.value) || 0;
        const buscas = parseInt(rangeBuscas.value) || 0;
        const multiplier = nicheMultipliers[currentNiche] || nicheMultipliers['comercio'];

        // Atualiza display do range
        valBuscas.textContent = buscas.toLocaleString('pt-BR') + ' buscas/mês';

        // Estimativa de contatos adicionais no Top 3 do Google Maps (3% a 5% das buscas totais)
        const contatos = Math.round(buscas * multiplier.clickRate);
        
        // Clientes fechados (20% a 35% dos contatos fecham)
        const clientesMin = Math.round(contatos * multiplier.closeRate * 0.8);
        const clientesMax = Math.round(contatos * multiplier.closeRate * 1.2);
        const clientesMedio = Math.round(contatos * multiplier.closeRate);

        // Faturamento adicional
        const faturamento = clientesMedio * ticket;

        // Atualiza no DOM com animação sutil
        resContatos.textContent = `+${contatos.toLocaleString('pt-BR')} contatos/mês`;
        resClientes.textContent = `${clientesMin} a ${clientesMax} novos clientes`;
        resFaturamento.textContent = faturamento.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }) + ' / mês';
    }

    if (ticketInput) ticketInput.addEventListener('input', calculatePotential);
    if (rangeBuscas) rangeBuscas.addEventListener('input', calculatePotential);

    nicheBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            nicheBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentNiche = btn.dataset.niche;
            calculatePotential();
        });
    });

    // Run initial calculation
    calculatePotential();

    /* --- 5. Floating WhatsApp Widget Tooltip --- */
    const tooltipClose = document.getElementById('tooltipClose');
    const waTooltip = document.getElementById('waTooltip');

    if (tooltipClose && waTooltip) {
        tooltipClose.addEventListener('click', (e) => {
            e.stopPropagation();
            waTooltip.style.display = 'none';
        });
    }

    /* --- 6. Active Navigation Link on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

});
