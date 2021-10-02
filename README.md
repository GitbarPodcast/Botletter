# BOTLETTER

[![Build Status](https://img.shields.io/github/workflow/status/GitbarPodcast/Botletter/CI)](https://github.com/GitbarPodcast/Botletter/actions?query=workflow%3ACI)

> Turn your telegram community links into a newsletter

Telegram communities and groups based on messaging systems have a tremendous limit, interesting links are often flooded by tons of messages with less importance.
Once submerged the life of the link, regardless of the importance it has, is finished.

## How to solve this problem?

The solution that we thought of is to store all the messages that contain a link, and once a week, automatically generate an email and send it to subscribers.

Simple no 😜!

## Architecture

Botletter is a nodejs application written in typescript.

The application is divided into core and infrastructure.

**Core**: contains all the business logic of the application

**Infrastructure**: since botletter not matters about the service we use to store messages and send email this folder contains the delivery and the store modules.

## Notes

To have a better node management you should to install volta, with volta this project will run with the environment defined in the volta prop inside the package.json

More info on https://volta.sh/
