const routes = require('next-routes')();



routes
.add("/","/index")
.add("/developer","/developer")
.add("/about","/about")
.add("/newmatch","/matches/newmatch")
.add('/matches/:address', '/matches/show')
module.exports = routes;