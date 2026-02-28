/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#cc5500",
                "primary-dark": "#a34400",
                "background": "#101622",
                "accent": "#FDE6D9",
                "off-white": "#F5F5F5",
                "rich-orange": "#C2410C",
                "soft-orange": "#fb923c",
            },
            fontFamily: {
                display: ["var(--font-space-grotesk)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
