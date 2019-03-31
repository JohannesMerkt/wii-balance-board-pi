# Wii Balance Board PI

This node module aims to make recieving data from the wii balance board with the raspberry pi as easy as possible. It tries to connect to the balance board via bluetooth an retrieves its data once connected.

## Getting Started

### Prerequisites

- Raspberry PI
- Wii Balance Board

### Installation

Install the module with

```
npm i -s wii-balance-board-pi
```

Run the setup with:

```
npm explore wii-balance-board-pi -- npm run setup
```

I suggest to do a reboot now

```
sudo reboot
```

## Basic Usage

```
var BalanceBoard = require("wii-balance-board-pi");

BalanceBoard.connect();

BalanceBoard.on("data", data => {
  console.log(data);
});
```

To check if connected

```
BalanceBoard.isConnected();
```

To disconnect

```
BalanceBoard.disconnect();
```

## TODO

- make JSON.parse always successful so the try catch isnt necessary anymore
- better documentation
