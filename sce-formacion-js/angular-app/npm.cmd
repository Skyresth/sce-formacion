@echo off
setlocal
set PATH=%~dp0../node/;%PATH%
node ../node/node_modules/npm/bin/npm-cli.js %*
@echo on