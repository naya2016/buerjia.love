var box = $(".video-box")
var nextItem = 0
box.delegate(".item", "mouseover", function (e) {
  e.stopPropagation()
  $(this).find("span").css("transform", "scale(5)")
  if (nextItem != $(this).index()) {
    $(".video-box .item").find("video").removeClass("next")
    $(".video-box .item").find("video").removeClass("active")
    $(".video-box .item").eq(nextItem).find("video").addClass("next")
    $(this).find("video").addClass("active")
    nextItem = $(this).index()
  }
  $("#video" + $(this).index()).load()
})
$(".video-box .item").on("mouseleave", function () {
  $(this).find("span").css("transform", "scale(1)")
})
$(".video-box").on("mouseleave", function () {
  $(".video-box .item").find("video").removeClass("next")
  $(".video-box .item").find("video").removeClass("active")
  if (nextItem != 0) {
    $(".video-box .item").eq(nextItem).find("video").addClass("next")
    $(".video-box .item").eq(0).find("video").addClass("active")
    nextItem = 0
  } else {
    $(".video-box .item").eq(0).find("video").css("opacity", "1")
  }
})

