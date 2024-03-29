// Miniserver
// creas folder
// npm init -y
// npm install request
// npm install express
// crear .gitignore
//     node_modules/
//     credentials.js
//nom
//npm run start

//https://help.github.com/en/articles/adding-an-existing-project-to-github-using-the-command-line

const express = require('express')
const omdb = require('./movies.js')

const app = express()

const port = process.env.PORT || 3000


app.get('', function(req, res) {
  res.send({
    greeting:'Hola Mundo!'
  })
})

// http://localhost:3000/omdb?search=Game%20of%20Thrones
app.get('/omdb', function(req, res) {
  //console.log(res.query)
	if (!req.query.search) {
	    res.send({
	      error: 'Debes enviar un titulo de una pelicula o serie'
	    })
	}
  // Hardcodeado
  // res.send({
  //   title: 'Game of Thrones'
  // })
	omdb.omdbMovie( req.query.search, function(error, response) {
	  	if (error) {
		    return res.send({
		      error: error
		    })
	  	}
	  	if (response.seasons) {
	    	var title = response.title
	    	omdb.omdbSeason(response.title, response.seasons, function(error, response) {
			    if (error) {
			        return res.send({
			          error: error
			        })
			    }
			    res.send({
			        title: title,
			        season: response.season,
			        episodes: response.episodes
	      		})
	    	})
	  	} else { // si no hay season
	    	res.send(response)
  		}
	})


})



// Comodin
app.get('*', function(req, res) {
  res.send({
    error:'ruta no valida'
  })
})

app.listen(port, function() {
  console.log('Up and running!')
})