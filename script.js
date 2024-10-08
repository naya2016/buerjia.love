document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    const isMainPage = (window.location.pathname === '/' || window.location.pathname === '/index.html');

    // 首页检查登录状态
    await auth.checkLogin(isMainPage);

    if (isMainPage) {
        const isBlocked = auth.getCookie('authBlock');
        const savedUsername = auth.getCookie('username');
        const savedPasswordHash = auth.getCookie('passwordHash');
        const correctUsername = "不二家"; // 设置正确的用户名
        const correctPasswordHash = "174344edc7408789a8ddf6af57aac26f609834c709cbae5cf5f260b05887b62c"; // 示例哈希值，请替换为实际值

        if (savedUsername === correctUsername && savedPasswordHash === correctPasswordHash) {
            // 已登录，加载主内容
            loadMainContent();
            auth.removeBlur(); // 移除模糊效果
        } else {
            // 未登录，显示登录表单
            app.innerHTML = `
                <div class="login auth-login">
                    <video autoplay muted loop class="login__video">
                        <source src="login-assets/img/back.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>

                    <form class="login__form">
                        <h1 class="login__title">登录</h1>

                        <div class="login__content">
                            <div class="login__box">
                                <i class="ri-user-3-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="text" required class="login__input" id="login-username" placeholder=" ">
                                    <label for="login-username" class="login__label">用户名</label>
                                </div>
                            </div>

                            <div class="login__box">
                                <i class="ri-lock-2-line login__icon"></i>
                                <div class="login__box-input">
                                    <input type="password" required class="login__input" id="login-pass" placeholder=" ">
                                    <label for="login-pass" class="login__label">密码</label>
                                    <i class="ri-eye-off-line login__eye" id="login-eye"></i>
                                </div>
                            </div>
                        </div>

                        <div class="login__check">
                            <div class="login__check-group">
                                <input type="checkbox" class="login__check-input" id="login-check">
                                <label for="login-check" class="login__check-label">记住我</label>
                            </div>

                            <a href="#" class="login__forgot">忘记密码？</a>
                        </div>

                        <button type="submit" class="login__button">登录</button>

                        <p class="login__register">
                            没有账户？那你不准看！ <a href="#">注册？没门哈哈</a>
                        </p>
                    </form>
                </div>
            `;

            // 添加事件监听
            document.querySelector('.login__form').addEventListener('submit', checkCredentials);

            // 处理密码可见性切换（可选）
            const loginEye = document.getElementById('login-eye');
            loginEye.addEventListener('click', () => {
                const passwordInput = document.getElementById('login-pass');
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    loginEye.classList.remove('ri-eye-off-line');
                    loginEye.classList.add('ri-eye-line');
                } else {
                    passwordInput.type = 'password';
                    loginEye.classList.remove('ri-eye-line');
                    loginEye.classList.add('ri-eye-off-line');
                }
            });
        }

        // 退出按钮事件
        document.getElementById('logoutButton').addEventListener('click', () => {
            const confirmed = confirm('您确定要退出登录吗？');
            if (confirmed) {
                // 清空 Cookies
                auth.eraseCookie('username');
                auth.eraseCookie('passwordHash');
                auth.eraseCookie('authAttempts');
                auth.eraseCookie('authBlock');

                // 刷新页面以反映状态变化
                window.location.reload();
            }
        });
    }
});

