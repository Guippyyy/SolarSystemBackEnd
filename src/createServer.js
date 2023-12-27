var http = require('http');
var app = require('../server');

module.exports = async function createServer() {
    var port = process.env.PORT || 3001;
    

    return {
        getApp() {
            return app;
        },

        start() {
            return new Promise((resolve, reject) =>{
                app.set('port', port);
                var server = http.createServer(app);
            
                // Start listing to the port
                server.listen(port, () => {
                    console.log('listening on port ' + port)
                })

                resolve();
            })
        }
    }
}