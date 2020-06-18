const express = require('express');
const slufify = require('slugify');
const cors = require('cors');
const db = require('monk')('localhost/vrs');
const { nanoid } = require('nanoid');
const { default: slugify } = require('slugify');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 1337;

const urls = db.get('urls');

urls.createIndex('slug url');

app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

app.get('/:id', async (req, res) => {

    try {
        const { id: slug } = req.params;

        if (slug != "") {
            const url = await urls.findOne({ slug });
            res.redirect(url.url)
        }

    } catch (error) {
        //console.log(error);   
    }

})

app.post('/url/', async (req, res) => {
    var { slug, url} = req.body;

    if (slug == "")
        slug = nanoid(7).toLowerCase();

    slug = slufify(slug);

    const exists = await urls.findOne({ slug });
 
    if(exists) {
        res.send({
            error: 'Slug Exists 🥞'
        })
    } else {

        urls.insert({ slug: slug, url: url});

        res.send({
            slug: slug
        })
    }
})

app.listen(port, () => console.log(`App running on: http://127.0.0.1:${port}`));



