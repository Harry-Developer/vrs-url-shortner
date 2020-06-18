const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        error: null,
        created: null,
    },
    methods: {
        async createURL() {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    url: this.url,
                    slug: this.slug
                })
            })

            let res = await response.json();
            
            if(res.error) {   
                this.error = res;
                this.created = null;
            }
            else  {
                this.created = 'http://127.0.0.1:1337/' + res.slug;
                this.error = null
            }
        }
    }
})
