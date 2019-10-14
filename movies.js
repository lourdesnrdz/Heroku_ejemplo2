
// const credentials = require('./credentials.js')


const request = require('request')

if(process.env.NODE_ENV === 'production') {
	var apikey = process.env.API_KEY
} else {
	const credentials = require('./credentials.js')
	var apikey = credentials.apikey
}

const omdbMovie = function(title, callback) {
	const url = 'http://www.omdbapi.com/?apikey=' + apikey + '&t=' + title

	request({url, json:true}, function(error, response) {
		const data = response.body

		if(error) {
			// console.log(error)
			callback(error, undefined)
		} else {
			if(data.Response == 'False'){
				// console.log('Error: ' + data.Error)
				callback(data.Error, undefined)
			} else {
				const info = {
					title: data.Title,
					plot: data.Plot,
					//rating: data.Ratings[0].Value,
					rating: data.imdbRating,
					seasons: data.totalSeasons
				}

			callback(undefined, info)
			
			// console.log(info)
			// omdbSeason(title, info.seasons)

			// for( i = 1; i <= info.seasons; i++) {
			// 	omdbSeason(title, i)
			// }
			}
		}

		

	})
}

const omdbSeason = function(title, season, callback ){
	const url = 'http://www.omdbapi.com/?apikey=' + apikey + '&t=' + title + '&Season=' + season
	request({url, json:true}, function(error, response) {
		if (error) {
			callback('Unable to connect to OMDB service', undefined)
		}
		else {
			const data = response.body
			const info = {
				season: season,
				episodes: []
			}
			for( i in data.Episodes) {
				info.episodes.push(data.Episodes[i].Title)
			}
			// console.log(info)
			callback(undefined, info)
		}
		
	})
}

module.exports = {
	omdbMovie : omdbMovie,
	omdbSeason : omdbSeason
}



//nodemon
// npm install -g nodemon