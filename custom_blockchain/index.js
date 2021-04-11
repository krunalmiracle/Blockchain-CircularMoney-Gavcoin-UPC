const app = require( './app');
const packageJson = require('./package.json')

const onError = (error) => {
    if (error.syscall !== 'listen') throw error
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
    /*let bind = 'Port ' + port*/
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}
// Event Listening - Server
const onListening = () => {
    // tslint:disable-next-line:max-line-length
    console.log(`${packageJson.name} ${packageJson.version} listening on http://localhost:${port}!`)
}
// Origin and Header control
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
});
// Server Initialization and Port mapping
let server = require('http').Server(app);
const port = app.get('port');

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
/*app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});*/