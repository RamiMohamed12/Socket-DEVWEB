document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');
    const mobileDropBtn = document.querySelector('.mobile-dropbtn');
    const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');
    const themeToggle = document.getElementById('themeToggle');
    const header = document.querySelector('.header');

    // Gestion du thème
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.checked = theme === 'dark';

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Gestion des dropdowns desktop
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        let timeout;

        const showDropdown = () => {
            clearTimeout(timeout);
            content.style.display = 'block';
            requestAnimationFrame(() => {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.transform = 'translateY(0)';
                arrow.style.transform = 'rotate(180deg)';
            });
        };

        const hideDropdown = () => {
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
            content.style.transform = 'translateY(10px)';
            arrow.style.transform = '';
            timeout = setTimeout(() => {
                content.style.display = 'none';
            }, 200);
        };

        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', showDropdown);
            dropdown.addEventListener('mouseleave', hideDropdown);
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isVisible = content.style.visibility === 'visible';
            
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    const c = d.querySelector('.dropdown-content');
                    const a = d.querySelector('.dropdown-arrow');
                    if (c) {
                        c.style.opacity = '0';
                        c.style.visibility = 'hidden';
                        c.style.transform = 'translateY(10px)';
                        if (a) a.style.transform = '';
                        setTimeout(() => {
                            c.style.display = 'none';
                        }, 200);
                    }
                }
            });

            if (!isVisible) {
                showDropdown();
            } else {
                hideDropdown();
            }
        });
    });

    // Gestion du menu mobile
    const toggleMobileMenu = () => {
        const spans = hamburger.querySelectorAll('span');
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'translateY(9px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Gestion du scroll
    let lastScroll = 0;
    let scrollTimer;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.top = '0';
            header.classList.add('header-scrolled');
        } else {
            header.style.top = 'var(--navbar-margin-top)';
            header.classList.remove('header-scrolled');
        }

        scrollTimer = setTimeout(() => {
            lastScroll = currentScroll;
        }, 50);
    });

    // Gestion du dropdown mobile
    if (mobileDropBtn && mobileDropdownContent) {
        mobileDropBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = mobileDropdownContent.style.display === 'block';
            const arrow = mobileDropBtn.querySelector('i');

            if (!isExpanded) {
                mobileDropdownContent.style.display = 'block';
                requestAnimationFrame(() => {
                    mobileDropdownContent.style.opacity = '1';
                    arrow.style.transform = 'rotate(180deg)';
                });
            } else {
                mobileDropdownContent.style.opacity = '0';
                arrow.style.transform = '';
                setTimeout(() => {
                    mobileDropdownContent.style.display = 'none';
                }, 200);
            }
        });
    }

    // Fermeture au clic externe
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (content && arrow) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateY(10px)';
                    arrow.style.transform = '';
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 200);
                }
            });
        }

        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (content && arrow) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateY(10px)';
                    arrow.style.transform = '';
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 200);
                }
            });

            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tag.style.transform = 'translateY(-2px)';
        }, 100);
    });
});

// Animation de la notification
setTimeout(() => {
    const notification = document.querySelector('.floating-notification');
    notification.style.display = 'none';
}, 5000);

// Animation des boutons de recherche
document.querySelectorAll('.search-tabs button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.search-tabs button.active').classList.remove('active');
        button.classList.add('active');
    });
});