#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const copyFolderRecursiveSync = require('./fshelper');
const { exec } = require('child_process');

const pkgms = { '--use-npm': 'npm', '--use-pnpm': 'pnpm' };

const tempPath = path.join(__dirname, 'template');
const args = process.argv.slice(2);
if (args.length < 1) {
	console.error(new Error('Application name is missing'));
	process.exit(1);
}

const appPath = path.join(process.cwd(), args[0]);
const pkgm = args[1] || '--use-npm';

if (!Object.keys(pkgms).includes(pkgm)) {
	console.error(new Error('Invalid package manager'));
	process.exit(1);
}

if (fs.existsSync(appPath)) {
	console.error(new Error(`${appPath} already exists`));
	process.exit(1);
}

copyFolderRecursiveSync(tempPath, process.cwd());
fs.rename(path.join(process.cwd(), 'template'), appPath, () => {
	process.chdir(appPath);
	console.log("Downloading the packages...")
	console.time('Packages download');
	exec(`${pkgms[pkgm]} install`, (error, stdout, stderr) => {
		if (error) {
			console.error(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(stderr);
			return;
		}
		console.timeEnd('Packages download');
	});
});
