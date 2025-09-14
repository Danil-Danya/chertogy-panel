// разрабы ебланы убрали конфиг из 4 версии но оставлю его если решу откатиться назад

// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    xl: '1220px'
                }
            },
            colors: {
                purpleDark: "#6A3B7B",
                purpleLight: "#AA70BF",
                purpleMid: "#86489C",
                lavender: "#EEE0F1",
                redMain: "#E44653",
                redAccent: "#F0515E",
                redDark: "#742628",
                redBright: "#D23C48",
                dark: "#1F1821",
                grayLight: "#CDC2D1",
                greenDark: "#4A7548",
                grayMid: "#545560",
                blackish: "#18171E",
                deepDark: "#1D1A1E",
            },
            backgroundImage: {
                gradientPurple: "linear-gradient(90deg, #CBBECD 0%, #FFF 46.5%, #CBBECD 100%)",
                gradientOverlay: "linear-gradient(205deg, rgba(87, 27, 109, 0.10) -13.49%, rgba(210, 60, 72, 0.10) 123.39%)",
                gradientDark: "linear-gradient(257deg, rgba(90, 51, 98, 0.20) -4.79%, rgba(31, 24, 33, 0.20) 86.4%)",
                gradientSoft: "linear-gradient(114deg, rgba(54, 38, 38, 0.30) -3.5%, rgba(34, 27, 36, 0.30) 47.08%, rgba(54, 38, 38, 0.30) 97.65%)",
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1220px',
        }
    },
    plugins: [],
}
