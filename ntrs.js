#!/usr/bin/env node

const path = require('path');

const args = process.argv.slice(2);
if (args.length < 1) {
	console.error(new Error('Application name is missing'));
	process.exit(1);
}

const appPath = path.join(__dirname, args[0])
console.log(appPath)