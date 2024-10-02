document.addEventListener('DOMContentLoaded', () => {
    // 模拟加载过程
    const preloader = document.getElementById('preloader');

    // 模拟加载完成后
    setTimeout(() => {
        document.body.classList.add('loaded'); // 添加 loaded 类
    }, 2000); // 假设加载时间为2秒

    init(); // 初始化页面
});

function init() {
    // 初始化页面内容
    const app = document.getElementById('app');
    // 你的其他代码...
}
