
/*
 * GET home page.
 */

 exports.index = function(req, res){
 	res.render('index', { 
 		header: 'My hackerspace', 
 		ingress: 'This is my site, here I do stuff with computers.',
 		content: 'This site is running on node.js, express framework, the styling is made with a custom twitter bootstrap template. This webapp was designed and created by Theo Högberg. Dolce et decorum est pro patria mori'
 	});
};