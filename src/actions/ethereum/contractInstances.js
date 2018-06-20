import Web3 from 'web3';
var contract = require("truffle-contract");
const xFitTokenABI = require('./xFitToken.json');
const xFitTokenCrowdsaleABI = require('./xFitTokenCrowdsale.json');

// getContractInstances fetches:
// 1) current logged in account
// 2) xFitTokenCrowdsale deployed instance connection 
// 3) xFitToken deployed instance connection
// 4) proposed projects
// 5) Token ownership status/ Token transfer status
const getContractInstances = async () => {
    let web3;
    let contractData = {
        xFitTokenCrowdsale: {},
        xFitToken: {},
        accounts: [],
        projects: {},
        tokenTransfers: {},
        tokenInfo: {},
        isBoxOwner: false,
        connectedToBlockChain: 'NotConnected'
    }

    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
        try {
            // see if contract lat/lng is saved
            debugger;
            contractData.accounts = await web3.eth.getAccounts();
            if (contractData.accounts.length == 0) {
                contractData.connectedToBlockChain = 'NotConnected';
                return contractData;
            }

            contractData.xFitTokenCrowdsale = contract(xFitTokenCrowdsaleABI);
            contractData.xFitToken = contract(xFitTokenABI);
            contractData.xFitTokenCrowdsale.setProvider(window.web3.currentProvider);
            contractData.xFitToken.setProvider(window.web3.currentProvider);

            // have these three all in one promise.all
            contractData.tokenTransfers = await App.getNetTransfers(contractData.xFitToken);
            contractData.projects = await App.listenForProjects(contractData.xFitTokenCrowdsale);

            // if there is a token, go get the token details
            if (contractData.tokenTransfers.transfers[contractData.accounts[0].toLowerCase()]) {
                contractData.tokenInfo = await App.getTokenInfo(contractData.accounts[0], contractData.xFitToken);
            }

            // check if the currently logged in account is a box owner
            contractData.isBoxOwner = App.checkIfBoxOwner(contractData.projects, contractData.accounts[0]);
            contractData.connectedToBlockChain = 'Connected';
            return contractData;
        } catch (err) {
            console.log('error getting the contracts');
            return contractData;
        }
    } else {
        console.log('could not even get the accounts');
        return contractData;
    }
}

const App = {
    transfers: {},
    approvals: {},

    checkIfBoxOwner: function (projects, account) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].args.creator == account.toLowerCase()) {
                return true;
            }
        }
        return false;
    },

    // currently not used -need to solve promise.all issue
    getEventsAndAccount: function (xFitToken, xFitTokenCrowdsale, web3) {
        return Promise.all(
            App.listenForTransferApprovarl(xFitToken),
            App.listenForProjects(xFitTokenCrowdsale),
            web3.eth.getAccounts()
        )
    },

    getTokenInfo: function (account, xFitToken) {
        return xFitToken.deployed().then(instance => {
            return instance.getTokenInfo.call(account, { from: account, gas: '1000000' });
        }).then(tokenDetails => {
            return {
                name: tokenDetails[0],
                box: tokenDetails[1],
                pin: tokenDetails[2].c[0]
            }
        }).catch(err => {
            console.log("error");
            console.error(err);
        });
    },

    listenForTransfer: function (xFitToken) {
        return new Promise((resolve, reject) => {
            xFitToken.deployed().then((instance) => {
                instance.Transfer({}, { fromBlock: 0, toBlock: 'latest' }).get(function (error, event) {
                    if (error) {
                        console.log(error);
                    }
                    resolve(event);
                });
            }, (err) => {
                console.log(err)
            });
        });
    },

    getNetTransfers: async function (xFitToken) {
        // var localApproval = await App.ListenForApprovals(xFitToken);
        var localTransfer = await App.listenForTransfer(xFitToken);

        // get net transfers
        for (var index in localTransfer) {
            var newTransfer = {
                "from": localTransfer[index].args.from
            };
            delete App.transfers[newTransfer.from]
            App.transfers[localTransfer[index].args.to] = newTransfer
        }

        return App;
    },

    listenForProjects: function (xFitTokenCrowdsale) {
        return new Promise((resolve, reject) => {
            xFitTokenCrowdsale.deployed().then((instance) => {
                instance.LogProject({}, { fromBlock: 0, toBlock: 'latest' }).get(function (error, event) {
                    if (error) {
                        console.log(error);
                    }
                    resolve(event);
                });
            }, (err) => {
                console.log(err)
            })
        });
    }
}

export default getContractInstances;
