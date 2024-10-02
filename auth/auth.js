// auth.js

// 设置 Cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;";
}

// 获取 Cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 删除 Cookie
function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999; path=/;";
}

// 哈希函数（使用 SHA-256）
async function hashString(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// 添加高斯模糊样式
function applyBlur() {
    const authElements = document.querySelectorAll('[class^="auth"]');
    authElements.forEach(el => {
        el.style.filter = 'blur(20px)';
        el.style.pointerEvents = 'none'; // 禁止交互
    });
}

// 移除高斯模糊样式
function removeBlur() {
    const authElements = document.querySelectorAll('[class^="auth"]');
    authElements.forEach(el => {
        el.style.filter = '';
        el.style.pointerEvents = '';
    });
}

// 检查登录状态
async function checkLogin(isMainPage = false) {
    const isBlocked = getCookie('authBlock');
    const currentPath = window.location.pathname;

    // 如果不是首页，验证登录状态
    if (!isMainPage) {
        if (isBlocked) {
            window.location.href = '/404.html';
            return;
        }

        const savedUsername = getCookie('username');
        const savedPasswordHash = getCookie('passwordHash');
        const correctUsername = "不二家"; // 设置正确的用户名
        const correctPasswordHash = "174344edc7408789a8ddf6af57aac26f609834c709cbae5cf5f260b05887b62c"; // 示例哈希值，请替换为实际值

        if (!(savedUsername === correctUsername && savedPasswordHash === correctPasswordHash)) {
            window.location.href = '/page/404/index.html';
        }
    } else {
        // 首页相关逻辑
        if (isBlocked) {
            alert('由于多次错误登录尝试，您今天无法登录。请明天再试。');
            applyBlur(); // 模糊内容
        }
    }
}

// 添加退出按钮的事件监听
function addLogoutButtonListener() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            eraseCookie('username');
            eraseCookie('passwordHash');
            eraseCookie('authAttempts');
            eraseCookie('authBlock');
            alert('您已退出登录。');
            window.location.reload();
        });
    }
}

// 导出函数以便在其他脚本中使用
window.auth = {
    setCookie,
    getCookie,
    eraseCookie,
    hashString,
    applyBlur,
    removeBlur,
    checkLogin,
    addLogoutButtonListener
};
