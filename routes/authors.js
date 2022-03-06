const express = require('express');
const router = express.Router();
const Author = require('../models/author');


// all authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    // get request sends through query, post request sends thru body...
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        // empty obj inside find means no conditions
        const authors = await Author.find(searchOptions); 
        res.render("authors/index", {
          authors,
          searchOptions: req.query,
        });
    } catch (error) {
        res.redirect('/')      
    }
  
})

// new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// create author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
       const newAuthor = await author.save()
        res.redirect('authors')
        // res.redirect(`authors/${newAuthor.id} `) 
    } catch {
        res.render('authors/new', {
            author,
            errorMessage: 'error creating author'
        })
    }
})

module.exports = router