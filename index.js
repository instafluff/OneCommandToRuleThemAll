const fs = require( "fs" );

var folders = fs.readFileSync( "folders.txt" ).toString().split( "\r\n" ).filter( x => x );
var commands = folders.map( x => `cd .. && cd ${x} && nodemon & cd .. && cd OneCommandToRuleThemAll`)
console.log( commands );

const concurrently = require('concurrently');
concurrently(commands, {
    prefix: 'OneCommandToRuleThemAll',
    killOthers: [ 'failure', 'success' ],
    restartTries: 3,
}).then( success, failure );

function success() {
  console.log( "success is defined!" );
}

function failure() {
  // console.log( "success is almost defined" );
  console.log( "failure is just a stepping stone to success!" );
}
