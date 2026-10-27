pc.script.createLoadingScreen((app) => {

    let selectedLanguage = null;

    // =====================================================
    // BLOCK PLAYCANVAS INPUT DURING ONBOARDING
    // =====================================================

   let explorationStarted = false;


// =====================================================
// PLAYCANVAS INPUT LOCK
// =====================================================

const lockPlayCanvasInput = () => {

    // Once exploration has started,
    // NEVER detach PlayCanvas controls again
    if (explorationStarted) {
        return;
    }

    if (app.keyboard) {
        app.keyboard.detach();
    }

    if (app.mouse) {
        app.mouse.detach();
    }

    if (app.touch) {
        app.touch.detach();
    }
};


const unlockPlayCanvasInput = () => {

    const canvas =
        app.graphicsDevice &&
        app.graphicsDevice.canvas
            ? app.graphicsDevice.canvas
            : document.body;


    if (app.keyboard) {
        app.keyboard.attach(window);
    }

    if (app.mouse) {
        app.mouse.attach(canvas);
    }

    if (app.touch) {
        app.touch.attach(canvas);
    }
};


const blockedKeys = [
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "Space",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    const blockKeyboardInput = (event) => {

        if (explorationStarted) {
            return;
        }

        if (blockedKeys.includes(event.code)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    };


    const blockMouseInput = (event) => {

        if (explorationStarted) {
            return;
        }

        const heritageOverlay =
            document.getElementById("heritage-loading");

        const zoomOverlay =
            document.querySelector(".image-zoom-overlay");

        // Allow interaction with onboarding UI
        if (
            heritageOverlay &&
            heritageOverlay.contains(event.target)
        ) {
            return;
        }

        // Allow interaction with image zoom
        if (
            zoomOverlay &&
            zoomOverlay.contains(event.target)
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    };


    window.addEventListener(
        "keydown",
        blockKeyboardInput,
        true
    );

    window.addEventListener(
        "keyup",
        blockKeyboardInput,
        true
    );

    document.addEventListener(
        "mousedown",
        blockMouseInput,
        true
    );

    document.addEventListener(
        "mouseup",
        blockMouseInput,
        true
    );

    document.addEventListener(
        "click",
        blockMouseInput,
        true
    );


    /* =====================================================
       CONTENT
    ===================================================== */

    const historyContent = {

        en: {

            doanMon: {
                number: "01",

                title:
                    "DOAN MON",

                subtitle:
                    "THE GATEWAY TO THE FORBIDDEN CITY",

                text:
`Located on the central axis of the Imperial Citadel of Thang Long, Doan Mon was the main southern gateway leading into the Forbidden City, the most important royal area of the ancient capital.

The surviving structure largely dates from the Early Le period in the 15th century, built over architectural remains from earlier periods and later modified during the Nguyen dynasty.

Its five arched entrances once served different routes within the royal court, with the central passage reserved for the emperor.`,

                next:
                    "NEXT"
            },


            flagTower: {
                number: "02",

                title:
                    "HANOI FLAG TOWER",

                subtitle:
                    "A LANDMARK OF 19TH-CENTURY HANOI",

                text:
`Hanoi Flag Tower was built during the Nguyen dynasty and completed in 1812 under Emperor Gia Long.

Standing south of Doan Mon, the tower formed part of the military landscape of the Nguyen-period Hanoi Citadel and served as an observation and signalling point.

While much of the citadel was demolished during the colonial period, the Flag Tower survived and remains one of the city's most recognisable historic landmarks.`,

                next:
                    "CONTINUE"
            }
        },


        vi: {

            doanMon: {
                number: "01",

                title:
                    "ĐOAN MÔN",

                subtitle:
                    "CỔNG DẪN VÀO CẤM THÀNH",

                text:
`Nằm trên trục trung tâm của Hoàng thành Thăng Long, Đoan Môn từng là cổng chính phía Nam dẫn vào Cấm thành, khu vực hoàng gia quan trọng nhất của kinh đô xưa.

Công trình hiện còn chủ yếu có niên đại từ thời Lê sơ vào thế kỷ XV, được xây dựng trên các dấu tích kiến trúc của những thời kỳ trước và tiếp tục được tu bổ, thay đổi dưới thời Nguyễn.

Năm cửa vòm của Đoan Môn từng phục vụ những lối đi khác nhau trong không gian cung đình, trong đó cửa chính giữa dành cho Hoàng đế.`,

                next:
                    "TIẾP THEO"
            },


            flagTower: {
                number: "02",

                title:
                    "CỘT CỜ HÀ NỘI",

                subtitle:
                    "DẤU ẤN CỦA THÀNH HÀ NỘI THẾ KỶ XIX",

                text:
`Cột cờ Hà Nội được xây dựng dưới triều Nguyễn và hoàn thành vào năm 1812 dưới thời vua Gia Long.

Nằm về phía Nam Đoan Môn, công trình từng là một phần của hệ thống thành Hà Nội thời Nguyễn và được sử dụng như một vị trí quan sát, truyền tín hiệu và treo cờ.

Trong khi nhiều phần của thành Hà Nội bị phá hủy vào thời kỳ thuộc địa, Cột cờ vẫn được bảo tồn và ngày nay là một trong những công trình lịch sử tiêu biểu của Hà Nội.`,

                next:
                    "TIẾP TỤC"
            }
        }
    };


    /* =====================================================
       CSS
    ===================================================== */

    const createCss = () => {

        const css = `

            * {
                box-sizing: border-box;
            }


            body {
                margin: 0;

                background:
                    #17110d;

                overflow:
                    hidden;
            }


            /* =====================================================
               MAIN OVERLAY
            ===================================================== */

            #heritage-loading {
                position:
                    fixed;

                inset:
                    0;

                z-index:
                    99999;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                background:
                    radial-gradient(
                        circle at center,
                        #39251b 0%,
                        #211611 45%,
                        #120d0a 100%
                    );
            }


            #heritage-content {
                width:
                    min(
                        650px,
                        82vw
                    );

                text-align:
                    center;

                color:
                    #e8d2a5;

                opacity:
                    1;

                transform:
                    translateY(0);

                transition:
                    opacity 0.5s ease,
                    transform 0.5s ease;
            }


            #heritage-content.history-mode {
                width:
                    min(
                        1280px,
                        91vw
                    );
            }


            #heritage-content.content-hide {
                opacity:
                    0;

                transform:
                    translateY(-10px);
            }


            /* =====================================================
               FONT SYSTEM
            ===================================================== */

            .font-en {
                font-family:
                    "Antique Book Cover",
                    Georgia,
                    "Times New Roman",
                    serif;
            }


            .font-vi {
                font-family:
                    Cambria,
                    Georgia,
                    "Times New Roman",
                    serif;
            }


            /* =====================================================
               LOADING SCREEN
            ===================================================== */

            #heritage-logo {
                display:
                    block;

                width:
                    190px;

                height:
                    190px;

                max-width:
                    65vw;

                object-fit:
                    contain;

                margin:
                    0
                    auto
                    10px
                    auto;

                filter:
                    drop-shadow(
                        0 0 16px
                        rgba(
                            218,
                            169,
                            86,
                            0.28
                        )
                    );
            }


            #heritage-title {
                margin:
                    0;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    50px;

                line-height:
                    1.05;

                font-weight:
                    normal;

                letter-spacing:
                    3.5px;

                color:
                    #d8b16b;
            }


            #heritage-subtitle {
                margin-top:
                    14px;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    25px;

                line-height:
                    1.4;

                font-weight:
                    normal;

                letter-spacing:
                    2.5px;

                color:
                    rgba(
                        232,
                        210,
                        165,
                        0.62
                    );
            }


            /* =====================================================
               PROGRESS
            ===================================================== */

            #heritage-progress-container {
                width:
                    100%;

                height:
                    2px;

                margin-top:
                    42px;

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.15
                    );

                overflow:
                    hidden;
            }


            #heritage-progress {
                width:
                    0%;

                height:
                    100%;

                background:
                    #d8b16b;

                transition:
                    width 0.15s ease;
            }


            #heritage-percent {
                margin-top:
                    14px;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                font-size:
                    15px;

                font-weight:
                    normal;

                letter-spacing:
                    2.5px;

                color:
                    rgba(
                        232,
                        210,
                        165,
                        0.45
                    );
            }


            /* =====================================================
               LANGUAGE SCREEN
            ===================================================== */

            #language-title {
                margin:
                    0;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                font-size:
                    42px;

                line-height:
                    1.1;

                font-weight:
                    normal;

                letter-spacing:
                    3px;

                color:
                    #d8b16b;
            }


            #language-subtitle {
                margin-top:
                    14px;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                font-size:
                    21px;

                line-height:
                    1.45;

                font-weight:
                    normal;

                letter-spacing:
                    2px;

                color:
                    rgba(
                        232,
                        210,
                        165,
                        0.62
                    );
            }


            #language-buttons {
                display:
                    flex;

                justify-content:
                    center;

                align-items:
                    center;

                gap:
                    18px;

                margin-top:
                    38px;
            }


            .language-button {
                min-width:
                    190px;

                padding:
                    13px
                    28px;

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.70
                    );

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.02
                    );

                color:
                    #d8b16b;

                font-size:
                    15px;

                font-weight:
                    normal;

                cursor:
                    pointer;

                transition:
                    background 0.25s ease,
                    border-color 0.25s ease,
                    color 0.25s ease,
                    transform 0.25s ease,
                    box-shadow 0.25s ease;
            }


            .language-button.english {
                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                letter-spacing:
                    2.5px;
            }


            .language-button.vietnamese {
                font-family:
                    Cambria,
                    Georgia,
                    "Times New Roman",
                    serif;

                letter-spacing:
                    0.5px;
            }


            .language-button:hover {
                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.12
                    );

                border-color:
                    #d8b16b;

                color:
                    #f0d49d;

                transform:
                    translateY(-2px);

                box-shadow:
                    0 0 18px
                    rgba(
                        216,
                        177,
                        107,
                        0.12
                    );
            }


            /* =====================================================
               HISTORY LAYOUT
            ===================================================== */

            #history-screen {
                display:
                    grid;

                grid-template-columns:
                    minmax(
                        0,
                        0.95fr
                    )
                    minmax(
                        520px,
                        1.05fr
                    );

                gap:
                    55px;

                align-items:
                    center;

                width:
                    100%;

                text-align:
                    left;
            }


            #history-screen.reverse {
                grid-template-columns:
                    minmax(
                        520px,
                        1.05fr
                    )
                    minmax(
                        0,
                        0.95fr
                    );
            }


            /* =====================================================
               IMAGE COLLAGE
            ===================================================== */

            .history-images {
                position:
                    relative;

                width:
                    100%;

                height:
                    520px;
            }


            .history-image {
                position:
                    absolute;

                object-fit:
                    cover;

                filter:
                    sepia(0.18)
                    contrast(0.95)
                    brightness(0.92);

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.24
                    );

                box-shadow:
                    0 18px 40px
                    rgba(
                        0,
                        0,
                        0,
                        0.28
                    );

                cursor:
                    zoom-in;

                transition:
                    transform 0.35s ease,
                    filter 0.35s ease,
                    box-shadow 0.35s ease;
            }


            .history-image:hover {
                transform:
                    scale(1.035);

                filter:
                    sepia(0.08)
                    contrast(1)
                    brightness(1.04);

                box-shadow:
                    0 22px 55px
                    rgba(
                        0,
                        0,
                        0,
                        0.42
                    );
            }


            .history-image.img1 {
                width:
                    76%;

                height:
                    68%;

                left:
                    0;

                top:
                    0;

                z-index:
                    1;
            }


            .history-image.img2 {
                width:
                    42%;

                height:
                    34%;

                right:
                    2%;

                top:
                    8%;

                z-index:
                    2;

                opacity:
                    0.84;
            }


            .history-image.img3 {
                width:
                    52%;

                height:
                    44%;

                right:
                    0;

                bottom:
                    0;

                z-index:
                    3;
            }


            /* =====================================================
               HISTORY COPY
            ===================================================== */

            .history-copy {
                position:
                    relative;

                min-width:
                    0;

                width:
                    100%;
            }


            .history-number {
                margin-bottom:
                    14px;

                font-size:
                    13px;

                line-height:
                    1;

                letter-spacing:
                    3px;

                color:
                    rgba(
                        216,
                        177,
                        107,
                        0.55
                    );
            }


            .history-title {
                margin:
                    0;

                color:
                    #d8b16b;

                font-size:
                    42px;

                line-height:
                    1.1;

                font-weight:
                    normal;
            }


            .font-en .history-title {
                letter-spacing:
                    3px;
            }


            .font-vi .history-title {
                letter-spacing:
                    0.5px;
            }


            /* =====================================================
               HISTORY SUBTITLE
            ===================================================== */

            .history-subtitle {
                margin-top:
                    12px;

                line-height:
                    1.4;

                color:
                    rgba(
                        216,
                        177,
                        107,
                        0.68
                    );
            }


            .font-en .history-subtitle {
                font-size:
                    22px;

                line-height:
                    1.45;

                letter-spacing:
                    2px;
            }


            .font-vi .history-subtitle {
                font-size:
                    20px;

                letter-spacing:
                    0.3px;
            }


            /* =====================================================
               DIVIDER
            ===================================================== */

            .history-line {
                width:
                    52px;

                height:
                    1px;

                margin:
                    25px
                    0;

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.50
                    );
            }


            /* =====================================================
               HISTORY BODY
            ===================================================== */

            .history-text {
                white-space:
                    pre-line;

                width:
                    100%;

                word-break:
                    normal;

                overflow-wrap:
                    normal;

                hyphens:
                    none;

                color:
                    rgba(
                        239,
                        220,
                        183,
                        0.82
                    );
            }


            /* ENGLISH BODY - LARGER + MORE SPACING */

            .font-en .history-text {
                max-width:
                    590px;

                font-family:
                    "Antique Book Cover",
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    23px;

                line-height:
                    1.68;

                letter-spacing:
                    0.7px;
            }


            /* VIETNAMESE BODY */

            .font-vi .history-text {
                max-width:
                    570px;

                font-family:
                    Cambria,
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    17px;

                line-height:
                    1.7;

                letter-spacing:
                    0;
            }

            /* =====================================================
               HISTORY BUTTON
            ===================================================== */

            .history-next {
                margin-top:
                    28px;

                padding:
                    13px
                    28px;

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.65
                    );

                background:
                    transparent;

                color:
                    #d8b16b;

                cursor:
                    pointer;

                font-size:
                    15px;

                transition:
                    background 0.25s ease,
                    color 0.25s ease,
                    transform 0.25s ease,
                    box-shadow 0.25s ease;
            }


            .font-en .history-next {
                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                font-size:
                    18px;

                letter-spacing:
                    2.5px;
            }


            .font-vi .history-next {
                font-family:
                    Cambria,
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    15px;

                letter-spacing:
                    0.5px;
            }


            .history-next:hover {
                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.12
                    );

                color:
                    #f2d99f;

                transform:
                    translateX(3px);

                box-shadow:
                    0 0 18px
                    rgba(
                        216,
                        177,
                        107,
                        0.10
                    );
            }


            /* =====================================================
               HISTORY DOTS
            ===================================================== */

            .history-dots {
                display:
                    flex;

                gap:
                    8px;

                margin-top:
                    28px;
            }


            .history-dot {
                width:
                    22px;

                height:
                    2px;

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.18
                    );
            }


            .history-dot.active {
                background:
                    #d8b16b;
            }


            /* =====================================================
               IMAGE ZOOM
            ===================================================== */

            .image-zoom-overlay {
                position:
                    fixed;

                inset:
                    0;

                z-index:
                    100000;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                padding:
                    60px;

                background:
                    rgba(
                        10,
                        7,
                        5,
                        0.94
                    );

                backdrop-filter:
                    blur(6px);

                -webkit-backdrop-filter:
                    blur(6px);

                opacity:
                    0;

                transition:
                    opacity 0.3s ease;
            }


            .image-zoom-overlay.show {
                opacity:
                    1;
            }


            .image-zoom-full {
                display:
                    block;

                max-width:
                    88vw;

                max-height:
                    84vh;

                width:
                    auto;

                height:
                    auto;

                object-fit:
                    contain;

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.35
                    );

                box-shadow:
                    0 25px 80px
                    rgba(
                        0,
                        0,
                        0,
                        0.60
                    );

                transform:
                    scale(0.96);

                transition:
                    transform 0.3s ease;
            }


            .image-zoom-overlay.show
            .image-zoom-full {
                transform:
                    scale(1);
            }


            .image-zoom-close {
                position:
                    absolute;

                top:
                    28px;

                right:
                    38px;

                width:
                    45px;

                height:
                    45px;

                padding:
                    0;

                border:
                    none;

                background:
                    transparent;

                color:
                    #d8b16b;

                font-family:
                    Georgia,
                    serif;

                font-size:
                    38px;

                line-height:
                    1;

                cursor:
                    pointer;

                opacity:
                    0.75;

                transition:
                    opacity 0.2s ease,
                    transform 0.2s ease;
            }


            .image-zoom-close:hover {
                opacity:
                    1;

                transform:
                    scale(1.08);
            }
                
/* =====================================================
   DISCLAIMER
===================================================== */

#heritage-content.disclaimer-mode {
    width: min(980px, 88vw);
}

#disclaimer-screen {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #e8d2a5;
}

.disclaimer-label {
    margin-bottom: 14px;

    font-size: 13px;
    letter-spacing: 3px;

    color: rgba(216, 177, 107, 0.55);
}

.disclaimer-title {
    margin: 0;

    color: #d8b16b;

    font-size: 42px;
    line-height: 1.1;
    font-weight: normal;
}

.font-en .disclaimer-title {
    letter-spacing: 3px;
}

.font-vi .disclaimer-title {
    letter-spacing: 0.5px;
}

.disclaimer-subtitle {
    margin-top: 12px;

    color: rgba(216, 177, 107, 0.65);
}

.font-en .disclaimer-subtitle {
    font-size: 19px;
    letter-spacing: 2px;
}

.font-vi .disclaimer-subtitle {
    font-size: 18px;
}

.disclaimer-line {
    width: 52px;
    height: 1px;

    margin: 26px auto;

    background: rgba(216, 177, 107, 0.5);
}

.disclaimer-text {
    max-width: 900px;
    margin: 0 auto;

    color: rgba(
        239,
        220,
        183,
        0.8
    );

    text-align: justify;
    text-justify: inter-word;
}


.disclaimer-text p {
    margin: 0 0 20px;

    text-align: justify;
    text-justify: inter-word;
}


.disclaimer-note {
    margin-top: 22px;

    padding: 16px 20px;

    border-left:
        1px solid
        rgba(216, 177, 107, 0.55);

    background:
        rgba(216, 177, 107, 0.035);

    color:
        rgba(239, 220, 183, 0.68);

    text-align: justify;
    text-justify: inter-word;
}

.disclaimer-next {
    margin-top: 28px;

    padding: 13px 30px;

    border:
        1px solid
        rgba(216, 177, 107, 0.65);

    background: transparent;

    color: #d8b16b;

    cursor: pointer;

    transition:
        background 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.font-en .disclaimer-note {
    line-height: 1.75;
}

.font-en .disclaimer-next {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    font-size: 18px;
    letter-spacing: 2.5px;
}

.font-vi .disclaimer-next {
    font-family:
        Cambria,
        Georgia,
        serif;

    font-size: 15px;
}

.disclaimer-next:hover {
    background:
        rgba(216, 177, 107, 0.12);

    color: #f2d99f;

    transform: translateY(-2px);

    box-shadow:
        0 0 18px
        rgba(216, 177, 107, 0.10);
}

@media (max-width: 800px) {

    #heritage-content.disclaimer-mode {
        width: 86vw;
        max-height: 90vh;
        overflow-y: auto;
        padding: 30px 0;
    }
}

/* ENGLISH DISCLAIMER */

.font-en .disclaimer-text {
    font-size: 22px;
    line-height: 1.75;
    letter-spacing: 0.45px;
}


/* VIETNAMESE DISCLAIMER */

.font-vi .disclaimer-text {
    font-size: 17px;
    line-height: 1.9;
    letter-spacing: 0;
}


/* MOBILE DISCLAIMER */

@media (max-width: 480px) {

    .disclaimer-title {
        font-size: 32px;
    }

    .font-en .disclaimer-text {
        font-size: 19px;
    }

    .font-vi .disclaimer-text {
        font-size: 15px;
    }
}

/* =====================================================
   INTRO SCREENS
===================================================== */

#heritage-content.intro-mode {
    width: min(1100px, 90vw);
}

.intro-screen {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #e8d2a5;
}

.intro-number {
    margin-bottom: 12px;
    font-size: 13px;
    letter-spacing: 3px;
    color: rgba(216, 177, 107, 0.55);
}

.intro-title {
    margin: 0;
    color: #d8b16b;
    font-size: 42px;
    line-height: 1.1;
    font-weight: normal;
}

.font-en .intro-title {
    letter-spacing: 3px;
}

.font-vi .intro-title {
    letter-spacing: 0.5px;
}

.intro-subtitle {
    margin-top: 12px;
    color: rgba(216, 177, 107, 0.68);
}

.font-en .intro-subtitle {
    font-size: 21px;
    letter-spacing: 2px;
}

.font-vi .intro-subtitle {
    font-size: 19px;
}

.intro-divider {
    width: 52px;
    height: 1px;
    margin: 24px auto;
    background: rgba(216, 177, 107, 0.5);
}

.intro-text {
    max-width: 1050px;
    margin: 0 auto;
    color: rgba(239, 220, 183, 0.8);
}

/* WIDER HERITY TEXT */

.herity-symbol ~ .intro-text {
    max-width: 1050px;
    width: 100%;
}

.intro-text br {
    display: block;
    content: "";
    margin-top: 10px;
}

.font-en .intro-text {
    font-size: 21px;
    line-height: 1.65;
    letter-spacing: 0.6px;
}

.font-vi .intro-text {
    max-width: 1050px;
    font-size: 17px;
    line-height: 1.7;
}


/* HERITY */

.herity-symbol {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 160px;
    height: 160px;

    margin: 0 auto 24px;

    border: none;
    border-radius: 0;

    background: transparent;
    box-shadow: none;
}

.herity-symbol::before,
.herity-symbol::after {
    display: none;
}

.herity-symbol img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    filter:
        drop-shadow(
            0 8px 20px
            rgba(0, 0, 0, 0.28)
        );
}

.herity-symbol::before,
.herity-symbol::after {
    content: "";

    position: absolute;

    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: #d8b16b;

    opacity: 0.6;
}

.herity-symbol::before {
    left: -4px;
}

.herity-symbol::after {
    right: -4px;
}

.herity-hint {
    margin-top: 22px;

    font-size: 14px;
    font-style: italic;

    color: rgba(216,177,107,0.58);
}


/* ARTIFACT THUMBNAILS */

.artifact-grid {
    display: grid;

    grid-template-columns:
        repeat(8, 1fr);

    gap: 12px;

    width: 100%;

    margin-top: 30px;
}

.artifact-card {
    position: relative;

    aspect-ratio: 0.82;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    border:
        1px solid
        rgba(216,177,107,0.22);

    background:
        rgba(216,177,107,0.025);
}

.artifact-card img {
    width: 100%;
    height: 100%;

    object-fit: contain;

    padding: 8px;

    filter:
        sepia(0.85)
        grayscale(0.55)
        brightness(0.45)
        contrast(1.05);

    opacity: 0.68;

    transition:
        opacity 0.3s ease,
        filter 0.3s ease,
        transform 0.3s ease;
}

.artifact-card.discovered img {
    filter: none;
    opacity: 1;
    transform: scale(1);
}

.artifact-card.discovered::after {
    display: none;
}

.artifact-card::after {
    content: "?";

    position: absolute;

    left: 50%;
    bottom: 8px;

    transform: translateX(-50%);

    color: rgba(216,177,107,0.7);

    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    font-size: 18px;
}

.artifact-card:hover img {
    opacity: 0.85;

    filter:
        sepia(0.7)
        grayscale(0.4)
        brightness(0.55)
        contrast(1.05);

    transform: scale(1.03);
}

.artifact-progress {
    margin-top: 24px;

    color: #d8b16b;

    font-size: 17px;

    letter-spacing: 2px;
}

.font-vi .artifact-progress {
    letter-spacing: 0.5px;
}

.intro-next {
    margin-top: 28px;

    padding: 13px 30px;

    border:
        1px solid
        rgba(216,177,107,0.65);

    background: transparent;

    color: #d8b16b;

    cursor: pointer;

    transition:
        background 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.finish-journey {
    margin-left: 18px;
}

.font-en .intro-next {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    font-size: 18px;

    letter-spacing: 2.5px;
}

.font-vi .intro-next {
    font-family:
        Cambria,
        Georgia,
        serif;

    font-size: 15px;
}

.intro-next:hover {
    background:
        rgba(216,177,107,0.12);

    color: #f2d99f;

    transform: translateY(-2px);

    box-shadow:
        0 0 18px
        rgba(216,177,107,0.10);
}


/* RESPONSIVE */

@media (max-width: 900px) {

    .artifact-grid {
        grid-template-columns:
            repeat(4, 1fr);
    }

    #heritage-content.intro-mode {
        width: 86vw;
        max-height: 90vh;
        overflow-y: auto;
        padding: 30px 0;
    }
}

@media (max-width: 480px) {

    .intro-title {
        font-size: 32px;
    }

    .artifact-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .herity-symbol {
        width: 105px;
        height: 105px;
        font-size: 38px;
    }
}

            /* =====================================================
               CONTROLS + QUEST
            ===================================================== */

            #controls-screen {
                width:
                    min(
                        900px,
                        88vw
                    );

                margin:
                    0 auto;

                text-align:
                    center;

                color:
                    #e8d2a5;

                transform:
                    translateX(-120px);
            }


            .controls-small-title {
                margin-bottom:
                    12px;

                font-size:
                    13px;

                letter-spacing:
                    3px;

                color:
                    rgba(
                        216,
                        177,
                        107,
                        0.55
                    );
            }


            .controls-title {
                margin:
                    0;

                font-size:
                    42px;

                line-height:
                    1.1;

                font-weight:
                    normal;

                color:
                    #d8b16b;
            }


            .font-en .controls-title {
                letter-spacing:
                    3px;
            }


            .font-vi .controls-title {
                letter-spacing:
                    0.5px;
            }


            .controls-subtitle {
                max-width:
                    690px;

                margin:
                    16px
                    auto
                    0;

                line-height:
                    1.6;

                color:
                    rgba(
                        239,
                        220,
                        183,
                        0.75
                    );
            }


            .font-en .controls-subtitle {
                font-size:
                    23px;

                line-height:
                    1.65;

                letter-spacing:
                    0.7px;
            }


            .font-vi .controls-subtitle {
                font-size:
                    17px;

                line-height:
                    1.6;

                letter-spacing:
                    0;
            }


            /* =====================================================
               CONTROL CARDS
            ===================================================== */

            .controls-grid {
                display:
                    grid;

                grid-template-columns:
                    repeat(
                        4,
                        1fr
                    );

                gap:
                    12px;

                margin-top:
                    34px;
            }


            .control-item {
                box-sizing:
                    border-box;

                min-height:
                    96px;

                padding:
                    18px
                    12px;

                display:
                    flex;

                flex-direction:
                    column;

                align-items:
                    center;

                justify-content:
                    center;

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.22
                    );

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.025
                    );

                transition:
                    border-color 0.25s ease,
                    background 0.25s ease,
                    transform 0.25s ease;
            }


            .control-item:hover {
                transform:
                    translateY(-3px);

                border-color:
                    rgba(
                        216,
                        177,
                        107,
                        0.55
                    );

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.07
                    );
            }


            .control-key {
                color:
                    #d8b16b;

                font-size:
                    17px;

                letter-spacing:
                    1.5px;
            }


            .font-en .control-key {
                font-size:
                    21px;

                letter-spacing:
                    2px;
            }


            .control-label {
                margin-top:
                    12px;

                font-size:
                    13px;

                opacity:
                    0.62;
            }


            .font-en .control-label {
                font-size:
                    16px;

                letter-spacing:
                    1.4px;
            }


            .font-vi .control-label {
                font-size:
                    13px;

                letter-spacing:
                    0;
            }


            /* =====================================================
               QUEST
            ===================================================== */

            .quest-divider {
                width:
                    52px;

                height:
                    1px;

                margin:
                    30px
                    auto
                    22px;

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.5
                    );
            }


            .quest-title {
                color:
                    #d8b16b;

                font-size:
                    20px;

                letter-spacing:
                    1px;
            }


            .font-en .quest-title {
                font-size:
                    22px;

                letter-spacing:
                    2.5px;
            }


            .font-vi .quest-title {
                font-size:
                    20px;

                letter-spacing:
                    0.5px;
            }


            .quest-list {
    display: grid;

    grid-template-columns:
        0.85fr 1fr 1.3fr;

    align-items: start;

    gap: 20px;

    width: 100%;

    margin-top: 20px;

    color:
        rgba(
            239,
            220,
            183,
            0.76
        );
}


            .quest-list div {
                min-width:
                    0;

                text-align:
                    center;

                line-height:
                    1.5;
            }


            .font-en .quest-list {
                font-size:
                    19px;

                line-height:
                    1.6;

                letter-spacing:
                    0.7px;
            }


            .font-vi .quest-list {
                font-size:
                    16px;

                line-height:
                    1.5;

                letter-spacing:
                    0;
            }


            .quest-list span {
                display:
                    block;

                margin-bottom:
                    7px;

                color:
                    #d8b16b;
            }


            /* =====================================================
               BEGIN BUTTON
            ===================================================== */

            #begin-exploring {
                margin-top:
                    30px;

                padding:
                    15px
                    32px;

                border:
                    1px solid
                    rgba(
                        216,
                        177,
                        107,
                        0.7
                    );

                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.03
                    );

                color:
                    #d8b16b;

                cursor:
                    pointer;

                transition:
                    background 0.25s ease,
                    color 0.25s ease,
                    transform 0.25s ease,
                    box-shadow 0.25s ease;
            }


            .font-en #begin-exploring {
                font-family:
                    "Antique Book Cover",
                    Georgia,
                    serif;

                font-size:
                    19px;

                letter-spacing:
                    2.5px;
            }


            .font-vi #begin-exploring {
                font-family:
                    Cambria,
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    15px;

                letter-spacing:
                    0.5px;
            }


            #begin-exploring:hover {
                background:
                    rgba(
                        216,
                        177,
                        107,
                        0.13
                    );

                color:
                    #f2d99f;

                transform:
                    translateY(-2px);

                box-shadow:
                    0 0 22px
                    rgba(
                        216,
                        177,
                        107,
                        0.12
                    );
            }


            /* =====================================================
               CONTROLS RESPONSIVE
            ===================================================== */

            @media (max-width: 800px) {

                .controls-grid {
                    grid-template-columns:
                        repeat(
                            2,
                            1fr
                        );
                }


                .quest-list {
                    grid-template-columns:
                        1fr;

                    gap:
                        15px;
                }


                #controls-screen {
                    max-height:
                        88vh;

                    overflow-y:
                        auto;

                    padding:
                        30px
                        0;
                }
            }


            @media (max-width: 480px) {

                .controls-title {
                    font-size:
                        32px;
                }


                .controls-grid {
                    grid-template-columns:
                        1fr 1fr;

                    gap:
                        10px;

                    margin-top:
                        28px;
                }


                .control-item {
                    min-height:
                        90px;

                    padding:
                        17px
                        8px;
                }


                .quest-divider {
                    margin-top:
                        28px;
                }


                #begin-exploring {
                    width:
                        100%;

                    margin-top:
                        28px;
                }
            }


            /* =====================================================
               TABLET
            ===================================================== */

            @media (max-width: 1100px) {

                #heritage-content.history-mode {
                    width:
                        90vw;
                }


                #history-screen,
                #history-screen.reverse {
                    grid-template-columns:
                        minmax(
                            0,
                            0.9fr
                        )
                        minmax(
                            470px,
                            1.1fr
                        );

                    gap:
                        40px;
                }


                .history-images {
                    height:
                        450px;
                }


                .font-en .history-text {
                    font-size:
                        21px;

                    letter-spacing:
                        0.6px;
                }
            }


            /* =====================================================
               SMALL SCREEN
            ===================================================== */

            @media (max-width: 800px) {

                #heritage-content.history-mode {
                    width:
                        86vw;

                    height:
                        90vh;

                    overflow-y:
                        auto;

                    padding:
                        30px
                        0;
                }


                #history-screen,
                #history-screen.reverse {
                    display:
                        flex;

                    flex-direction:
                        column;

                    gap:
                        32px;
                }


                #history-screen.reverse
                .history-copy {
                    order:
                        2;
                }


                #history-screen.reverse
                .history-images {
                    order:
                        1;
                }


                .history-images {
                    flex-shrink:
                        0;

                    height:
                        330px;
                }


                .history-title {
                    font-size:
                        36px;
                }


                .font-en .history-subtitle {
                    font-size:
                        20px;

                    letter-spacing:
                        1.6px;
                }


                .font-vi .history-subtitle {
                    font-size:
                        18px;
                }


                .font-en .history-text {
                    max-width:
                        none;

                    font-size:
                        20px;

                    line-height:
                        1.65;

                    letter-spacing:
                        0.55px;
                }


                .font-vi .history-text {
                    max-width:
                        none;

                    font-size:
                        16px;

                    line-height:
                        1.65;
                }


                .image-zoom-overlay {
                    padding:
                        25px;
                }


                .image-zoom-close {
                    top:
                        16px;

                    right:
                        16px;
                }
            }


            /* =====================================================
               PHONE
            ===================================================== */

            @media (max-width: 480px) {

                #heritage-content {
                    width:
                        78vw;
                }


                #heritage-logo {
                    width:
                        150px;

                    height:
                        150px;

                    margin-bottom:
                        24px;
                }


                #heritage-title {
                    font-size:
                        29px;
                }


                #heritage-subtitle {
                    font-size:
                        17px;

                    letter-spacing:
                        2px;
                }


                #language-title {
                    font-size:
                        32px;
                }


                #language-subtitle {
                    font-size:
                        19px;

                    letter-spacing:
                        1.7px;
                }


                #language-buttons {
                    flex-direction:
                        column;

                    gap:
                        14px;
                }


                .language-button {
                    width:
                        100%;

                    min-width:
                        0;
                }


                .history-images {
                    height:
                        260px;
                }


                .history-title {
                    font-size:
                        32px;
                }


                .font-en .history-subtitle {
                    font-size:
                        18px;

                    letter-spacing:
                        1.4px;
                }


                .font-vi .history-subtitle {
                    font-size:
                        17px;
                }


                .font-en .history-text {
                    font-size:
                        19px;

                    line-height:
                        1.65;

                    letter-spacing:
                        0.5px;
                }


                .font-vi .history-text {
                    font-size:
                        15px;
                }
            }
/* =====================================================
   GLOBAL TYPOGRAPHY ALIGNMENT
   TEMPLATE: DOAN MON / FLAG TOWER
===================================================== */


/* ---------- SMALL LABEL / NUMBER ---------- */

.disclaimer-label,
.intro-number,
.controls-small-title {
    font-size: 13px;
    line-height: 1;
    letter-spacing: 3px;
}


/* ---------- MAIN TITLES ---------- */

.disclaimer-title,
.intro-title,
.controls-title {
    font-size: 42px;
    line-height: 1.1;
    font-weight: normal;
}

.font-en .disclaimer-title,
.font-en .intro-title,
.font-en .controls-title {
    letter-spacing: 3px;
}

.font-vi .disclaimer-title,
.font-vi .intro-title,
.font-vi .controls-title {
    letter-spacing: 0.5px;
}


/* ---------- SUBTITLES ---------- */

.font-en .disclaimer-subtitle,
.font-en .intro-subtitle {
    font-size: 22px;
    line-height: 1.45;
    letter-spacing: 2px;
}

.font-vi .disclaimer-subtitle,
.font-vi .intro-subtitle {
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 0.3px;
}


/* ---------- BODY TEXT: ENGLISH ---------- */

.font-en .disclaimer-text,
.font-en .intro-text,
.font-en .controls-subtitle {
    font-size: 23px;
    line-height: 1.68;
    letter-spacing: 0.7px;
}


/* ---------- BODY TEXT: VIETNAMESE ---------- */

.font-vi .disclaimer-text,
.font-vi .intro-text,
.font-vi .controls-subtitle {
    font-size: 17px;
    line-height: 1.7;
    letter-spacing: 0;
}


/* ---------- DISCLAIMER PARAGRAPH SPACING ---------- */

.disclaimer-text p {
    margin: 0 0 22px;
}


/* ---------- DISCLAIMER NOTE ---------- */

.font-en .disclaimer-note {
    font-size: 23px;
    line-height: 1.68;
    letter-spacing: 0.7px;
}

.font-vi .disclaimer-note {
    font-size: 17px;
    line-height: 1.7;
    letter-spacing: 0;
}


/* ---------- BUTTONS ---------- */

.font-en .disclaimer-next,
.font-en .intro-next,
.font-en #begin-exploring {
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 2.5px;
}

.font-vi .disclaimer-next,
.font-vi .intro-next,
.font-vi #begin-exploring {
    font-size: 15px;
    line-height: 1.2;
    letter-spacing: 0.5px;
}


/* ---------- CONTROL SCREEN BODY ---------- */

.font-en .control-key {
    font-size: 21px;
    line-height: 1.2;
    letter-spacing: 2px;
}

.font-vi .control-key {
    font-size: 17px;
    line-height: 1.2;
    letter-spacing: 1.5px;
}

.font-en .control-label {
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 1.4px;
}

.font-vi .control-label {
    font-size: 13px;
    line-height: 1.4;
    letter-spacing: 0;
}


/* ---------- QUEST ---------- */

.font-en .quest-title {
    font-size: 22px;
    line-height: 1.4;
    letter-spacing: 2px;
}

.font-vi .quest-title {
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 0.3px;
}

.font-en .quest-list {
    font-size: 19px;
    line-height: 1.6;
    letter-spacing: 0.7px;
}

.font-vi .quest-list {
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: 0;
}


/* ---------- HERITY HINT ---------- */

.font-en .herity-hint {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.7px;
}

.font-vi .herity-hint {
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0;
}


/* ---------- ARTIFACT PROGRESS ---------- */

.font-en .artifact-progress {
    font-size: 18px;
    line-height: 1.4;
    letter-spacing: 2px;
}

.font-vi .artifact-progress {
    font-size: 17px;
    line-height: 1.4;
    letter-spacing: 0.5px;
}

#journey-button .journey-icon {
    width: 34px;
    height: 34px;
    object-fit: contain;
    display: block;
    opacity: 0.82;

    filter:
        invert(22%)
        sepia(35%)
        saturate(1100%)
        hue-rotate(350deg)
        brightness(80%)
        contrast(90%);
}

/* =====================================================
   JOURNEY PASSPORT
===================================================== */

.passport-screen {
    width: min(980px, 88vw);
    margin: 0 auto;
    text-align: center;
}

.passport-label {
    margin-bottom: 18px;

    color: rgba(216, 177, 107, 0.58);

    font-size: 13px;
    letter-spacing: 3px;
}

.passport-book {
    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;

    width: 100%;
    min-height: 500px;

    overflow: hidden;

    border: 2px solid #76502d;
    border-radius: 14px;

    background: #e7d2a5;

    box-shadow:
        0 28px 70px
        rgba(0, 0, 0, 0.5);
}

.passport-book::after {
    content: "";

    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;

    width: 1px;

    background:
        rgba(91, 58, 31, 0.35);

    box-shadow:
        5px 0 15px
        rgba(65, 39, 20, 0.12),
        -5px 0 15px
        rgba(65, 39, 20, 0.12);
}

.passport-page {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 55px 45px;

    color: #5b3a1f;
}

.passport-page:first-child {
    background:
        linear-gradient(
            90deg,
            #dcc18e 0%,
            #ead7ad 85%,
            #d8bd89 100%
        );
}

.passport-page:last-child {
    background:
        linear-gradient(
            90deg,
            #d8bd89 0%,
            #ead7ad 15%,
            #dcc18e 100%
        );
}

.passport-small {
    margin-bottom: 14px;

    font-size: 12px;
    letter-spacing: 3px;

    opacity: 0.68;
}

.passport-title {
    margin: 0;

    font-size: 37px;
    line-height: 1.15;

    font-weight: normal;
}

.font-en .passport-title {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    letter-spacing: 2.5px;
}

.font-vi .passport-title {
    font-family:
        Cambria,
        Georgia,
        serif;

    letter-spacing: 0.5px;
}

.passport-line {
    width: 50px;
    height: 1px;

    margin: 24px auto;

    background:
        rgba(91, 58, 31, 0.45);
}

.passport-location {
    font-size: 17px;
    line-height: 1.7;

    opacity: 0.8;
}

.passport-complete {
    margin: 0;

    font-size: 32px;
    line-height: 1.2;

    font-weight: normal;

    letter-spacing: 2px;
}

.passport-count {
    margin-top: 34px;

    font-size: 48px;
    line-height: 1;

    color: #704525;
}

.passport-count-label {
    margin-top: 10px;

    font-size: 14px;
    letter-spacing: 2px;

    opacity: 0.72;
}

.passport-stamp-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 150px;

    margin-top: 30px;

    border:
        3px double
        rgba(116, 53, 36, 0.7);

    border-radius: 50%;

    color:
        rgba(116, 53, 36, 0.75);

    font-size: 13px;
    line-height: 1.4;
    letter-spacing: 2px;

    transform: rotate(-9deg);
}

@media (max-width: 800px) {

    .passport-book {
        grid-template-columns: 1fr;
    }

    .passport-book::after {
        display: none;
    }

    .passport-page {
        min-height: 360px;
    }
}

/* =====================================================
   PASSPORT TITLE FIX
===================================================== */

/* English: make completion title larger */
.font-en .passport-complete {
    font-size: 43px;
    letter-spacing: 3px;
}

/* Vietnamese: keep the whole title on one line */
.font-vi .passport-complete {
    font-size: 28px;
    white-space: nowrap;
    width: 100%;
}

/* Give right page enough room */
.passport-page-right {
    padding-left: 30px;
    padding-right: 30px;
}

.passport-exit {
    margin-top: 28px;

    padding: 13px 30px;

    border:
        1px solid
        rgba(216, 177, 107, 0.65);

    background:
        transparent;

    color:
        #d8b16b;

    cursor:
        pointer;

    transition:
        background 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.font-en .passport-exit {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    font-size: 18px;

    letter-spacing: 2.5px;
}

.font-vi .passport-exit {
    font-family:
        Cambria,
        Georgia,
        serif;

    font-size: 15px;
}

.passport-exit:hover {
    background:
        rgba(216, 177, 107, 0.12);

    color:
        #f2d99f;

    transform:
        translateY(-2px);

    box-shadow:
        0 0 18px
        rgba(216, 177, 107, 0.12);
}
        `;


        const style =
            document.createElement(
                "style"
            );

        style.textContent =
            css;

        document.head.appendChild(
            style
        );
    };


    /* =====================================================
       CREATE WRAPPER
    ===================================================== */

    const createWrapper = () => {

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.id =
            "heritage-loading";

        document.body.appendChild(
            wrapper
        );


        const content =
            document.createElement(
                "div"
            );

        content.id =
            "heritage-content";

        wrapper.appendChild(
            content
        );
    };


    /* =====================================================
       TRANSITION
    ===================================================== */

    const transitionContent = (
        callback
    ) => {

        const content =
            document.getElementById(
                "heritage-content"
            );

        if (!content) {
            return;
        }


        content.classList.add(
            "content-hide"
        );


        setTimeout(
            () => {

                content.innerHTML =
                    "";

                callback(
                    content
                );


                requestAnimationFrame(
                    () => {

                        content.classList.remove(
                            "content-hide"
                        );
                    }
                );

            },
            500
        );
    };
    
    /* =====================================================
       LOADING
    ===================================================== */

    const showLoading = () => {

        const content =
            document.getElementById(
                "heritage-content"
            );


        const logo =
            document.createElement(
                "img"
            );

        logo.id =
            "heritage-logo";

        logo.src =
    "images/icon.png";

        content.appendChild(
            logo
        );


        const title =
            document.createElement(
                "h1"
            );

        title.id =
            "heritage-title";

        title.textContent =
            "HERITAGE QUEST: VIETNAM";

        content.appendChild(
            title
        );


        const subtitle =
            document.createElement(
                "div"
            );

        subtitle.id =
            "heritage-subtitle";

        subtitle.textContent =
            "THE IMPERIAL CITADEL OF THANG LONG HA NOI";

        content.appendChild(
            subtitle
        );


        const progressContainer =
            document.createElement(
                "div"
            );

        progressContainer.id =
            "heritage-progress-container";

        content.appendChild(
            progressContainer
        );


        const progress =
            document.createElement(
                "div"
            );

        progress.id =
            "heritage-progress";

        progressContainer.appendChild(
            progress
        );


        const percent =
            document.createElement(
                "div"
            );

        percent.id =
            "heritage-percent";

        percent.textContent =
            "LOADING 0%";

        content.appendChild(
            percent
        );
    };


    /* =====================================================
       PROGRESS
    ===================================================== */

    const setProgress = (
        value
    ) => {

        value =
            Math.min(
                1,
                Math.max(
                    0,
                    value
                )
            );


        const bar =
            document.getElementById(
                "heritage-progress"
            );


        const percent =
            document.getElementById(
                "heritage-percent"
            );


        if (bar) {

            bar.style.width =
                `${value * 100}%`;
        }


        if (percent) {

            percent.textContent =
                `LOADING ${
                    Math.round(
                        value * 100
                    )
                }%`;
        }
    };


    /* =====================================================
       LANGUAGE
    ===================================================== */

    const showLanguageScreen = () => {

        transitionContent(
            (content) => {

                content.classList.remove(
                    "history-mode"
                );


                const title =
                    document.createElement(
                        "h1"
                    );

                title.id =
                    "language-title";

                title.textContent =
                    "CHOOSE YOUR LANGUAGE";

                content.appendChild(
                    title
                );


                const subtitle =
                    document.createElement(
                        "div"
                    );

                subtitle.id =
                    "language-subtitle";

                subtitle.textContent =
                    "Select a language to continue";

                content.appendChild(
                    subtitle
                );


                const buttons =
                    document.createElement(
                        "div"
                    );

                buttons.id =
                    "language-buttons";

                content.appendChild(
                    buttons
                );


                const english =
                    document.createElement(
                        "button"
                    );

                english.className =
                    "language-button english";

                english.textContent =
                    "ENGLISH";

                buttons.appendChild(
                    english
                );


                const vietnamese =
                    document.createElement(
                        "button"
                    );

                vietnamese.className =
                    "language-button vietnamese";

                vietnamese.textContent =
                    "TIẾNG VIỆT";

                buttons.appendChild(
                    vietnamese
                );


                english.addEventListener(
                    "click",
                    () => {

                        selectLanguage(
                            "en"
                        );
                    }
                );


                vietnamese.addEventListener(
                    "click",
                    () => {

                        selectLanguage(
                            "vi"
                        );
                    }
                );
            }
        );
    };


    /* =====================================================
       SELECT LANGUAGE
    ===================================================== */

    const selectLanguage = (
        language
    ) => {

        selectedLanguage =
            language;


        window.heritageLanguage =
            language;


        localStorage.setItem(
            "heritageLanguage",
            language
        );


        app.fire(
            "heritage:language",
            language
        );


        showDisclaimer();
    };


    /* =====================================================
       IMAGE ZOOM
    ===================================================== */

    const openImageZoom = (
        src
    ) => {

        const overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "image-zoom-overlay";


        const image =
            document.createElement(
                "img"
            );

        image.src =
            src;

        image.className =
            "image-zoom-full";


        const close =
            document.createElement(
                "button"
            );

        close.className =
            "image-zoom-close";

        close.textContent =
            "×";


        overlay.appendChild(
            image
        );

        overlay.appendChild(
            close
        );


        document.body.appendChild(
            overlay
        );


        requestAnimationFrame(
            () => {

                overlay.classList.add(
                    "show"
                );
            }
        );


        let closed =
            false;


        const closeZoom = () => {

            if (closed) {
                return;
            }


            closed =
                true;


            overlay.classList.remove(
                "show"
            );


            document.removeEventListener(
                "keydown",
                escapeHandler
            );


            setTimeout(
                () => {

                    if (
                        overlay.parentNode
                    ) {

                        overlay.remove();
                    }

                },
                300
            );
        };


        const escapeHandler = (
            event
        ) => {

            if (
                event.key ===
                "Escape"
            ) {

                closeZoom();
            }
        };


        close.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                closeZoom();
            }
        );


        overlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeZoom();
                }
            }
        );


        document.addEventListener(
            "keydown",
            escapeHandler
        );
    };


    /* =====================================================
       IMAGE COLLAGE
    ===================================================== */

    const createImages = (
        prefix,
        order = [1, 2, 3]
    ) => {

        const images =
            document.createElement(
                "div"
            );

        images.className =
            "history-images";


        for (
            let slot = 1;
            slot <= 3;
            slot++
        ) {

            const image =
                document.createElement(
                    "img"
                );

            image.className =
                `history-image img${slot}`;


            const sourceIndex =
                order[slot - 1];


            image.src =
                `images/${prefix}${sourceIndex}.webp`;

            image.alt =
                "";

            image.draggable =
                false;


            image.addEventListener(
                "click",
                () => {

                    openImageZoom(
                        image.src
                    );
                }
            );


            images.appendChild(
                image
            );
        }


        return images;
    };


    /* =====================================================
       HISTORY COPY
    ===================================================== */

    const createHistoryCopy = (
        data,
        nextFunction,
        currentPage
    ) => {

        const copy =
            document.createElement(
                "div"
            );


        copy.className =
            `history-copy ${
                selectedLanguage === "vi"
                    ? "font-vi"
                    : "font-en"
            }`;


        const number =
            document.createElement(
                "div"
            );

        number.className =
            "history-number";

        number.textContent =
            data.number;

        copy.appendChild(
            number
        );


        const title =
            document.createElement(
                "h2"
            );

        title.className =
            "history-title";

        title.textContent =
            data.title;

        copy.appendChild(
            title
        );


        const subtitle =
            document.createElement(
                "div"
            );

        subtitle.className =
            "history-subtitle";

        subtitle.textContent =
            data.subtitle;

        copy.appendChild(
            subtitle
        );


        const line =
            document.createElement(
                "div"
            );

        line.className =
            "history-line";

        copy.appendChild(
            line
        );


        const text =
            document.createElement(
                "div"
            );

        text.className =
            "history-text";

        text.textContent =
            data.text.trim();

        copy.appendChild(
            text
        );


        const button =
            document.createElement(
                "button"
            );

        button.className =
            "history-next";

        button.textContent =
            `${data.next}  →`;

        button.addEventListener(
            "click",
            nextFunction
        );

        copy.appendChild(
            button
        );


        const dots =
            document.createElement(
                "div"
            );

        dots.className =
            "history-dots";


        const dot1 =
            document.createElement(
                "div"
            );

        dot1.className =
            "history-dot";


        const dot2 =
            document.createElement(
                "div"
            );

        dot2.className =
            "history-dot";


        if (
            currentPage === 1
        ) {

            dot1.classList.add(
                "active"
            );
        }


        if (
            currentPage === 2
        ) {

            dot2.classList.add(
                "active"
            );
        }


        dots.appendChild(
            dot1
        );

        dots.appendChild(
            dot2
        );


        copy.appendChild(
            dots
        );


        return copy;
    };

    /* =====================================================
   DISCLAIMER
===================================================== */

