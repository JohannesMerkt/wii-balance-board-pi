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

Make sure bluetooth is installed with:

```
sudo apt-get --assume-yes install bluez python-bluez python-gobject python-dbus
```

I suggest to do a reboot now

```
sudo reboot
```

## Basic Usage

```javascript
const BalanceBoard = require("wii-balance-board-pi");

var balanceBoard = new BalanceBoard();

balanceBoard.connect();

balanceBoard.on("data", data => {
  console.log(data);
});
```

## Documentation

Overview over all functions available with this package. Additionally the BalanceBoard class also extends EventEmitter.

### BalanceBoard.connect()

Tries to continuously connect to the wii balance board. It will only be able to connect when the sync button is pressed. When the connection is lost it will keep trying to reconnect.

When connected BalanceBoard.on("data", (data) =>{}) will send data events from the wii balanceboard.

### BalanceBoard.on("data",(data) => {})

Once connected to the wii balance board data events can be recieved with this event emitter.

The data object will have these fields:

```javascript
{
    connected: boolean,
    //All below only when connected is true
    topLeft: float, //weight in kg on the top left corner of the board
    topRight: float,
    bottomLeft: float,
    bottomRight: float,
    totalWeight: float,
    buttonPressed: boolean,
    buttonReleased: boolean
}
```

### BalanceBoard.removeListener("data",(data) => {})

Call this function to stop listening to incomming data.
For more detail: https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener

### BalanceBoard.isConnected()

This function returns a boolean on if the wii balance board is connected.

### BalanceBoard.disconnect()

When called wii balance board will be disconnected and no connection will be established until BalanceBoard.connect() is called again.

## TODO

- make JSON.parse always successful so the try catch isnt necessary anymore
