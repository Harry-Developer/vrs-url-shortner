const header = new Vue({
    el: '#header',
    mounted:function() {
        this.loadTheme()
    },
    methods: {

        _addDarkTheme() {
            let darkThemeLinkEl = document.createElement("link");
            darkThemeLinkEl.setAttribute("rel", "stylesheet");
            darkThemeLinkEl.setAttribute("href", "/css/dark.css");
            darkThemeLinkEl.setAttribute("id", "dark-theme-style");
        
            let docHead = document.querySelector("head");
            docHead.append(darkThemeLinkEl);

            localStorage.setItem('dark-theme', true);
        },

        _removeDarkTheme() {
            let darkThemeLinkEl = document.querySelector("#dark-theme-style");
            let parentNode = darkThemeLinkEl.parentNode;
            parentNode.removeChild(darkThemeLinkEl);

            localStorage.removeItem('dark-theme');
        },

        darkThemeSwitch() {
            let darkThemeLinkEl = document.querySelector("#dark-theme-style");
            if (!darkThemeLinkEl) {
                this._addDarkTheme()
            } else {
                this._removeDarkTheme()
            }
        },

        loadTheme() {
            let darkTheme = localStorage.getItem('dark-theme');

            if(darkTheme === 'true')
                this._addDarkTheme();
        }
    }
})