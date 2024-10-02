window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // 添加类以隐藏预加载动画
    preloader.classList.add('hidden');
    
    // 可选：在高斯模糊消失后移除预加载器
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // 和 CSS 中的过渡时间一致
});
