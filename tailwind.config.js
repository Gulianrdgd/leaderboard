module.exports = {
    purge: [
        './lib/leaderboard_web/templates/layout/*.html.eex',
        './lib/leaderboard_web/templates/page/*.html.eex',

        './assets/js/*.js'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