const showDisclaimer = () => {

    transitionContent(
        (content) => {

            content.classList.remove(
                "history-mode"
            );

            content.classList.remove(
                "intro-mode"
            );

            content.classList.add(
                "disclaimer-mode"
            );


            const isVI =
                selectedLanguage === "vi";


            const screen =
                document.createElement(
                    "div"
                );

            screen.id =
                "disclaimer-screen";

            screen.className =
                isVI
                    ? "font-vi"
                    : "font-en";


            /* LABEL */

            const label =
                document.createElement(
                    "div"
                );

            label.className =
                "disclaimer-label";

            label.textContent =
                isVI
                    ? "TRƯỚC KHI TIẾP TỤC"
                    : "BEFORE YOU CONTINUE";

            screen.appendChild(
                label
            );


            /* TITLE */

            const title =
                document.createElement(
                    "h2"
                );

            title.className =
                "disclaimer-title";

            title.textContent =
                isVI
                    ? "LƯU Ý VỀ TRẢI NGHIỆM"
                    : "EXPERIENCE DISCLAIMER";

            screen.appendChild(
                title
            );


            /* SUBTITLE */

            const subtitle =
                document.createElement(
                    "div"
                );

            subtitle.className =
                "disclaimer-subtitle";

            subtitle.textContent =
                isVI
                    ? "DỰ ÁN HỌC TẬP & THỬ NGHIỆM AI"
                    : "AN EDUCATIONAL & AI-EXPLORATION PROJECT";

            screen.appendChild(
                subtitle
            );


            /* LINE */

            const line =
                document.createElement(
                    "div"
                );

            line.className =
                "disclaimer-line";

            screen.appendChild(
                line
            );


            /* TEXT */

            const text =
                document.createElement(
                    "div"
                );

            text.className =
                "disclaimer-text";


            if (isVI) {

                text.innerHTML = `
    <p>
        Website này được thực hiện trong khuôn khổ bài tập của môn
        <strong>Resisting AI Automation tại RMIT University</strong>,
        nhằm khám phá cách AI có thể được ứng dụng trong quá trình sáng tạo
        và phát triển một trải nghiệm tương tác.
    </p>

    <p>
        Các công trình kiến trúc, hiện vật và không gian lịch sử trong
        trải nghiệm được tái dựng và diễn giải dưới dạng kỹ thuật số.
        Vì vậy, một số chi tiết về hình dáng, tỷ lệ, vị trí và cách thể hiện
        có thể không hoàn toàn giống với thực tế.
    </p>

    <div class="disclaimer-note">
        Website được xây dựng cho mục đích học tập và trải nghiệm.
        Nội dung tại đây không nên được sử dụng làm nguồn tham khảo chuyên sâu
        cho các nghiên cứu về lịch sử, khảo cổ học hoặc di sản.
    </div>
`;

            } else {

                text.innerHTML = `
                    <p>
                        This website was created as part of an assignment for
                        <strong>Resisting AI Automation at RMIT University</strong>,
                        exploring the capabilities and limitations of AI within the
                        creative process and the development of an interactive experience.
                    </p>

                    <p>
                        The architecture, artifacts and historical environments presented
                        in this experience have been digitally reconstructed and interpreted.
                        As a result, some details in their appearance, scale, placement or
                        representation may differ from their real-world counterparts.
                    </p>

                    <div class="disclaimer-note">
                        This website is intended for educational and experiential purposes
                        only. It should not be used as an authoritative source for academic
                        or specialist research in history, archaeology or heritage studies.
                    </div>
                `;
            }


            screen.appendChild(
                text
            );


            /* CONTINUE BUTTON */

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "disclaimer-next";

            button.textContent =
                isVI
                    ? "TÔI ĐÃ HIỂU, TIẾP TỤC  →"
                    : "I UNDERSTAND, CONTINUE  →";


            button.addEventListener(
                "click",
                showDoanMon
            );


            screen.appendChild(
                button
            );


            content.appendChild(
                screen
            );
        }
    );
};


    /* =====================================================
       DOAN MON
    ===================================================== */

    const showDoanMon = () => {

        transitionContent(
    (content) => {

        content.classList.remove(
            "disclaimer-mode"
        );

        content.classList.add(
            "history-mode"
        );


                const data =
                    historyContent[
                        selectedLanguage
                    ].doanMon;


                const screen =
                    document.createElement(
                        "div"
                    );

                screen.id =
                    "history-screen";


                // ht2 = main / largest image
                const images =
                    createImages(
                        "ht",
                        [2, 1, 3]
                    );


                const copy =
                    createHistoryCopy(
                        data,
                        showFlagTower,
                        1
                    );


                screen.appendChild(
                    images
                );


                screen.appendChild(
                    copy
                );


                content.appendChild(
                    screen
                );
            }
        );
    };


    /* =====================================================
       FLAG TOWER
    ===================================================== */

    const showFlagTower = () => {

        transitionContent(
            (content) => {

                content.classList.add(
                    "history-mode"
                );


                const data =
                    historyContent[
                        selectedLanguage
                    ].flagTower;


                const screen =
                    document.createElement(
                        "div"
                    );

                screen.id =
                    "history-screen";

                screen.classList.add(
                    "reverse"
                );


                const copy =
                    createHistoryCopy(
                    data,
                    showHerity,
                    2
                );


                const images =
                    createImages(
                        "cc"
                    );


                screen.appendChild(
                    copy
                );


                screen.appendChild(
                    images
                );


                content.appendChild(
                    screen
                );
            }
        );
    };

    /* =====================================================
   MEET HERITY
===================================================== */

