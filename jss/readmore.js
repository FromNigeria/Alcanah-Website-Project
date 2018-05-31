$(document).ready(function() {
    $("#toggle1").click(function() {
        var e = $("#toggle1").text()
        "Read More" == e ? ($("#toggle1").text("Read Less"), $("#text1").slideDown()) : ($("#toggle1").text("Read More"), $("#text1").slideUp())
    })
}), $(document).ready(function() {
    $("#toggle2").click(function() {
        var e = $("#toggle2").text()
        "Read More" == e ? ($("#toggle2").text("Read Less"), $("#text2").slideDown()) : ($("#toggle2").text("Read More"), $("#text2").slideUp())
    })
}), $(document).ready(function() {
    $("#toggle00").click(function() {
        var e = $("#toggle00").text()
        "Read More" == e ? ($("#toggle00").text("Read Less"), $("#text00").slideDown()) : ($("#toggle00").text("Read More"), $("#text00").slideUp())
    })
}), $(".read-more").on("click", function() {
    var e, a = $(this).data("target"),
        t = $("[data-collapse=" + a + "]").data("text-close")
    $(this).hasClass("collapse-open") ? (e = $(this).data("text-more"), $(this).html(e), $(this).removeClass("collapse-open"), $("[data-collapse=" + a + "]").slideUp(300)) : ($(this).data("text-more", $(this).html()), e = $(this).data("text-more"), $(this).addClass("collapse-open"), $(this).html(t), $("[data-collapse=" + a + "]").slideDown(300))
})

       $(document).ready(function() {
 // executes when HTML-Document is loaded and DOM is ready
console.log("document is ready");
  
  
// document ready  
});


$(window).load(function() {
 // executes when complete page is fully loaded, including all frames, objects and images
console.log("window is loaded");
  
  
// window load  
});