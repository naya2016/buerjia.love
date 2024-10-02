/* Please ❤ this if you like it! */

(function($) { "use strict";
        
    // Page cursors
    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
        t.style.top = n.clientY + "px", 
        e.style.left = n.clientX + "px", 
        e.style.top = n.clientY + "px", 
        i.style.left = n.clientX + "px", 
        i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }

    // Navigation
    var app = function () {
        var body = undefined;
        var menu = undefined;
        var menuItems = undefined;
        var init = function init() {
            body = document.querySelector('body');
            menu = document.querySelector('.menu-icon');
            menuItems = document.querySelectorAll('.nav__list-item');
            applyListeners();
        };
        var applyListeners = function applyListeners() {
            menu.addEventListener('click', function () {
                return toggleClass(body, 'nav-active');
            });
        };
        var toggleClass = function toggleClass(element, stringClass) {
            if (element.classList.contains(stringClass)) {
                element.classList.remove(stringClass);
            } else {
                element.classList.add(stringClass);
            }
        };
        init();
    }();

    // Switch light/dark
    $("#switch").on('click', function () {
        if ($("body").hasClass("light")) {
            $("body").removeClass("light");
            $("#switch").removeClass("switched");
        }
        else {
            $("body").addClass("light");
            $("#switch").addClass("switched");
        }
    });          

    // 添加导航链接点击事件监听器，实现预加载动画后跳转
    $(".nav__list-item a").on("click", function(e){
        e.preventDefault(); // 阻止默认的跳转行为

        var targetUrl = $(this).attr("href"); // 获取目标URL

        // 显示预加载动画
        $("body").removeClass("loaded"); // 这将使 #preloader 可见

        // 设置延迟时间（例如：2秒后跳转）
        setTimeout(function(){
            window.location.href = targetUrl;
        }, 2000); // 2000毫秒 = 2秒
    });

})(jQuery);
