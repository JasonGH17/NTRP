#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const copyFolderRecursiveSync = require('./fshelper');

const pkgms = ['--use-npm', '--use-pnpm'];

const tempPath = path.join(__dirname, 'template');
const args = process.argv.slice(2);
if (args.length < 1) {
	console.error(new Error('Application name is missing'));
	process.exit(1);
}

const appPath = path.join(process.cwd(), args[0]);
const pkgm = args[1] || '--use-npm';

if (!pkgms.includes(pkgm)) {
	console.error(new Error('Invalid package manager'));
	process.exit(1);
}

if (fs.existsSync(appPath)) {
	console.error(new Error(`${appPath} already exists`));
	process.exit(1);
}
console.log(process.cwd())
copyFolderRecursiveSync(tempPath, process.cwd());
fs.renameSync(path.join(process.cwd(), 'template'), appPath);