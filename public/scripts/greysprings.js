var onResize = function () {
    // apply dynamic padding at the top of the body according to the fixed navbar height
    if ($(".navbar-fixed-top").height() > 65) {
        $("body").css("padding-top", $(".navbar-fixed-top").height());
    }
};

// attach the function to the window resize event
$(window).resize(onResize);

// call it also when the page is ready after load or reload
$(function () {
    onResize();
})

$(document).ready(function () {
    $(document).on("scrollstart click", (function (event) {
        var clickover = $(event.target);

        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $(".navbar-toggle").click();
        }
    }));
});



// Only enable if the document has a long scroll bar
// Note the window height + offset
if (($(window).height() + 100) < $(document).height()) {
    $('#top-link-block').removeClass('hidden').affix({
        // how far to scroll down before link "slides" into view
        offset: { top: 100 }
    });
}

// override jquery validate plugin defaults
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function showModal(title, message) {
    var modalNode = $("#signup-status-modal");
    var modalTitleNode = $("#signup-status-modal .modal-title");
    var modalBodyNode = $("#signup-status-modal .modal-body");
    $(modalTitleNode).text(title);
    $(modalBodyNode).text(message);
    $(modalNode).modal("show");
}

function handleSignupForm(event) {
    var waitingRing = $(".waiting-ring ");
    var pageUrl = "/contact/signup";
    var stringsJsonUri = "json/strings.json";
    $.getJSON(stringsJsonUri, function (stringsJson) {
        $(waitingRing).show();
        var modalTitle = "Information";
        var modalBody = "Dummy!";
        $.ajax({
            type: "POST",
            url: pageUrl,
            data: $("#signup-form").serialize(),
            success: function (data, status) {
                modalBody = stringsJson["SignUpSuccessMessage"];
            },
            error: function (xhr, desc, err) {
                modalBody = stringsJson["SignUpErrorMessage"];
            },
            complete: function (e) {
                showModal(modalTitle, modalBody);
                $("#signup-form").trigger("reset");
            }
        }).always(function (status) {
            $(waitingRing).hide();
        });
    });

    event.preventDefault();
}

function handleContactUsForm(event) {
    var waitingRing = $(".waiting-ring ");
    var pageUrl = "/contact/contact";
    var stringsJsonUri = "json/strings.json";
    $.getJSON(stringsJsonUri, function (stringsJson) {
        $(waitingRing).show();
        var modalTitle = "Information";
        var modalBody = "Dummy!";
        $.ajax({
            type: "POST",
            url: pageUrl,
            data: $("#contactus-form").serialize(),
            success: function (data, status) {
                modalBody = stringsJson["ContactUsSuccessMessage"];
            },
            error: function (xhr, desc, err) {
                modalBody = stringsJson["ContactUsErrorMessage"];
            },
            complete: function (e) {
                showModal(modalTitle, modalBody);
                $("#contactus-form").trigger("reset");
            }
        }).always(function (status) {
            $(waitingRing).hide();
        });
    });

    event.preventDefault();
}

function initMap() {
    var myLocation = new google.maps.LatLng(17.4728914, 78.3278311);
    var mapOptions = { center: myLocation, zoom: 15 };
    var marker = new google.maps.Marker({ position: myLocation, title: "Greysprings Software Solutions Pvt. Ltd." });
    var map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
    marker.setMap(map);
}

function contactUsFormValidation() {
    $("#contactus-form").validate({
        rules: {
            cuname: "required",
            cuemail: { required: true, email: true },
            cusubject: "required",
            cumessage: "required"
        },
        submitHandler: function (form, event) {
            handleContactUsForm(event);
        }
    });
}

function signUpFormValidation() {
    $("#signup-form").validate({
        rules: {
            signupUserEmail: { required: true, email: true },
        },
        submitHandler: function (form, event) {
            handleSignupForm(event);
        },
        errorPlacement: function (error, element) {
            error.insertAfter('#signup-btn');
        },
        errorClass: "signup-input-error-class",
    });
}

function highlightActiveMenu() {
    var currentController = $("#curr-con").val().toLowerCase();
    var navBar = $("#navbar-collapse");
    var menuToActivate = $(navBar).find("#{0}-menu".format(currentController));
    $("#curr-con").remove();
    $(menuToActivate).addClass("active-menu");
}

function onYouTubeIframeAPIReady() {
    var youtubeVideoCover = $(".app-youtube-video-cover");
    var playBtn = $(".app-youtube-video-play-btn");
    var videoFrame = $("#app-youtube-video-frame");
    var player = new YT.Player("app-youtube-video-frame",
        {
            events: {
                "onReady": function (event) {
                    $(playBtn).click(function (btnClickEvent) {
                        event.target.playVideo();
                    });
                },
                "onStateChange": function (event) {
                    var data = event.data;
                    //add video active class from video cover
                    if (data == YT.PlayerState.PLAYING) {
                        $(youtubeVideoCover).addClass("no-display");
                        $(playBtn).addClass("no-display");
                        $(videoFrame).removeClass("no-display");
                    }
                    //remove video active class from video cover
                    else if (data == YT.PlayerState.ENDED) {
                        $(youtubeVideoCover).removeClass("no-display");
                        $(playBtn).removeClass("no-display");
                        $(videoFrame).addClass("no-display");
                    }
                }
            }
        });
    $(playBtn).click(function (ed) {

    });
}


//count animation effect
$(window).scroll(function () {
    var hT = $('.count-heading').offset().top,
        hH = $('.count-heading').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    if (wS > (hT + hH - wH)) {
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                    duration: 900,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
        }); {
            $('.count').removeClass('count').addClass('counted');
        };
    }
});
