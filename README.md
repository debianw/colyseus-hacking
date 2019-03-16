# Colyseus Hacking

## Run Client

Note: Please replace server address with your ip address in `./client/src/App` line #18

```
cd app
npm install
npm run start
```

## Run Server

```
cd server
npm install
npm run start
```


## Issues

### Server issues
* `onLeave` method in the server is never called  ( use your mobile and try to connect to the server, then switch to airplane mode ). This is important for implementing `rejoin` process on the client (In the demo the `rejoin` process is broken because of this)

### Client issues
* After a reconnection the `onOpen` event sometimes takes too much time to be called
* Chrome browser sometimes is never calling `onClose` event after turning off the network ( This is on Chrome desktop ). But Safari is doing it without any problems