const showHerity = () => {

    transitionContent(
        (content) => {

            content.classList.remove(
                "history-mode"
            );

            content.classList.add(
                "intro-mode"
            );


            const isVI =
                selectedLanguage === "vi";


            const screen =
                document.createElement(
                    "div"
                );

            screen.className =
                `intro-screen ${
                    isVI
                        ? "font-vi"
                        : "font-en"
                }`;


            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "intro-number";

            number.textContent =
                "03";

            screen.appendChild(
                number
            );


            /* HERITY SYMBOL */

            const symbol =
    document.createElement(
        "div"
    );

symbol.className =
    "herity-symbol";


const herityImage =
    document.createElement(
        "img"
    );

herityImage.src =
    "images/herity.png";

herityImage.alt =
    "Herity";

herityImage.draggable =
    false;


symbol.appendChild(
    herityImage
);

screen.appendChild(
    symbol
);


            /* TITLE */

            const title =
                document.createElement(
                    "h2"
                );

            title.className =
                "intro-title";

            title.textContent =
                isVI
                    ? "GẶP GỠ HERITY"
                    : "MEET HERITY";

            screen.appendChild(
                title
            );


            /* SUBTITLE */

            const subtitle =
                document.createElement(
                    "div"
                );

            subtitle.className =
                "intro-subtitle";

            subtitle.textContent =
                isVI
                    ? "HƯỚNG DẪN VIÊN DI SẢN CỦA BẠN"
                    : "YOUR HERITAGE GUIDE";

            screen.appendChild(
                subtitle
            );


            /* DIVIDER */

            const divider =
                document.createElement(
                    "div"
                );

            divider.className =
                "intro-divider";

            screen.appendChild(
                divider
            );


            /* TEXT */

            const text =
                document.createElement(
                    "div"
                );

            text.className =
                "intro-text";

            text.innerHTML =
    isVI
        ? `Herity là hướng dẫn viên ảo đồng hành cùng bạn trong hành trình khám phá Hoàng thành Thăng Long.<br>Bạn có thể nhắn tin hoặc gọi trực tiếp cho Herity để tìm hiểu về di tích, lịch sử và những hiện vật bạn khám phá trên đường đi.`
        : `Herity is your virtual guide throughout the Imperial Citadel of Thang Long Ha Noi.<br>You can chat with Herity or start a voice call to ask about the site, its history, or the artifacts you discover along the way.`;
            screen.appendChild(
                text
            );


            /* HINT */

            const hint =
                document.createElement(
                    "div"
                );

            hint.className =
                "herity-hint";

            hint.textContent =
                isVI
                    ? "Cần trợ giúp? Hãy hỏi Herity."
                    : "Need help? Just ask Herity.";

            screen.appendChild(
                hint
            );


            /* NEXT */

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "intro-next";

            button.textContent =
                isVI
                    ? "TIẾP THEO  →"
                    : "NEXT  →";

            button.addEventListener(
                "click",
                showArtifactQuest
            );

            screen.appendChild(
                button
            );


            content.appendChild(
                screen
            );
        }
    );
};

