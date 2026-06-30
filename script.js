document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar & Progress Bar ---
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '5px 0';
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        }
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 2. Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    fadeElements.forEach(el => observer.observe(el));

    // --- 3. File Tree Interactions ---
    const folderNames = document.querySelectorAll('.tree .folder-name');
    folderNames.forEach(folder => {
        folder.addEventListener('click', function () {
            const ul = this.nextElementSibling;
            // Skip if the next sibling is a tag, find the UL
            let targetUl = ul;
            if (targetUl && targetUl.tagName !== 'UL') {
                targetUl = targetUl.nextElementSibling;
            }
            if (targetUl && targetUl.tagName === 'UL') {
                targetUl.classList.toggle('active');
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-folder')) {
                    icon.classList.replace('fa-folder', 'fa-folder-open');
                } else if (icon.classList.contains('fa-folder-open')) {
                    icon.classList.replace('fa-folder-open', 'fa-folder');
                }
            }
        });
    });

    const interactiveFiles = document.querySelectorAll('.file-name.interactive');
    const previews = document.querySelectorAll('.code-card, .preview-placeholder');

    interactiveFiles.forEach(file => {
        file.addEventListener('click', function () {
            interactiveFiles.forEach(f => f.classList.remove('active'));
            previews.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const fileType = this.getAttribute('data-file');
            const targetPreview = document.getElementById(`preview-${fileType}`);
            if (targetPreview) {
                targetPreview.classList.add('active');
            }
        });
    });

    // --- 4. Code Gen Simulation (مطور - 3 مشاريع) ---
    const runBtn = document.getElementById('run-gen-btn');
    const yamlTyping = document.getElementById('yaml-typing');
    const termTyping = document.getElementById('term-typing');
    const termOutput = document.getElementById('term-output');

    const tsLine = document.getElementById('ts-result-line');
    const reactLine = document.getElementById('react-result-line');
    const dartLine = document.getElementById('dart-result-line');
    const dartVendorLine = document.getElementById('dart-vendor-result-line');

    let currentField = 'special_requests';
    let currentType = 'string';

    function resetCodeGen() {
        yamlTyping.innerHTML = '';
        termTyping.innerHTML = '';
        termOutput.innerHTML = '';
        tsLine.innerHTML = '';
        reactLine.innerHTML = '';
        dartLine.innerHTML = '';
        dartVendorLine.innerHTML = '';
        [tsLine, reactLine, dartLine, dartVendorLine].forEach(el => el.classList.remove('active'));
    }

    async function typeText(element, text, speed = 30) {
        element.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i) === '\\' ? '<br>' : text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    }

    async function runCodeGenerationScenario(fieldName, fieldType) {
        resetCodeGen();
        runBtn.disabled = true;
        document.querySelectorAll('.preset-btn').forEach(b => b.disabled = true);

        // 1. Type in YAML
        const yamlCode = `  <span class="highlight-line">      ${fieldName}:</span>\\  <span class="highlight-line">        type: ${fieldType}</span>`;
        await typeText(yamlTyping, yamlCode, 20);
        await new Promise(r => setTimeout(r, 500));

        // 2. Terminal
        await typeText(termTyping, 'npm run generate', 50);
        await new Promise(r => setTimeout(r, 500));
        termOutput.innerHTML = `> rehla-monorepo@1.0.0 generate<br>> turbo run generate<br><br><span style="color:#00b894">✔</span> api-contract: openapi validated<br><span style="color:#00b894">✔</span> backend: booking.types.ts updated<br><span style="color:#00b894">✔</span> admin-dashboard: useBookings.ts updated<br><span style="color:#00b894">✔</span> customer-app: booking_model.dart updated<br><span style="color:#00b894">✔</span> vendor-app: booking_model.dart updated<br><br><span style="color:#6c7086">Done in 2.3s</span>`;
        await new Promise(r => setTimeout(r, 500));

        // 3. Show results in 4 places
        let tsSuffix = fieldType === 'string' ? '?: string;' : ': number;';
        let dartType = fieldType === 'string' ? 'String?' : 'int?';

        tsLine.innerHTML = `  <span class="highlight-line">${fieldName}${tsSuffix}</span>`;
        reactLine.innerHTML = `  <span class="highlight-line">// ${fieldName} is auto-typed!</span>`;
        dartLine.innerHTML = `  <span class="highlight-line">final ${dartType} ${fieldName};</span>`;
        dartVendorLine.innerHTML = `  <span class="highlight-line">final ${dartType} ${fieldName};</span>`;

        [tsLine, reactLine, dartLine, dartVendorLine].forEach(el => el.classList.add('active'));

        runBtn.disabled = false;
        document.querySelectorAll('.preset-btn').forEach(b => b.disabled = false);
    }

    // Main Run button
    runBtn.addEventListener('click', () => runCodeGenerationScenario(currentField, currentType));

    // Preset buttons (special_requests, backup_phone, max_pax, ticket_number)
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const field = this.getAttribute('data-field');
            const type = this.getAttribute('data-type');
            currentField = field;
            currentType = type;
            // Highlight the active preset
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active-preset'));
            this.classList.add('active-preset');
            runCodeGenerationScenario(field, type);
        });
    });

    // --- 5. CI/CD Pipeline Simulation (مع رسالة خطأ حقيقية + زرار يدوي) ---
    const runCicdBtn = document.getElementById('run-cicd-btn');
    const fixBtn = document.getElementById('fix-error-btn');
    const errorDetail = document.getElementById('error-detail');
    const explanation = document.getElementById('cicd-explanation');

    if (runCicdBtn) {
        runCicdBtn.addEventListener('click', async function () {
            this.disabled = true;
            this.style.animation = 'none';
            errorDetail.classList.remove('visible');
            explanation.classList.remove('visible');
            explanation.innerHTML = `<h3>✅ النتيجة: <span class="text-success">تم منع الدمج!</span></h3><p>الـ Pipeline وقف بناء الكود لأن الـ TypeScript اكتشف أن <code>Booking</code> عنده حقل جديد لكن الخدمة (Service) مش بتستخدمه. كده منضمنش إن الكود الخاطئ يوصل للمستخدمين (Production).</p>`;

            const steps = [
                document.getElementById('step-push'),
                document.getElementById('step-gen'),
                document.getElementById('step-build'),
                document.getElementById('step-result')
            ];
            const lines = [
                document.getElementById('line-1'),
                document.getElementById('line-2'),
                document.getElementById('line-3')
            ];

            steps.forEach(s => { s.classList.remove('active', 'success', 'error'); s.style.opacity = '0.5'; });
            lines.forEach(l => l.classList.remove('active', 'error'));

            // Step 1: Push
            steps[0].style.opacity = '1';
            steps[0].classList.add('active', 'success');
            await new Promise(r => setTimeout(r, 800));
            lines[0].classList.add('active');
            await new Promise(r => setTimeout(r, 600));

            // Step 2: Generate
            steps[1].style.opacity = '1';
            steps[1].classList.add('active', 'success');
            await new Promise(r => setTimeout(r, 800));
            lines[1].classList.add('active');
            await new Promise(r => setTimeout(r, 600));

            // Step 3: Build Fails
            steps[2].style.opacity = '1';
            steps[2].classList.add('active', 'error');
            await new Promise(r => setTimeout(r, 600));
            lines[2].classList.add('error');
            await new Promise(r => setTimeout(r, 600));

            // Step 4: Show error
            steps[3].style.opacity = '1';
            steps[3].classList.add('active', 'error');

            // Show detailed error message
            setTimeout(() => {
                errorDetail.classList.add('visible');
                this.disabled = false;
            }, 400);
        });
    }

    // Fix button (يحاكي إصلاح الخطأ)
    if (fixBtn) {
        fixBtn.addEventListener('click', function () {
            errorDetail.classList.remove('visible');
            // Reset steps to success
            const steps = document.querySelectorAll('.pipeline-step');
            steps.forEach(s => { s.classList.remove('error'); s.classList.add('success'); });
            document.querySelectorAll('.pipeline-line').forEach(l => { l.classList.remove('error'); l.classList.add('active'); });

            // Update the last step icon to checkmark
            const lastStep = document.getElementById('step-result');
            lastStep.querySelector('.step-icon').innerHTML = '<i class="fas fa-check"></i>';
            lastStep.querySelector('.step-label').textContent = 'PR Merged! ✅';

            // Show success explanation
            setTimeout(() => {
                explanation.classList.add('visible');
                explanation.innerHTML = `<h3>✅ Pipeline نجح!</h3><p>خالد راح عدل الـ <code>booking.service.ts</code> وأضاف <code>special_requests</code> في الـ DTO والدالة. الـ Type Check اتأكد إن كل حاجة تمام. كده الكود الجديد هيوصل للمستخدمين بأمان. 🎉</p>`;
            }, 300);

            this.disabled = true;
            // Reset after 3 seconds to allow re-run
            setTimeout(() => {
                this.disabled = false;
                lastStep.querySelector('.step-icon').innerHTML = '<i class="fas fa-times"></i>';
                lastStep.querySelector('.step-label').textContent = 'PR Rejected!';
                runCicdBtn.style.animation = 'pulse-glow 2s infinite alternate';
            }, 3000);
        });
    }

    // --- 6. Particles Background ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 1 - 0.5,
                vy: Math.random() * 1 - 0.5
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
                if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                    if (dist < 150) {
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                }
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.stroke();
            ctx.fill();

            requestAnimationFrame(drawParticles);
        }
        drawParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});