async function checkCredentials(e) {
    e.preventDefault();

    const maxAttempts = 5;
    const blockDurationDays = 1;
    const attemptWindowDays = 1;

    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-pass');
    const correctUsername = "不二家"; // 设置正确的用户名
    const correctPasswordHash = "174344edc7408789a8ddf6af57aac26f609834c709cbae5cf5f260b05887b62c"; // 示例哈希值，请替换为实际值

    // 获取当前时间戳
    const currentTime = Date.now();

    // 获取之前的错误尝试记录
    let attempts = JSON.parse(auth.getCookie('authAttempts') || '[]');

    // 过滤掉超过时间窗口的尝试
    const windowTime = attemptWindowDays * 24 * 60 * 60 * 1000; // 1 天
    attempts = attempts.filter(timestamp => currentTime - timestamp < windowTime);

    // 哈希输入的密码
    const inputPasswordHash = await auth.hashString(passwordInput.value);

    if (usernameInput.value === correctUsername && inputPasswordHash === correctPasswordHash) {
        // 成功登录，设置 Cookie，有效期为7天
        auth.setCookie("username", correctUsername, 7);
        auth.setCookie("passwordHash", inputPasswordHash, 7);

        // 清除错误记录
        auth.eraseCookie('authAttempts');
        auth.eraseCookie('authBlock');

        const loginForm = document.querySelector('.login');
        loginForm.classList.add('fade-out'); // 添加渐隐效果

        setTimeout(() => {
            loginForm.style.display = 'none';
            loadMainContent();
            auth.removeBlur(); // 移除模糊效果
        }, 500);
    } else {
        // 记录错误尝试
        attempts.push(currentTime);
        auth.setCookie('authAttempts', JSON.stringify(attempts), blockDurationDays); // 设置为1天后过期

        if (attempts.length >= maxAttempts) {
            // 超过最大尝试次数，设置阻止 Cookie
            auth.setCookie('authBlock', 'true', blockDurationDays);
            alert('错误次数过多，您已被锁定一天。');
            auth.applyBlur(); // 模糊内容
        } else {
            const remaining = maxAttempts - attempts.length;
            alert(`用户名或密码错误，请重试。您还有 ${remaining} 次尝试机会。`);
        }

        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
    }
}

function loadMainContent() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>
            <span class="ma-shan-zheng">你笑起来，</span>
            <span class="ma-shan-zheng">真好看！</span>
            <br>
            <span class="ma-shan-zheng">让我们保持微笑叭~</span>
        </h1>

        <button class="circle-button" id="openButton">
            <span class="ma-shan-zheng">开启</span>
        </button>

        <div class="overlay" id="overlay">
            <div class="overlay-content ma-shan-zheng">正在开启新世界...</div>
        </div>

        <iframe id="nextPageFrame" src="about:blank"></iframe>
    `;

    const titleSpans = document.querySelectorAll('h1 span');
    titleSpans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.5}s`;
    });

    document.getElementById('openButton').addEventListener('click', handleOpenButtonClick);
}

function handleOpenButtonClick(e) {
    e.preventDefault();
    const button = e.target.closest('.circle-button');
    const overlay = document.getElementById('overlay');
    const nextPageFrame = document.getElementById('nextPageFrame');
    const title = document.querySelector('h1');
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    nextPageFrame.src = './page/explanations/index.html';

    title.style.opacity = '0';

    overlay.style.display = 'flex';
    overlay.style.width = overlay.style.height = `${button.offsetWidth}px`;
    overlay.style.left = `${buttonCenterX}px`;
    overlay.style.top = `${buttonCenterY}px`;
    overlay.style.transform = 'translate(-50%, -50%)';

    button.style.animation = 'none';

    setTimeout(() => {
        const maxDim = Math.max(window.innerWidth, window.innerHeight);
        overlay.style.width = overlay.style.height = `${maxDim * 2.5}px`;
    }, 50);

    setTimeout(() => {
        nextPageFrame.style.opacity = '1';
        nextPageFrame.style.zIndex = '30';
    }, 1000);
}

// 使用requestAnimationFrame更新光标
let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function updateCursor() {
    const cursorElements = [t, e, i]; // 假设t, e, i是你的光标元素
    cursorElements.forEach(cursor => {
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });
    requestAnimationFrame(updateCursor);
}

// 动画时间线
const animationTimeline = () => {
    // 这里你可以根据新网页的结构调整动画逻辑
    const tl = gsap.timeline();

    tl.to(".nav", { duration: 0.5, opacity: 1, y: 0 })
      // 添加更多动画步骤，根据需要调整
      ;

    // 示例动画，实际根据你的需求进行调整
};