/* =====================================================
   8 HIDDEN ARTIFACTS
===================================================== */

let discoveredArtifactCount = 0;

const showArtifactQuest = (journeyMode = false) => {

    // Nếu function được gọi trực tiếp từ click event
    // ở onboarding thì đây KHÔNG phải Journey mode.
    if (
        journeyMode &&
        typeof journeyMode === "object"
    ) {
        journeyMode = false;
    }

    transitionContent(
        (content) => {

            content.classList.remove(
                "history-mode"
            );

            content.classList.add(
                "intro-mode"
            );


            const isVI =
                selectedLanguage === "vi";


            const screen =
                document.createElement(
                    "div"
                );

            screen.className =
                `intro-screen ${
                    isVI
                        ? "font-vi"
                        : "font-en"
                }`;


            /* NUMBER */

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "intro-number";

            number.textContent =
                "04";

            screen.appendChild(
                number
            );


            /* TITLE */

            const title =
                document.createElement(
                    "h2"
                );

            title.className =
                "intro-title";

            title.textContent =
                isVI
                    ? "8 HIỆN VẬT ẨN GIẤU"
                    : "8 HIDDEN ARTIFACTS";

            screen.appendChild(
                title
            );


            /* SUBTITLE */

            const subtitle =
                document.createElement(
                    "div"
                );

            subtitle.className =
                "intro-subtitle";

            subtitle.textContent =
                isVI
                    ? "HÀNH TRÌNH KHÁM PHÁ HOÀNG THÀNH"
                    : "YOUR JOURNEY THROUGH THE CITADEL";

            screen.appendChild(
                subtitle
            );


            /* DIVIDER */

            const divider =
                document.createElement(
                    "div"
                );

            divider.className =
                "intro-divider";

            screen.appendChild(
                divider
            );


            /* DESCRIPTION */

            const description =
                document.createElement(
                    "div"
                );

            description.className =
                "intro-text";

            description.innerHTML =
                isVI
                    ? `Tám hiện vật lịch sử đang được ẩn giấu trong Hoàng thành.<br>Khám phá không gian, tìm từng hiện vật và tìm hiểu câu chuyện phía sau chúng.`
                    : `Eight historical artifacts are hidden throughout the Imperial Citadel.<br>Explore the site, discover each artifact, and uncover the stories behind them.`;

            screen.appendChild(
                description
            );


            /* ARTIFACTS */

            const artifactGrid =
                document.createElement(
                    "div"
                );

            artifactGrid.className =
                "artifact-grid";


            const artifactImages = [

                {
                    file:
                        "artifact1.png",
                    entity:
                        "Head"
                },

                {
                    file:
                        "artifact2.png",
                    entity:
                        "Lotus"
                },

                {
                    file:
                        "artifact3.png",
                    entity:
                        "Leaf"
                },

                {
                    file:
                        "artifact4.png",
                    entity:
                        "Beast Face"
                },

                {
                    file:
                        "artifact5.png",
                    entity:
                        "Women Statue"
                },

                {
                    file:
                        "artifact6.png",
                    entity:
                        "Flower Tile"
                },

                {
                    file:
                        "artifact7.png",
                    entity:
                        "Duck"
                },

                {
                    file:
                        "artifact8.png",
                    entity:
                        "Dragon"
                }

            ];


            artifactImages.forEach(
                (artifact) => {

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "artifact-card";


                    const isDiscovered =
                        journeyMode &&
                        window.journeyDiscoveredNames &&
                        window.journeyDiscoveredNames.has(
                            artifact.entity
                        );


                    if (isDiscovered) {

                        card.classList.add(
                            "discovered"
                        );

                    }


                    const image =
                        document.createElement(
                            "img"
                        );

                    image.src =
                        `images/${artifact.file}`;

                    image.alt =
                        "";

                    image.draggable =
                        false;


                    card.appendChild(
                        image
                    );

                    artifactGrid.appendChild(
                        card
                    );

                }
            );


            screen.appendChild(
                artifactGrid
            );


            /* PROGRESS */

            const progress =
                document.createElement(
                    "div"
                );

            progress.className =
                "artifact-progress";


            const displayedCount =
                journeyMode
                    ? discoveredArtifactCount
                    : 0;


            progress.textContent =
                isVI
                    ? `ĐÃ KHÁM PHÁ  ${displayedCount} / 8`
                    : `${displayedCount} / 8  DISCOVERED`;


            screen.appendChild(
                progress
            );


            /* NORMAL ONBOARDING */

            if (!journeyMode) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.className =
                    "intro-next";

                button.textContent =
                    isVI
                        ? "TIẾP THEO  →"
                        : "NEXT  →";


                button.addEventListener(
                    "click",
                    showControls
                );


                screen.appendChild(
                    button
                );

            }


            /* JOURNEY MODE */

            if (journeyMode) {

                const backButton =
                    document.createElement(
                        "button"
                    );

                backButton.className =
                    "intro-next";

                backButton.textContent =
                    isVI
                        ? "QUAY LẠI KHÁM PHÁ  →"
                        : "BACK TO EXPLORING  →";


                backButton.addEventListener(
                    "click",
                    () => {

                        const wrapper =
                            document.getElementById(
                                "heritage-loading"
                            );


                        if (wrapper) {

                            wrapper.style.display =
                                "none";

                            wrapper.style.pointerEvents =
                                "none";

                        }


                        explorationStarted =
                            true;

                        unlockPlayCanvasInput();

                        journeyButton.style.display =
                            "flex";

                    }
                );


                screen.appendChild(
                    backButton
                );


                /* FINISH JOURNEY */

                if (
                    discoveredArtifactCount >= 8
                ) {

                    const finishButton =
                        document.createElement(
                            "button"
                        );

                    finishButton.className =
                        "intro-next finish-journey";

                    finishButton.textContent =
                        isVI
                            ? "HOÀN THÀNH HÀNH TRÌNH  →"
                            : "FINISH JOURNEY  →";


                    finishButton.addEventListener(
                        "click",
                        () => {

                            showJourneyPassport();

                        }
                    );


                    screen.appendChild(
                        finishButton
                    );

                }

            }


            content.appendChild(
                screen
            );

        }
    );
};

