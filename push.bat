@echo off
echo Adding new changes...
git add .
git commit -m "feat: Auto-send distress SMS with location to custom emergency contacts"
echo Pushing to GitHub...
git push origin main
echo Done!
pause
