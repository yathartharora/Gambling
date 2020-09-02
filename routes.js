const routes = require('next-routes')();



routes
.add("/newmatch","/matches/newmatch")
.add('/matches/:address', '/matches/show')
module.exports = routes;