const showJourneyPassport = () => {

    transitionContent(
        (content) => {

            content.classList.remove(
                "history-mode"
            );

            content.classList.add(
                "intro-mode"
            );


            const isVI =
                selectedLanguage === "vi";


            const screen =
                document.createElement(
                    "div"
                );

            screen.className =
                `passport-screen ${
                    isVI
                        ? "font-vi"
                        : "font-en"
                }`;


            screen.innerHTML = `

                <div class="passport-label">
                    ${
                        isVI
                            ? "HỘ CHIẾU HÀNH TRÌNH"
                            : "JOURNEY PASSPORT"
                    }
                </div>


                <div class="passport-book">


                    <!-- LEFT PAGE -->

                    <div
                        class="
                            passport-page
                            passport-page-left
                        "
                    >

                        <div class="passport-small">
                            HERITAGE QUEST
                        </div>

                        <h2 class="passport-title">
                            VIETNAM
                        </h2>

                        <div class="passport-line">
                        </div>

                        <div class="passport-location">

                            ${
                                isVI
                                    ? `
                                        Hoàng thành
                                        Thăng Long
                                        <br>
                                        Hà Nội, Việt Nam
                                    `
                                    : `
                                        Imperial Citadel
                                        of Thang Long
                                        <br>
                                        Hanoi, Vietnam
                                    `
                            }

                        </div>

                    </div>


                    <!-- RIGHT PAGE -->

                    <div
                        class="
                            passport-page
                            passport-page-right
                        "
                    >

                        <h2 class="passport-complete">

                            ${
                                isVI
                                    ? "HOÀN THÀNH HÀNH TRÌNH"
                                    : "JOURNEY COMPLETED"
                            }

                        </h2>


                        <div class="heritage-stamp">

                            <div class="stamp-top">
                                HERITAGE QUEST
                            </div>


                            <img
                                class="heritage-stamp-icon"
                                src="images/icon.png"
                                alt=""
                            >


                            <div class="stamp-bottom">

                                ${
                                    isVI
                                        ? "HOÀN THÀNH"
                                        : "COMPLETED"
                                }

                            </div>

                        </div>

                    </div>


                </div>
            `;

const exitButton =
    document.createElement(
        "button"
    );

exitButton.className =
    "passport-exit";

exitButton.textContent =
    isVI
        ? "QUAY LẠI KHÁM PHÁ  →"
        : "BACK TO EXPLORING  →";


exitButton.addEventListener(
    "click",
    () => {

        const wrapper =
            document.getElementById(
                "heritage-loading"
            );

        if (wrapper) {
            wrapper.style.display =
                "none";

            wrapper.style.pointerEvents =
                "none";
        }

        explorationStarted = true;

        unlockPlayCanvasInput();

        journeyButton.style.display =
            "flex";
    }
);


screen.appendChild(
    exitButton
);
            content.appendChild(
                screen
            );

        const stampSound =
    new Audio(
        "stamp.mp3"
    );

const winSound =
    new Audio(
        "win.mp3"
    );

stampSound.volume = 0.7;
winSound.volume = 0.7;

stampSound.addEventListener(
    "ended",
    () => {
        winSound.play();
    }
);

setTimeout(
    () => {
        stampSound.play();
    },
    450
);


/* STAMP bắt đầu cùng lúc con dấu xuất hiện */

setTimeout(
    () => {
        stampSound.play();
    },
    450
);
        }
    );
};


    /* =====================================================
       CONTROLS + QUEST
    ===================================================== */

    const showControls = () => {

        transitionContent(
            (content) => {

                content.classList.remove(
                    "history-mode"
                );

                content.classList.remove(
                    "intro-mode"
                );


                const isVI =
                    selectedLanguage === "vi";


                const screen =
                    document.createElement(
                        "div"
                    );

                screen.id =
                    "controls-screen";

                screen.className =
                    isVI
                        ? "font-vi"
                        : "font-en";


                /* ==========================================
                   SMALL TITLE
                ========================================== */

                const smallTitle =
                    document.createElement(
                        "div"
                    );

                smallTitle.className =
                    "controls-small-title";

                smallTitle.textContent =
                    isVI
                        ? "TRƯỚC KHI BẮT ĐẦU"
                        : "BEFORE YOU BEGIN";

                screen.appendChild(
                    smallTitle
                );


                /* ==========================================
                   TITLE
                ========================================== */

                const title =
                    document.createElement(
                        "h2"
                    );

                title.className =
                    "controls-title";

                title.textContent =
                    isVI
                        ? "CÁCH KHÁM PHÁ"
                        : "HOW TO EXPLORE";

                screen.appendChild(
                    title
                );


                /* ==========================================
                   SUBTITLE
                ========================================== */

                const subtitle =
                    document.createElement(
                        "div"
                    );

                subtitle.className =
                    "controls-subtitle";

                subtitle.textContent =
                    isVI
                        ? "Khám phá Hoàng thành và tìm 8 hiện vật lịch sử được đặt trong không gian."
                        : "Explore the citadel and discover 8 historical artifacts hidden throughout the site.";

                screen.appendChild(
                    subtitle
                );


                /* ==========================================
                   CONTROLS GRID
                ========================================== */

                const controlsGrid =
                    document.createElement(
                        "div"
                    );

                controlsGrid.className =
                    "controls-grid";


                const createControlItem = (
                    key,
                    englishLabel,
                    vietnameseLabel
                ) => {

                    const item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "control-item";


                    const keyElement =
                        document.createElement(
                            "div"
                        );

                    keyElement.className =
                        "control-key";

                    keyElement.textContent =
                        key;

                    item.appendChild(
                        keyElement
                    );


                    const label =
                        document.createElement(
                            "div"
                        );

                    label.className =
                        "control-label";

                    label.textContent =
                        isVI
                            ? vietnameseLabel
                            : englishLabel;

                    item.appendChild(
                        label
                    );


                    return item;
                };


                controlsGrid.appendChild(
                    createControlItem(
                        "W A S D",
                        "MOVE",
                        "DI CHUYỂN"
                    )
                );


                controlsGrid.appendChild(
                    createControlItem(
                        "MOUSE",
                        "LOOK AROUND",
                        "NHÌN XUNG QUANH"
                    )
                );


                controlsGrid.appendChild(
                    createControlItem(
                        "CLICK",
                        "MOVE / DISCOVER",
                        "DI CHUYỂN / KHÁM PHÁ"
                    )
                );


                controlsGrid.appendChild(
                    createControlItem(
                        "SPACE",
                        "JUMP",
                        "NHẢY"
                    )
                );


                screen.appendChild(
                    controlsGrid
                );


                /* ==========================================
                   QUEST DIVIDER
                ========================================== */

                const divider =
                    document.createElement(
                        "div"
                    );

                divider.className =
                    "quest-divider";

                screen.appendChild(
                    divider
                );


                /* ==========================================
                   QUEST TITLE
                ========================================== */

                const questTitle =
                    document.createElement(
                        "div"
                    );

                questTitle.className =
                    "quest-title";

                questTitle.textContent =
                    isVI
                        ? "NHIỆM VỤ CỦA BẠN"
                        : "YOUR QUEST";

                screen.appendChild(
                    questTitle
                );


                /* ==========================================
                   QUEST LIST
                ========================================== */

                const questList =
                    document.createElement(
                        "div"
                    );

                questList.className =
                    "quest-list";


                const createQuestItem = (
                    english,
                    vietnamese
                ) => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    const star =
                        document.createElement(
                            "span"
                        );

                    star.textContent =
                        "✦";

                    item.appendChild(
                        star
                    );


                    const text =
                        document.createTextNode(
                            isVI
                                ? vietnamese
                                : english
                        );

                    item.appendChild(
                        text
                    );


                    return item;
                };


                questList.appendChild(
                    createQuestItem(
                        "Find all 8 artifacts",
                        "Tìm đủ 8 hiện vật"
                    )
                );


                questList.appendChild(
                    createQuestItem(
                        "Follow the glowing markers",
                        "Đi theo các dấu hiệu phát sáng"
                    )
                );


                questList.appendChild(
                    createQuestItem(
                        "Discover the story behind each object",
                        "Khám phá câu chuyện phía sau mỗi hiện vật"
                    )
                );


                screen.appendChild(
                    questList
                );


                /* ==========================================
                   BEGIN BUTTON
                ========================================== */

                const beginButton =
                    document.createElement(
                        "button"
                    );

                beginButton.id =
                    "begin-exploring";

                beginButton.textContent =
                    isVI
                        ? "BẮT ĐẦU KHÁM PHÁ  →"
                        : "BEGIN EXPLORING  →";

                screen.appendChild(
                    beginButton
                );


                content.appendChild(
                    screen
                );


                /* ==========================================
                   BEGIN EXPLORATION
                ========================================== */

                beginButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        event.stopPropagation();


                        // Unlock PlayCanvas input
                        explorationStarted =
                            true;

                        unlockPlayCanvasInput();


                        window.removeEventListener(
                            "keydown",
                            blockKeyboardInput,
                            true
                        );


                        window.removeEventListener(
                            "keyup",
                            blockKeyboardInput,
                            true
                        );


                        document.removeEventListener(
                            "mousedown",
                            blockMouseInput,
                            true
                        );


                        document.removeEventListener(
                            "mouseup",
                            blockMouseInput,
                            true
                        );


                        document.removeEventListener(
                            "click",
                            blockMouseInput,
                            true
                        );


                        // Notify the PlayCanvas scene
                        app.fire(
                            "heritage:begin"
                        );

                        // Show Herity widget when exploration begins
const herityWidget =
    document.getElementById(
        "herity-widget"
    );

if (herityWidget) {
    herityWidget.style.display = "";
}


                        // Resume audio after user interaction
                        if (
                            app.soundManager &&
                            app.soundManager.context &&
                            app.soundManager.context.state ===
                                "suspended"
                        ) {

                            app.soundManager.context.resume();
                        }


                        // Fade onboarding out
                        const wrapper =
                            document.getElementById(
                                "heritage-loading"
                            );


                        if (!wrapper) {
                            return;
                        }


                        wrapper.style.transition =
                            "opacity 0.8s ease";


                        wrapper.style.opacity =
                            "0";


                        wrapper.style.pointerEvents =
                            "none";


                    }
                );
            }
        );
    };

    /* =====================================================
   JOURNEY UI CSS
===================================================== */

