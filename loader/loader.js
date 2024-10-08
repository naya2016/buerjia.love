// loader.js
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');

    // 页面加载完成后隐藏预加载动画
    preloader.classList.add('hidden');

    // 可选：在高斯模糊消失后移除预加载器
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // 和 CSS 中的过渡时间一致
});

function redirectTo(url) {
    const preloader = document.getElementById('preloader');
    
    // 显示预加载动画
    preloader.style.display = 'flex'; // 假设使用 flex 进行居中显示
    preloader.classList.remove('hidden'); // 确保移除隐藏类
    
    // 设置定时器，2秒后跳转
    setTimeout(function() {
        window.location.href = url;
    }, 2000);
}
