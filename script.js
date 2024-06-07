function updateTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var currentTime = hours + ':' + minutes + ':' + seconds;
    document.getElementById('current-time').textContent = currentTime;
}

updateTime();
setInterval(updateTime, 1000);

function openArticle(url) {
    window.open(url, '_blank', 'width=800,height=600');
}

// Modal functionality
var modal = document.getElementById('myModal');
var img = document.getElementById('myImg');
var modalImg = document.getElementById('img01');
var captionText = document.getElementById('caption');
if (img) {
    img.onclick = function () {
        modal.style.display = 'block';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
}
var span = document.getElementsByClassName('close')[0];
if (span) {
    span.onclick = function () {
        modal.style.display = 'none';
    };
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

$(document).ready(function () {
    var $html = $('html');
    var page = 1;
    var lastPage = $('section').length;

    $html.animate({ scrollTop: 0 }, 10);

    $(window).on('wheel', function (e) {
        if ($html.is(':animated')) return;

        if (e.originalEvent.deltaY > 0) {
            if (page == lastPage) return;
            page++;
        } else if (e.originalEvent.deltaY < 0) {
            if (page == 1) return;
            page--;
        }

        var posTop = (page - 1) * $(window).height();
        $html.animate({ scrollTop: posTop });
    });

    $(window).scroll(function () {
        if ($html.is(':animated')) return;

        var scrollPosition = $(window).scrollTop();
        $('section').each(function (i) {
            if (
                scrollPosition >= $(this).offset().top - $(window).height() / 2 &&
                scrollPosition < $(this).offset().top + $(this).outerHeight() - $(window).height() / 2
            ) {
                page = i + 1;
            }
        });

        if (this.scrollY > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css('scrollBehavior', 'auto');
    });

    $('.navbar .menu li a').click(function () {
        $('html').css('scrollBehavior', 'smooth');
    });

    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });

    console.log('Checking if .typing element exists:', $('.typing').length);

    if ($('.typing').length) {
        var typed = new Typed('.typing', {
            strings: ['Major In Software.', 'Dream Game Programmer'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }

    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 2,
                nav: false,
            },
            1000: {
                items: 3,
                nav: false,
            },
        },
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Rain effect
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById('home').offsetHeight;

    const numberOfDrops = 100;
    const drops = [];

    function createDrops() {
        for (let i = 0; i < numberOfDrops; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
    }

    function drawDrops() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = `rgba(174,194,224,${drop.opacity})`;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    function animateDrops() {
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            drop.y += drop.speed;
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        }
    }

    function animate() {
        drawDrops();
        animateDrops();
        requestAnimationFrame(animate);
    }

    createDrops();
    animate();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = document.getElementById('home').offsetHeight;
        drops.length = 0;
        createDrops();
    });
});
