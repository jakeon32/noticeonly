// Version
const APP_VERSION = '1.0.0-minimal';
console.log(`APEC Notice Board (Minimal) v${APP_VERSION}`);

// Google Sheets configuration
const SHEET_ID = '1eNbtOWkGkxssPvnwQmcojzM4vz8EbRTG68YGasMd70A';
const API_KEY = 'AIzaSyBsDCggkg91Cw8xr-8ryN-HLFhj_m34oeg';
const SHEET_NAME = 'notices';

let notices = [];
let currentIndex = 0;
let autoRotateTimer = null;

// Load notices from Google Sheets
async function loadNotices() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.values && data.values.length > 1) {
            // Parse data: title, date, category, (type - skip), content
            notices = data.values.slice(1).map((row, index) => ({
                id: index,
                title: row[0] || '',
                date: row[1] || '',
                category: row[2] || 'NOTICE',
                tag: (row[2] || 'general').toLowerCase(),
                content: row[4] || row[3] || '' // row[4] if type exists, fallback to row[3]
            })).filter(notice => notice.title);

            // Filter out closed notices (cookie-based)
            notices = notices.filter(notice => {
                const cookieName = `notice_${notice.id}_closed`;
                return !document.cookie.includes(`${cookieName}=true`);
            });

            if (notices.length > 0) {
                currentIndex = 0;
                showBanner();
            }
        }
    } catch (error) {
        console.error('Error loading notices:', error);
    }
}

// Show banner with current notice
function showBanner() {
    if (notices.length === 0) return;

    const notice = notices[currentIndex];
    const banner = document.getElementById('topBanner');

    // Set category class for color
    banner.className = notice.tag === 'urgent' ? 'urgent show' :
                       notice.tag === 'info' ? 'info show' : 'notice show';

    // Banner HTML
    banner.innerHTML = `
        <div class="banner-content" onclick="openDetail()">
            <span class="banner-icon">
                <img src="images/gridicons_notice.svg" alt="notice" width="20" height="20">
            </span>
            <span class="banner-text">${notice.title}</span>
        </div>
        ${notices.length > 1 ? `
        <div class="banner-nav">
            <span class="banner-page">${currentIndex + 1}/${notices.length}</span>
            <button class="banner-nav-btn" onclick="navigate(-1)" ${currentIndex === 0 ? 'disabled' : ''}>‹</button>
            <button class="banner-nav-btn" onclick="navigate(1)" ${currentIndex === notices.length - 1 ? 'disabled' : ''}>›</button>
        </div>
        ` : ''}
        <button class="banner-close" onclick="closeBanner(event)">
            <img src="images/close.svg" alt="close" width="24" height="24">
        </button>
    `;

    // Auto-rotate if multiple notices
    startAutoRotate();
}

// Navigate between notices
function navigate(direction) {
    stopAutoRotate();

    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < notices.length) {
        currentIndex = newIndex;
        showBanner();
    }
}

// Close banner and save to cookie
function closeBanner(event) {
    event.stopPropagation();

    const notice = notices[currentIndex];
    const cookieName = `notice_${notice.id}_closed`;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
    document.cookie = `${cookieName}=true; expires=${expiryDate.toUTCString()}; path=/`;

    stopAutoRotate();

    // Remove from array
    notices.splice(currentIndex, 1);

    // Show next or hide banner
    if (notices.length > 0) {
        if (currentIndex >= notices.length) {
            currentIndex = notices.length - 1;
        }
        showBanner();
    } else {
        document.getElementById('topBanner').classList.remove('show');
    }
}

// Open detail modal
function openDetail() {
    const notice = notices[currentIndex];
    const modal = document.createElement('div');
    modal.className = 'banner-detail show';
    modal.innerHTML = `
        <div class="detail-card">
            <div class="detail-header">
                <div class="detail-title">
                    <h2>${notice.title}</h2>
                    <div class="detail-meta">
                        <span>${notice.date}</span>
                        <span>•</span>
                        <span>${notice.category}</span>
                    </div>
                </div>
                <button class="detail-close" onclick="closeDetail()">
                    <img src="images/x-close.png" alt="close">
                </button>
            </div>
            <div class="detail-body" id="detailBody">
                ${notice.content}
            </div>
        </div>
    `;

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDetail();
        }
    });

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Check if content is scrollable and add gradient hint
    setTimeout(() => {
        const detailBody = document.getElementById('detailBody');
        const detailCard = detailBody.closest('.detail-card');

        function checkScroll() {
            if (detailBody.scrollHeight > detailBody.clientHeight) {
                detailCard.classList.add('has-scroll');

                // Remove gradient when scrolled to bottom
                detailBody.addEventListener('scroll', () => {
                    const isAtBottom = detailBody.scrollHeight - detailBody.scrollTop <= detailBody.clientHeight + 10;
                    if (isAtBottom) {
                        detailCard.classList.remove('has-scroll');
                    } else {
                        detailCard.classList.add('has-scroll');
                    }
                });
            }
        }

        checkScroll();
    }, 100);
}

// Close detail modal
function closeDetail() {
    const modal = document.querySelector('.banner-detail');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Auto-rotate notices
function startAutoRotate() {
    stopAutoRotate();

    if (notices.length > 1) {
        autoRotateTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % notices.length;
            showBanner();
        }, 5000); // 5 seconds
    }
}

function stopAutoRotate() {
    if (autoRotateTimer) {
        clearInterval(autoRotateTimer);
        autoRotateTimer = null;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetail();
    } else if (e.key === 'ArrowLeft' && notices.length > 1) {
        navigate(-1);
    } else if (e.key === 'ArrowRight' && notices.length > 1) {
        navigate(1);
    }
});

// Load on page load
window.addEventListener('load', loadNotices);
