#!/bin/bash 

filepath="C:\Users\Admin\AppData\Local\Screeps\scripts\screeps.com\default" 

ls -1 | grep .js | xargs cp -t $filepath
