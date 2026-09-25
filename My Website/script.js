/* ================================================= */
/* ================= LANGUAGE ======================= */
/* ================================================= */

const languageBtn =
    document.getElementById("languageBtn");

let currentLanguage =
    localStorage.getItem("language") || "en";


function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        language;

    if (language === "ar") {

        document.body.classList.add("arabic");

        languageBtn.textContent = "EN";

    } else {

        document.body.classList.remove("arabic");

        languageBtn.textContent = "AR";
    }


    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            const text =
                element.dataset[language];

            if (text) {
                element.textContent = text;
            }

        });


    localStorage.setItem(
        "language",
        language
    );
}


languageBtn.addEventListener(
    "click",
    () => {

        const newLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";

        changeLanguage(newLanguage);

    }
);


/* ================================================= */
/* ================= FAVORITES ===================== */
/* ================================================= */

const favoriteCategories =
    document.getElementById(
        "favoriteCategories"
    );

const favoriteGallery =
    document.getElementById(
        "favoriteGallery"
    );

const galleryGrid =
    document.getElementById(
        "galleryGrid"
    );

const galleryTitle =
    document.getElementById(
        "galleryTitle"
    );

const galleryNumber =
    document.getElementById(
        "galleryNumber"
    );

const backToFavorites =
    document.getElementById(
        "backToFavorites"
    );


const favorites = {

    movies: {

        title: "Movies & Series",

        arabicTitle:
            "الافلام والمسلسلات",

        number: "01 / MOVIES",

        items: [

            {
                image: "mentalist.jpe",
                title: "The Mentalist",
                description:
                    "Patrick Jane and his journey."
            },

            {
                image: "squid-game.jpe",
                title: "Squid Game",
                description:
                    "A series I enjoy."
            },

            {
                image: "minecraft-movie.jpe",
                title: "Minecraft Movie",
                description:
                    "Minecraft on the big screen."
            },

            {
                image: "adventure-time.jpe",
                title: "Adventure Time",
                description:
                    "One of the shows I enjoy."
            }

        ]

    },


    games: {

        title: "Games",

        arabicTitle:
            "الالعاب",

        number: "02 / GAMES",

        items: [

            {
                image: "minecraft.jpe",
                title: "Minecraft",
                description:
                    "One of my favorite games."
            },

            {
                image: "spiderman.jpe",
                title: "Spider-Man",
                description:
                    "A game I really enjoy."
            },

            {
                image: "fc27.jpe",
                title: "FC 27",
                description:
                    "A game I want to experience."
            }

        ]

    },


    music: {

        title: "Music",

        arabicTitle:
            "الموسيقى",

        number: "03 / MUSIC",

        items: [

            {
                image: "didine.jpe",
                title: "Didine Canon 16",
                description:
                    "One of the artists I listen to."
            },

            {
                image: "trap-king.jpe",
                title: "Trap King",
                description:
                    "One of the artists I enjoy."
            },

            {
                image: "yubi.jpe",
                title: "YUBI",
                description:
                    "One of the artists I listen to."
            },

            {
                image: "xxxtentacion.jpe",
                title: "XXXTENTACION",
                description:
                    "An artist whose music I enjoy."
            }

        ]

    },


    technology: {

        title: "Technology",

        arabicTitle:
            "التكنولوجيا",

        number: "04 / TECHNOLOGY",

        items: [

            {
                image: "ai.jpe",
                title: "Artificial Intelligence",
                description:
                    "AI tools and experiments."
            },

            {
                image: "unity.jpe",
                title: "Unity",
                description:
                    "Game development and experiments."
            },

            {
                image: "pc.jpe",
                title: "PC",
                description:
                    "Hardware, Windows and software."
            }

        ]

    }

};


/* ================================================= */
/* ================= FAVORITES EVENTS ============== */
/* ================================================= */

document
    .querySelectorAll(".favorite-category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openFavoriteCategory(
                    button.dataset.category
                );

            }
        );

    });


