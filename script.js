document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('navLinks');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // You might want to toggle the hamburger icon itself
        // hamburgerBtn.classList.toggle('open');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Add this to ensure the animations play correctly on load for items that load late
    // (though CSS `forwards` usually handles it well)
    const fadeInElements = document.querySelectorAll('.fade-in-item');
    fadeInElements.forEach(el => {
        el.style.opacity = 0; // Ensure they are invisible before animation starts
        el.style.transform = 'translateY(20px)'; // Starting position for the slide-up effect
        // Re-apply styles to trigger animation if they were already present on page load
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 10); // A small delay to ensure CSS is applied before transition
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing hamburger menu and clickable card scripts) ...

    // --- Gallery Lightbox Script ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = item.src;
            // Get alt text for caption, or use a data attribute if you prefer
            lightboxCaption.innerHTML = item.alt || "Hotel Image"; 
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            lightbox.classList.add('fade-in'); // Add fade-in animation
            lightbox.classList.remove('fade-out');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('fade-out'); // Add fade-out animation
        lightbox.classList.remove('fade-in');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match animation duration
    });

    // Close lightbox if clicked outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('fade-out');
            lightbox.classList.remove('fade-in');
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });

    // Close lightbox with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.classList.add('fade-out');
            lightbox.classList.remove('fade-in');
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.clickable-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const STICKY_OFFSET = 72;

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function openLightbox({ imgSrc = '', captionHtml = '' } = {}) {
        if (!lightbox) return;
        if (imgSrc) {
            lightboxImg.src = imgSrc;
            lightboxImg.style.display = '';
        } else {
            lightboxImg.src = '';
            lightboxImg.style.display = 'none';
        }
        lightboxCaption.innerHTML = captionHtml || '';
        document.body.style.overflow = 'hidden';
        lightbox.style.display = 'block';
        lightbox.classList.remove('fade-out');
        lightbox.classList.add('fade-in');
        // move focus into lightbox for accessibility
        closeBtn?.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('fade-in');
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            lightboxImg.src = '';
            lightboxCaption.innerHTML = '';
        }, 240); // match CSS animation duration if present
    }

    // Make service cards clickable and keyboard accessible
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.serviceUrl;
            const title = card.querySelector('h3')?.textContent.trim() || '';
            const desc = card.querySelector('p')?.textContent.trim() || '';

            // If data-service-url points to an element on the page, smooth-scroll to it
            if (target && target.startsWith('#')) {
                const targetEl = document.querySelector(target);
                if (targetEl) {
                    const top = targetEl.getBoundingClientRect().top + window.pageYOffset - STICKY_OFFSET;
                    window.scrollTo({ top, behavior: 'smooth' });
                    // focus target for accessibility
                    targetEl.setAttribute('tabindex', '-1');
                    targetEl.focus({ preventScroll: true });
                    setTimeout(() => targetEl.removeAttribute('tabindex'), 1200);
                    return;
                }
            }

            // Otherwise show a simple lightbox with card content (no image)
            const captionHtml = `<strong>${escapeHtml(title)}</strong><div>${escapeHtml(desc)}</div>`;
            openLightbox({ imgSrc: '', captionHtml });
        });

        // support keyboard activation (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Close handlers for the lightbox
    closeBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') closeLightbox();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.clickable-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const STICKY_OFFSET = 72;

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function openLightbox({ imgSrc = '', captionHtml = '' } = {}) {
        if (!lightbox) return;
        if (imgSrc) {
            lightboxImg.src = imgSrc;
            lightboxImg.style.display = '';
        } else {
            lightboxImg.src = '';
            lightboxImg.style.display = 'none';
        }
        lightboxCaption.innerHTML = captionHtml || '';
        document.body.style.overflow = 'hidden';
        lightbox.style.display = 'block';
        lightbox.classList.remove('fade-out');
        lightbox.classList.add('fade-in');
        // move focus into lightbox for accessibility
        closeBtn?.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('fade-in');
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            lightboxImg.src = '';
            lightboxCaption.innerHTML = '';
        }, 240); // match CSS animation duration if present
    }

    // Make service cards clickable and keyboard accessible
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.serviceUrl;
            const title = card.querySelector('h3')?.textContent.trim() || '';
            const desc = card.querySelector('p')?.textContent.trim() || '';

            // If data-service-url points to an element on the page, smooth-scroll to it
            if (target && target.startsWith('#')) {
                const targetEl = document.querySelector(target);
                if (targetEl) {
                    const top = targetEl.getBoundingClientRect().top + window.pageYOffset - STICKY_OFFSET;
                    window.scrollTo({ top, behavior: 'smooth' });
                    // focus target for accessibility
                    targetEl.setAttribute('tabindex', '-1');
                    targetEl.focus({ preventScroll: true });
                    setTimeout(() => targetEl.removeAttribute('tabindex'), 1200);
                    return;
                }
            }

            // Otherwise show a simple lightbox with card content (no image)
            const captionHtml = `<strong>${escapeHtml(title)}</strong><div>${escapeHtml(desc)}</div>`;
            openLightbox({ imgSrc: '', captionHtml });
        });

        // support keyboard activation (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Close handlers for the lightbox
    closeBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') closeLightbox();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const MOBILE_NAV_ID = 'navLinks'; // update if your nav id differs
    const STICKY_OFFSET = 72; // adjust for your sticky header height

    function findTarget(selectorOrName) {
        // Accept values like "#services", "services", ".services-section"
        if (!selectorOrName) return null;
        let sel = selectorOrName;
        if (!sel.startsWith('#') && !sel.startsWith('.')) {
            sel = '#' + sel; // prefer id first
        }
        return document.querySelector(selectorOrName) || document.querySelector(sel) || null;
    }

    function smoothScrollTo(element) {
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.pageYOffset - STICKY_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        // move focus for accessibility after the scroll
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
        // remove tabindex after a short delay to restore natural tab order
        setTimeout(() => element.removeAttribute('tabindex'), 1200);
    }

    // Select navbar items that should trigger section scroll:
    const navTriggers = document.querySelectorAll(
        '.nav-links a[href^="#"], .nav-right a[href^="#"], [data-target], .nav-links button[data-target], .nav-right button[data-target]'
    );

    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Determine target from href or data-target
            const href = trigger.getAttribute('href');
            const dataTarget = trigger.dataset && trigger.dataset.target;
            const targetKey = href && href.startsWith('#') ? href : dataTarget || href;
            if (!targetKey) return; // not a scroll trigger

            // Prevent default link navigation when scrolling
            if (href && href.startsWith('#')) e.preventDefault();

            const name = targetKey.replace(/^#/, '').trim();
            const targetEl = findTarget(`#${name}`) || findTarget(`.${name}`) || findTarget(name);
            if (targetEl) {
                smoothScrollTo(targetEl);
            }

            // Close mobile nav if open
            const navLinks = document.getElementById(MOBILE_NAV_ID);
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Optional: update active nav item on scroll (keeps nav state in sync)
    const sectionAnchors = Array.from(document.querySelectorAll('section[id], section[class]'))
        .map(s => ({ el: s, id: s.id || s.className.split(' ')[0] }))
        .filter(s => s.id);
    if (sectionAnchors.length) {
        const navLinksMap = new Map();
        document.querySelectorAll('.nav-links a[href^="#"], .nav-right a[href^="#"]').forEach(a => {
            const ref = (a.getAttribute('href') || '').replace('#', '');
            if (ref) navLinksMap.set(ref, a);
        });
        let lastActive = null;
        window.addEventListener('scroll', () => {
            const fromTop = window.scrollY + STICKY_OFFSET + 6;
            for (let i = sectionAnchors.length - 1; i >= 0; i--) {
                const s = sectionAnchors[i];
                if (s.el.offsetTop <= fromTop) {
                    if (lastActive !== s.id) {
                        if (navLinksMap.get(lastActive)) navLinksMap.get(lastActive).classList.remove('active');
                        const next = navLinksMap.get(s.id);
                        if (next) next.classList.add('active');
                        lastActive = s.id;
                    }
                    break;
                }
            }
        }, { passive: true });
    }
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');

    // Inject minimal modal styles (only once)
    if (!document.getElementById('login-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'login-modal-styles';
        style.textContent = `
        .login-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:10000}
        .login-modal{background:#fff;border-radius:10px;max-width:420px;width:92%;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,0.2);font-family:inherit}
        .login-modal h3{margin:0 0 12px;font-size:1.15rem}
        .login-modal .form-row{margin-bottom:10px}
        .login-modal label{display:block;font-size:0.9rem;margin-bottom:6px}
        .login-modal input{width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font-size:0.95rem;box-sizing:border-box}
        .login-modal .row-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
        .login-modal .btn{padding:8px 12px;border-radius:6px;border:none;cursor:pointer}
        .login-modal .btn-primary{background:#ff8c3b;color:#fff}
        .login-modal .btn-ghost{background:transparent;border:1px solid #ccc}
        .login-error{color:#b00020;font-size:0.88rem;margin-top:6px}
        `;
        document.head.appendChild(style);
    }

    function buildLoginModal() {
        if (document.getElementById('login-modal-backdrop')) return;
        const backdrop = document.createElement('div');
        backdrop.id = 'login-modal-backdrop';
        backdrop.className = 'login-modal-backdrop';
        backdrop.style.display = 'none';

        backdrop.innerHTML = `
            <div class="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
                <h3 id="login-title">Member Login</h3>
                <form id="login-form" novalidate>
                    <div class="form-row">
                        <label for="login-email">Email
                            <input id="login-email" name="email" type="email" required autocomplete="email">
                        </label>
                    </div>
                    <div class="form-row">
                        <label for="login-password">Password
                            <input id="login-password" name="password" type="password" required autocomplete="current-password">
                        </label>
                    </div>
                    <div class="login-error" id="login-error" aria-live="polite"></div>
                    <div class="row-actions">
                        <button type="button" class="btn btn-ghost" id="login-cancel">Cancel</button>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(backdrop);

        // handlers
        const form = document.getElementById('login-form');
        const cancelBtn = document.getElementById('login-cancel');
        const errorEl = document.getElementById('login-error');

        function showModal() {
            backdrop.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.getElementById('login-email').focus();
        }
        function hideModal() {
            backdrop.style.display = 'none';
            document.body.style.overflow = '';
            errorEl.textContent = '';
            // return focus to login button
            loginBtn?.focus();
        }

        cancelBtn.addEventListener('click', hideModal);
        backdrop.addEventListener('click', (e) => { if (e.target === backdrop) hideModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && backdrop.style.display === 'flex') hideModal(); });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.email.value.trim();
            const password = form.password.value.trim();
            // Simple client-side validation
            if (!email || !password) {
                errorEl.textContent = 'Please enter both email and password.';
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                errorEl.textContent = 'Please enter a valid email address.';
                return;
            }

            // TODO: send to server. For now simulate success:
            console.log('Login attempt:', { email });
            // show simple success and close
            errorEl.textContent = '';
            hideModal();
            // Optional: show logged-in state (very basic)
            const loginText = document.createElement('span');
            loginText.textContent = `Hi, ${email.split('@')[0]}`;
            loginText.className = 'login-greeting';
            loginBtn.replaceWith(loginText);
        });

        return { showModal, hideModal };
    }

    // open modal on click
    if (loginBtn) {
        const modal = buildLoginModal();
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // rebuild if needed and show
            const instance = buildLoginModal();
            // instance returned once; call showModal
            const backdrop = document.getElementById('login-modal-backdrop');
            if (backdrop) backdrop.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const emailInput = document.getElementById('login-email');
            if (emailInput) emailInput.focus();
        });
    }
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    // Ensure sections match navbar hrefs: add ids if missing
    const ensureIds = [
        { sel: '.services-section', id: 'services' },
        { sel: '.Contact-section', id: 'contact' }, // matches your HTML (capital C)
        { sel: '.booking-form-section', id: 'booking' } // optional, if you want #booking
    ];
    ensureIds.forEach(item => {
        const el = document.querySelector(item.sel);
        if (el && !el.id) el.id = item.id;
    });

    // Smooth scroll helper (accounts for sticky header)
    const HEADER_OFFSET = 72;
    function smoothScrollToSelector(selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        // accessibility: move focus briefly
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        setTimeout(() => el.removeAttribute('tabindex'), 1200);
    }

    // Attach click handlers for navbar items that point to services/contact
    document.querySelectorAll('.nav-links a[href="#services"], .nav-links a[href="#contact"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href'); // "#services" or "#contact"
            smoothScrollToSelector(href);
            // close mobile nav if open
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
        });
    });
});

// --- Functionality for Add to Cart Buttons ---
document.addEventListener('DOMContentLoaded', () => {
    // ... existing scripts (hamburger, lightbox, etc.) ...

    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let currentCartCount = 0; // Initialize cart count

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Increment the count
            currentCartCount++;

            // 2. Update the display in the header
            if (cartCountElement) {
                cartCountElement.textContent = currentCartCount;
            }

            // 3. Optional: Provide user feedback
            button.textContent = 'Added!';
            button.disabled = true;

            // Reset the button text after a short delay (e.g., 1 second)
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
            }, 1000);

            // Optional: Log the room name to the console
            const roomName = button.closest('.room-card').querySelector('h3').textContent;
            console.log(`Room added to cart: ${roomName}`);
        });
    });
});