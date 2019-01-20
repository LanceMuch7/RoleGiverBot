This project is an answer to a problem I have been trying to work around on a work project. I develop games with a team that uses
the Roblox game engine, which has a rather poorly implemented and feature-barren database package. Our team currently has an 
active player base of about 5,000 users, with about 10,000 more that play occasionally. The features we implement therefore have to
scale extremely well, especially when dealing with a feature as fundamental as storing and restoring player progress and monetary
purchases.


A feature that the Roblox engine does support well is external http requests, which I will use in order to take advantage of an
externally hosted database of my own design, which I will create using PostgreSQL and Node.JS on the server side, with the game
server acting as the client with a Lua script.