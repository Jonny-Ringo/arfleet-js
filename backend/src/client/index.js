const config = require('../config');
const utils = require('../utils');
const providerAnnouncements = require('./background/providerAnnouncements');
const { getAoInstance } = require('../arweave/ao');

let state = {};

class Client {
    constructor({ wallet }) {
        this.wallet = wallet;
        this.start();
    }

    async start() {
        console.log("Datadir: ", utils.getDatadir());
        console.log("Wallet address: ", await this.wallet.getAddress());

        this.ao = getAoInstance({ wallet: this.wallet });

        providerAnnouncements.startChecking();
    }
}

let clientInstance;

function getClientInstance(initialState = null) {
    if(!clientInstance) {
        if (!initialState) throw new Error("Client is not initialized with a state");
        clientInstance = new Client(initialState);
    }
    
    return clientInstance;
}

module.exports = getClientInstance;