const createJourneyCss = () => {

    const style =
        document.createElement("style");

    style.textContent = `

        #journey-button {
    position: fixed;

    top: 32px;
    right: 32px;

    width: 62px;
    height: 62px;

    display: none;
    align-items: center;
    justify-content: center;

    /* parchment background */
    background:
        linear-gradient(
            145deg,
            #f2dfb5,
            #e5c994
        );

    border:
        2px solid
        #9b6a32;

    border-radius: 16px;

    color: #5b3a1f;

    font-family:
        Cambria,
        Georgia,
        serif;

    font-size: 27px;

    cursor: pointer;

    z-index: 9000;

    box-shadow:
        0 3px 8px
        rgba(40, 22, 8, 0.28),
        inset 0 0 10px
        rgba(255, 244, 210, 0.55);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}


#journey-button:hover {
    transform:
        scale(1.06);

    box-shadow:
        0 5px 14px
        rgba(40, 22, 8, 0.35),
        inset 0 0 12px
        rgba(255, 244, 210, 0.7);
}

/* =====================================================
   JOURNEY PASSPORT ENDING
===================================================== */

.passport-screen {
    width: min(960px, 88vw);
    margin: 0 auto;
    text-align: center;
}

.passport-label {
    margin-bottom: 18px;

    color: rgba(216, 177, 107, 0.58);

    font-size: 13px;
    letter-spacing: 3px;
}

.passport-book {
    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;

    width: 100%;
    min-height: 500px;

    overflow: hidden;

    border: 2px solid #76502d;
    border-radius: 14px;

    box-shadow:
        0 28px 70px
        rgba(0, 0, 0, 0.5);
}

/* CENTER FOLD */

.passport-book::after {
    content: "";

    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;

    width: 1px;

    background:
        rgba(91, 58, 31, 0.35);

    box-shadow:
        5px 0 15px
        rgba(65, 39, 20, 0.12),
        -5px 0 15px
        rgba(65, 39, 20, 0.12);
}

/* PAGES */

.passport-page {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 55px 45px;

    color: #5b3a1f;
}

.passport-page-left {
    background:
        linear-gradient(
            90deg,
            #dcc18e 0%,
            #ead7ad 85%,
            #d8bd89 100%
        );
}

.passport-page-right {
    background:
        linear-gradient(
            90deg,
            #d8bd89 0%,
            #ead7ad 15%,
            #dcc18e 100%
        );
}

/* LEFT PAGE */

.passport-small {
    margin-bottom: 14px;

    font-size: 12px;
    letter-spacing: 3px;

    opacity: 0.65;
}

.passport-title {
    margin: 0;

    font-size: 40px;
    line-height: 1.15;

    font-weight: normal;

    color: #5b3a1f;
}

.font-en .passport-title {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    letter-spacing: 2.5px;
}

.font-vi .passport-title {
    font-family:
        Cambria,
        Georgia,
        serif;

    letter-spacing: 0.5px;
}

.passport-line {
    width: 52px;
    height: 1px;

    margin: 25px auto;

    background:
        rgba(91, 58, 31, 0.45);
}

.passport-location {
    font-size: 17px;
    line-height: 1.7;

    opacity: 0.78;
}

/* RIGHT PAGE */

.passport-complete {
    margin: 0 0 30px;

    font-size: 30px;
    line-height: 1.25;

    font-weight: normal;

    color: #5b3a1f;
}

.font-en .passport-complete {
    font-family:
        "Antique Book Cover",
        Georgia,
        serif;

    letter-spacing: 2.5px;
}

.font-vi .passport-complete {
    font-family:
        Cambria,
        Georgia,
        serif;

    letter-spacing: 0.5px;
}


/* =====================================================
   HERITAGE STAMP
===================================================== */

.heritage-stamp {
    position: relative;

    width: 205px;
    height: 205px;

    display: flex;
    align-items: center;
    justify-content: center;

    border:
        4px double
        rgba(139, 48, 38, 0.88);

    border-radius: 50%;

    color:
        rgba(139, 48, 38, 0.88);

    transform:
        rotate(-9deg)
        scale(2.4);

    opacity: 0;

    animation:
        heritageStampIn
        0.65s
        cubic-bezier(
            0.18,
            0.89,
            0.32,
            1.28
        )
        0.45s
        forwards;
}

/* INNER RING */

.heritage-stamp::before {
    content: "";

    position: absolute;

    inset: 9px;

    border:
        2px solid
        rgba(139, 48, 38, 0.72);

    border-radius: 50%;
}

/* WEBSITE ICON */

.heritage-stamp-icon {
    width: 92px;
    height: 92px;

    object-fit: contain;

    opacity: 0.82;

    filter:
        invert(23%)
        sepia(55%)
        saturate(1700%)
        hue-rotate(335deg)
        brightness(72%)
        contrast(95%);
}

/* STAMP TEXT */

.stamp-top,
.stamp-bottom {
    position: absolute;

    left: 50%;

    width: 170px;

    transform:
        translateX(-50%);

    color:
        rgba(139, 48, 38, 0.9);

    font-size: 11px;
    font-weight: bold;

    letter-spacing: 2px;
}

.stamp-top {
    top: 22px;
}

.stamp-bottom {
    bottom: 22px;
}


/* =====================================================
   STAMP ANIMATION
===================================================== */

@keyframes heritageStampIn {

    0% {
        opacity: 0;

        transform:
            rotate(-4deg)
            scale(2.4);
    }

    65% {
        opacity: 1;

        transform:
            rotate(-10deg)
            scale(0.92);
    }

    82% {
        transform:
            rotate(-8deg)
            scale(1.06);
    }

    100% {
        opacity: 0.86;

        transform:
            rotate(-9deg)
            scale(1);
    }
}


/* MOBILE */

@media (max-width: 800px) {

    .passport-book {
        grid-template-columns: 1fr;
    }

    .passport-book::after {
        display: none;
    }

    .passport-page {
        min-height: 360px;
    }
}

/* =====================================================
   JOURNEY COMPLETE INDICATOR
===================================================== */

#journey-button.journey-complete {
    animation:
        journeyCompleteGlow
        1.5s ease-in-out
        infinite;

    border-color:
        #e2ad52;

    box-shadow:
        0 0 12px
        rgba(226, 173, 82, 0.75),
        0 0 28px
        rgba(226, 173, 82, 0.45),
        inset 0 0 12px
        rgba(255, 239, 190, 0.7);
}


#journey-button.journey-complete
.journey-icon {
    opacity: 1;
}


@keyframes journeyCompleteGlow {

    0%,
    100% {
        transform:
            scale(1);

        box-shadow:
            0 0 8px
            rgba(226, 173, 82, 0.45),
            0 0 18px
            rgba(226, 173, 82, 0.25);
    }

    50% {
        transform:
            scale(1.1);

        box-shadow:
            0 0 16px
            rgba(226, 173, 82, 0.95),
            0 0 35px
            rgba(226, 173, 82, 0.6);
    }
}

    `;


    document.head.appendChild(
        style
    );
};

    /* =====================================================
       STARTUP
    ===================================================== */

    createCss();

