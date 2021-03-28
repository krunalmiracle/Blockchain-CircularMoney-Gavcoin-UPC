//Main Execution File of the Server
import app from './app'; //Exported App importing here
// Child Asynchronous process
import child_process from 'child_process';
//Execute Connection to BDD before launching the Server
const config  = require ('./configurations/config');
//Server definition
const packageJson = require('../package.json')

// Server Object retrieval and Port mapping
let server = require('http').Server(app);
const port = app.get('port');

//Error Handling - Server
const onError = (error: { syscall: string; code: any; }): void => {
    if (error.syscall !== 'listen') throw error
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
    if (error.code === 'EACCES') {
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
    } else if (error.code === 'EADDRINUSE') {
        console.error(`${bind} is already in use`);

        process.exit(1);
    } else {
        throw error;
    }
}
// Event Listening - Server
const onListening = (): void => {
    console.log(`${packageJson.name} ${packageJson.version} listening on http://localhost:${port}`)
    // Origin and Header control
    app.use(function(_, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
        next();
    });
}
/* async function runOffThread() {
    console.log('Ran');
    let workerProcess = child_process.spawn('node', [path.resolve(__dirname,'workers/migration.js')]);
    workerProcess.stdout.on('data', function (data) {
        console.log('childProcess: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
        console.log('childProcess Error: ' + data);
    });
    workerProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
}   */

process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

// Server Error, Report on error event
server.on('error', onError);
// Server after initialization, Report on server initialization succesfull
server.on('listening', onListening);
// Server initialization
server.listen(port);






/* //Database Connection Initialization
dbHandler.initiateDB().then((res)=>{
    //No DB Initiation error
    dbHandler.createAdmin().then(()=>{
        
        // Create 2nd Thread where the autoEncrypt works every X min
        if(config.AUTOENCRYPTIONTIMER>0){
            runOffThread().catch(err => console.error(err));
        }
    }).catch((err)=>{
        //Some unexpected error occurred!
        console.log("Error creating default admin, server won't be ran : "+err);
    });
}).catch((error)=>{
    console.log('Connection Error w/DB \n: '+error);
}); */


