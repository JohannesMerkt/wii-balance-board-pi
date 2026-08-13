# Wii Balance Board Pi

A Node.js module for reading data from the Nintendo Wii Balance Board over Bluetooth on a Raspberry Pi.

It spawns a small Python helper ([`boardListener.py`](boardListener.py)) that handles the low-level Bluetooth connection and streams weight readings back as JSON. Your Node.js code simply listens for `data` events.

## Requirements

- Raspberry Pi (or any Linux machine with Bluetooth)
- A Nintendo Wii Balance Board
- [Node.js](https://nodejs.org/) and Python 2 with Bluetooth support

> **Note:** `boardListener.py` is written in Python 2 (it uses `xrange`, `decode("hex")`, and `print` statements). Make sure `python` resolves to Python 2 on your system.

## Installation

Install the module:

```sh
npm install wii-balance-board-pi
```

Install the Bluetooth system packages:

```sh
sudo apt-get --assume-yes install bluez python-bluez python-gobject python-dbus
```

You can also run the bundled setup script instead:

```sh
npm run setup
```

A reboot is recommended after installing the Bluetooth packages:

```sh
sudo reboot
```

## Quick start

```js
const BalanceBoard = require("wii-balance-board-pi");

const balanceBoard = new BalanceBoard();

balanceBoard.connect();

balanceBoard.on("data", data => {
  console.log(data);
});
```

To pair the board, press the red **sync button** (under the battery cover) while `connect()` is trying to establish a connection.

## Data format

Each `data` event receives an object with the following shape:

```js
{
  connected: false
}

// when connected:
{
  connected: true,
  topLeft: 12.5,      // weight in kg on the top-left corner
  topRight: 12.5,     // weight in kg on the top-right corner
  bottomLeft: 12.5,   // weight in kg on the bottom-left corner
  bottomRight: 12.5,  // weight in kg on the bottom-right corner
  totalWeight: 50.0,  // sum of the four corners
  buttonPressed: false,
  buttonReleased: false
}
```

## API

`BalanceBoard` extends [`EventEmitter`](https://nodejs.org/api/events.html).

### `connect()`

Starts trying to connect to the board and keeps retrying if the connection is lost. The board will only connect while its sync button is pressed. Once connected, it emits `data` events.

### `disconnect()`

Stops the connection and halts all further attempts until `connect()` is called again.

### `isConnected()`

Returns `true` when the board is currently connected, otherwise `false`.

### `on("data", callback)`

Registers a listener for incoming `data` events (see [Data format](#data-format)).

### `removeListener("data", callback)`

Stops the given listener from receiving `data` events. See the [Node.js docs](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener) for details.

## License

[ISC](LICENSE)
