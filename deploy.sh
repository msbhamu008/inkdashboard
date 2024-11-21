#!/bin/bash
git add .
git commit -m "Update deployment configuration"
git remote remove origin
git remote add origin https://github.com/msbhamu008/inkdashboard.git
git push -f origin main
