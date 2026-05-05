let currentSlide = 0;
let currentStep = 1; // Step bắt đầu từ 1

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// ================== UPDATE SLIDE ==================
function updateSlide(isInstant = false) {
    // Di chuyển slider
    slider.style.transition = isInstant
        ? 'none'
        : 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';

    // slider.style.transform = `translateY(-${currentSlide * 100}vh)`;
    slider.style.transform = `translateY(-${currentSlide * 100}dvh)`;

    // Xử lý active + step
    slides.forEach((slide, index) => {
        // reset step class
        slide.className = slide.className.replace(/\bshow-step-\d+\b/g, '').trim();

        if (index === currentSlide) {
            slide.classList.add('active');

            // luôn add step hiện tại
            slide.classList.add(`show-step-${currentStep}`);
        } else {
            slide.classList.remove('active');
        }
    });
}

// ================== CONTROL ==================

// ↓ chỉ xuống slide
function goDown() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        currentStep = 1;
        updateSlide();
    }
}

// ↑ chỉ lên slide
function goUp() {
    if (currentSlide > 0) {
        currentSlide--;
        currentStep = 1;
        updateSlide();
    }
}

// → chỉ tăng step
function goRight() {
    const activeSlide = slides[currentSlide];
    const totalSteps = parseInt(activeSlide.getAttribute('data-total-steps')) || 1;

    if (currentStep < totalSteps) {
        currentStep++;
        updateSlide();
    }
}


document.addEventListener("keydown", (e) => {
    if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});


// ← chỉ giảm step
function goLeft() {
    if (currentStep > 1) {
        currentStep--;
        updateSlide();
    }
}

// ================== KEYBOARD ==================
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowDown") goDown();
    if (e.key === "ArrowUp") goUp();
    if (e.key === "ArrowRight") goRight();
    if (e.key === "ArrowLeft") goLeft();
});

// ================== BUTTON ==================

// ⚠️ sửa lại đúng function
document.getElementById('nextBtn')?.addEventListener('click', goDown);
document.getElementById('prevBtn')?.addEventListener('click', goUp);

// nếu bạn có thêm nút trái/phải
document.getElementById('leftBtn')?.addEventListener('click', goLeft);
document.getElementById('rightBtn')?.addEventListener('click', goRight);

// ================== INIT ==================
window.onload = () => updateSlide(true);