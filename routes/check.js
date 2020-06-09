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

	//replace all 3 types of line breaks with a dot
	q.replace(/(\r\n|\n|\r)/gm, ".")
	//Replace all multiple white spaces with single space
	q.replace(/\s+/g, " ")
	//Replace all multiple dots with single dot
	q.replace(/\.+/g, ".")
	//to separate all sentences of the paragraph
	q.replace(/([.?!])\s*(?=[A-Z])/g, "$1|")

	//array of all sentences of paragraph
	const tosearch = q.split("|")
	var length = tosearch.length

	if (length>100) {
		return res.status(400).json({ error: "Max sentences limit crossed!"})
	}

	var result = []
	var count = {
		total: length,
		plagiarised: 0
	}
	console.log(q, '\n\n', result)

	for (let i=0; i<length; i++) {
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