createJourneyCss();

createWrapper();

showLoading();

/* =====================================================
   JOURNEY BUTTON
===================================================== */

const journeyButton =
    document.createElement(
        "button"
    );


journeyButton.id =
    "journey-button";


journeyButton.type =
    "button";


journeyButton.innerHTML =
    `<img
        src="images/passport.png"
        alt=""
        class="journey-icon"
    >`;


journeyButton.setAttribute(
    "aria-label",
    "Open Journey"
);


document.body.appendChild(
    journeyButton
);

journeyButton.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        journeyButton.classList.remove(
    "journey-complete"
);


        const wrapper =
            document.getElementById(
                "heritage-loading"
            );


        if (!wrapper) {
            return;
        }


        // Show overlay
        wrapper.style.display =
            "flex";

        wrapper.style.opacity =
            "1";

        wrapper.style.pointerEvents =
            "auto";


        // Hide journey button while archive is open
        journeyButton.style.display =
            "none";


        // Open artifact collection
       showArtifactQuest(
    true
);
    }
);

    /* =====================================================
       PLAYCANVAS LOADING EVENTS
    ===================================================== */

    let assetProgress =
        0;


    let scriptProgress =
        0;


    let loadingComplete =
        false;


    const updateCombinedProgress = () => {

        if (loadingComplete) {
            return;
        }


        const combinedProgress =
            Math.min(
                0.98,
                (
                    assetProgress * 0.85
                ) +
                (
                    scriptProgress * 0.15
                )
            );


        setProgress(
            combinedProgress
        );
    };


    /* =====================================================
       PRELOAD PROGRESS
    ===================================================== */

    app.on(
        "preload:progress",
        (value) => {

            assetProgress =
                Math.max(
                    assetProgress,
                    value
                );


            updateCombinedProgress();
        }
    );


    /* =====================================================
       START PROGRESS
    ===================================================== */

    app.on(
    "start",
    () => {

        scriptProgress =
            1;

        updateCombinedProgress();

        // Keep character completely frozen
        // while onboarding UI is visible
        lockPlayCanvasInput();
    }
);


    /* =====================================================
   PRELOAD COMPLETE
===================================================== */

