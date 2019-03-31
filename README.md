# Wii Balance Board PI

This node module aims to make recieving data from the wii balance board with the raspberry pi as easy as possible. It tries to connect to the balance board via bluetooth an retrieves its data once connected.

## Getting Started

### Prerequisites

- Raspberry PI Stretch
- Wii Balance Board

### Installation

Run to make sure this module can use the bluetooth of the pi

```
sudo apt-get install bluez python-bluez python-gobject python-dbus
```

```
sudo reboot
```

Now install the module with

```
npm i -s wii-balance-board-pi
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