function openFavoriteCategory(category) {

    const data =
        favorites[category];

    if (!data) return;


    favoriteCategories
        .classList
        .add("hidden");

    favoriteGallery
        .classList
        .remove("hidden");


    galleryNumber.textContent =
        data.number;

    galleryTitle.textContent =
        currentLanguage === "ar"
            ? data.arabicTitle
            : data.title;


    galleryGrid.innerHTML = "";


    data.items.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "gallery-item";


        card.innerHTML = `

            <img
                src="./assets/favorites/${category}/${item.image}"
                alt="${item.title}"
            >

            <div class="gallery-info">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openImageModal(
                    `./assets/favorites/${category}/${item.image}`,
                    item.title,
                    item.description
                );

            }
        );


        galleryGrid.appendChild(card);

    });


    favoriteGallery.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================================================= */
/* ================= BACK ========================== */
/* ================================================= */

backToFavorites.addEventListener(
    "click",
    () => {

        favoriteGallery
            .classList
            .add("hidden");

        favoriteCategories
            .classList
            .remove("hidden");


        document
            .getElementById("favorites")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ================================================= */
/* ================= IMAGE MODAL =================== */
/* ================================================= */

function openImageModal(
    image,
    title,
    description
) {

    const modal =
        document.createElement("div");

    modal.className =
        "image-modal";


    modal.innerHTML = `

        <div class="modal-content">

            <button
                class="modal-close"
                type="button">
                ×
            </button>

            <img
                src="${image}"
                alt="${title}"
            >

            <div class="modal-info">

                <h3>${title}</h3>

                <p>${description}</p>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    modal
        .querySelector(".modal-close")
        .addEventListener(
            "click",
            () => modal.remove()
        );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                modal.remove();
            }

        }
    );


    function closeWithEscape(event) {

        if (event.key === "Escape") {

            modal.remove();

            document.removeEventListener(
                "keydown",
                closeWithEscape
            );

        }

    }


    document.addEventListener(
        "keydown",
        closeWithEscape
    );

}


/* ================================================= */
/* ================= SMOOTH SCROLL ================= */
/* ================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* ================================================= */
/* ================= MOVING BACKGROUND ============== */
/* ================================================= */

const background =
    document.getElementById(
        "background-animation"
    );


const canvas =
    document.createElement("canvas");


background.appendChild(canvas);


const ctx =
    canvas.getContext("2d");


let particles = [];

let width = 0;
let height = 0;


/* ================= SETTINGS ================= */

const particleCount =
    window.innerWidth < 700
        ? 45
        : 85;

const connectionDistance = 140;

const particleSpeed = 0.35;


/* ================= RESIZE ================= */

function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    height =
        canvas.height =
        window.innerHeight *
        window.devicePixelRatio;


    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;


    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();

    }
);


/* ================= PARTICLES ================= */

function createParticles() {

    particles = [];


    const count =
        window.innerWidth < 700
            ? 45
            : 85;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 2.2 + 0.7,

            speedX:
                (Math.random() - 0.5) *
                particleSpeed,

            speedY:
                (Math.random() - 0.5) *
                particleSpeed,

            opacity:
                Math.random() * 0.6 + 0.2

        });

    }

}


createParticles();


/* ================= DRAW ================= */

function drawBackground() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /* Move particles */

    particles.forEach(
        particle => {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;


            /* Wrap around screen */

            if (
                particle.x < -10
            ) {
                particle.x =
                    window.innerWidth + 10;
            }

            if (
                particle.x >
                window.innerWidth + 10
            ) {
                particle.x = -10;
            }


            if (
                particle.y < -10
            ) {
                particle.y =
                    window.innerHeight + 10;
            }

            if (
                particle.y >
                window.innerHeight + 10
            ) {
                particle.y = -10;
            }

        }
    );


    /* Connections */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const a =
                particles[i];

            const b =
                particles[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                connectionDistance
            ) {

                const opacity =
                    (1 -
                        distance /
                        connectionDistance
                    ) * 0.20;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(0, 138, 255, ${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }


    /* Particles */

    particles.forEach(
        particle => {

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(0, 194, 255, ${particle.opacity})`;

            ctx.shadowBlur = 10;

            ctx.shadowColor =
                "rgba(0, 138, 255, 0.8)";

            ctx.fill();

            ctx.shadowBlur = 0;

        }
    );


    requestAnimationFrame(
        drawBackground
    );

}


drawBackground();


/* ================================================= */
/* ================= MOUSE TRACKER ================= */
/* ================================================= */
/*
    ملاحظة على التحسين:
    - شلنا التنعيم (lerp) اللي كان يخلي الدائرة تمشي وراء
      الماوس بتأخير، الحين التتبع فوري ودقيق 100%.
    - استخدمنا translate3d بدل left/top عشان نستفيد من
      تسريع الـ GPU ونتفادى إعادة حساب الـ layout (reflow)
      في كل فريم، فالحركة تصير أخف وأسرع.
    - الحلقة (requestAnimationFrame) ما تشتغل إلا لما
      الماوس يتحرك فعليًا، مو Loop دائم، فيخفف الحمل على
      المعالج.
*/

const mouseGlow =
    document.getElementById("mouse-glow");

let mouseX = 0;
let mouseY = 0;
let hasMoved = false;
let rafId = null;


function updateGlowPosition() {

    mouseGlow.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    rafId = null;
}


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!hasMoved) {

                hasMoved = true;

                mouseGlow.style.opacity =
                    "1";

            }

            if (!rafId) {

                rafId =
                    requestAnimationFrame(
                        updateGlowPosition
                    );

            }

        },
        { passive: true }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            mouseGlow.style.opacity =
                "0";

        }
    );

}


/* ================================================= */
/* ================= START ========================== */
/* ================================================= */

changeLanguage(
    currentLanguage
);