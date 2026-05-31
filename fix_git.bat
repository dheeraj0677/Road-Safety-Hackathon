@echo off
echo Removing node_modules from git tracking...
git rm -r --cached roadsos/node_modules
git add .
git commit -m "Add .gitignore and remove node_modules"
echo Pushing to GitHub...
git push -u origin main
echo Done!
pause
