let express = require('express');
let router	= express.Router();
const search = require('../utils/search')

// const q = `You have an app, new Idea, new Update. You wonder how will you deliver them to the right user? Google won't leave you alone in the desert without showing you the way. No, I don't mean Google Maps. Google introduced Firebase Cloud Messaging which is a free tool/ platform that will help you send Push Notifications in your choice devices`;
router.get('/', (req, res)=>{
	res.render('home');
})


router.post('/result', async function(req, res){
	const q = req.body.query
	if (!q) return res.status(400).json({error: "empty query sent"})

	const tosearch = q.split('. ')
	var result = []
	var count = {
		total: tosearch.length,
		plagiarised: 0
	}
	console.log(q, '\n\n', result)

	for (let i=0; i<tosearch.length; i++) {
		let currQuery = tosearch[i]
		let a = await search(currQuery)
		if (a.length>0) {
			result.push({ text: currQuery, url: a[0].url })
			count.plagiarised += 1;
		}
		else result.push({ text: currQuery, url: null })
	}

	res.render('result', { result: result, count: count })

})

module.exports = router;