app.on(
    "preload:end",
    () => {

        loadingComplete =
            true;

        // Keep PlayCanvas controls locked
        // throughout the onboarding
        lockPlayCanvasInput();

        setProgress(
            1
        );

        setTimeout(
            () => {

                showLanguageScreen();

            },
            550
        );
    }
);


    /* =====================================================
       FALLBACK
       If preload:end fires before the custom loading screen
       has fully attached, make sure the language screen can
       still appear.
    ===================================================== */

    let fallbackTriggered =
        false;


    const fallbackCheck = () => {

        if (
            fallbackTriggered ||
            loadingComplete
        ) {
            return;
        }


        const progress =
            document.getElementById(
                "heritage-progress"
            );


        if (!progress) {
            return;
        }


        const width =
            parseFloat(
                progress.style.width || "0"
            );


        if (
            width >= 99
        ) {

            fallbackTriggered =
                true;


            loadingComplete =
                true;


            setProgress(
                1
            );


            setTimeout(
                () => {

                    showLanguageScreen();

                },
                550
            );
        }
    };


    const fallbackInterval =
        setInterval(
            fallbackCheck,
            500
        );


    app.on(
        "preload:end",
        () => {

            clearInterval(
                fallbackInterval
            );
        }
    );


    /* =====================================================
       PREVENT ACCIDENTAL DRAGGING DURING ONBOARDING
    ===================================================== */

    const preventDrag = (
        event
    ) => {

        if (
            !explorationStarted
        ) {

            event.preventDefault();
        }
    };


    document.addEventListener(
        "dragstart",
        preventDrag,
        true
    );

    app.on(
    "artifact:selected",
    (artifact) => {

        if (!artifact) {
            return;
        }

        if (!window.journeyDiscoveredNames) {
    window.journeyDiscoveredNames =
        new Set();
}

window.journeyDiscoveredNames.add(
    artifact.name
);


        if (!window.journeyDiscoveredArtifacts) {

            window.journeyDiscoveredArtifacts =
                new Set();
        }


        const id =
            artifact.getGuid();


        if (
            window.journeyDiscoveredArtifacts.has(
                id
            )
        ) {
            return;
        }


        window.journeyDiscoveredArtifacts.add(
            id
        );


        discoveredArtifactCount =
            window.journeyDiscoveredArtifacts.size;

            if (
    discoveredArtifactCount >= 8
) {
    journeyButton.classList.add(
        "journey-complete"
    );
}

            if (
    discoveredArtifactCount >= 8
) {

    journeyButton.classList.add(
        "journey-complete"
    );
}
    }
);


    /* =====================================================
       CLEANUP WHEN EXPLORATION BEGINS
    ===================================================== */

    app.on(
    "heritage:begin",
    () => {

        journeyButton.style.display =
            "flex";


        document.removeEventListener(
            "dragstart",
            preventDrag,
            true
        );


        clearInterval(
            fallbackInterval
        );
    }
);

});