@echo off
title Setup Discord Nuclear Warhead

if exist node_modules\ (
  echo The Nuclear Warhead has already been set up.
  echo Edit your configuration in 'config.json' and start the bot with 'start.bat'
  pause
  exit
) else (
  call npm i >> NUL
  echo Succesfully setup!
  echo Re-run this file.
  pause
  exit
)