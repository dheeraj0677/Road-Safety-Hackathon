@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/dheeraj0677/Road-Safety-Hackathon.git
echo Pushing to GitHub...
git push -u origin main
echo Done!
pause
