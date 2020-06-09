const serp = require('./serp')

async function getSearch(query) {
	var options = {
		host : "google.com",
		exactQuery: true,
		noYoutube: true,
		noTwitter: true,
		qs : {
			q : `"${query}"`,
			filter : 0,
			pws : 0,
		},
		num : 3
	}; 

	try {
		let result = await serp.search(options);

		console.log('\nYour Query: ', options.qs.q)
		console.log('find results below\n')
		console.log(result);
		
		return result;
	}
	catch(e) {
		console.log(e)
	}

}

module.exports = getSearch;