import React from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3'

let web3 = window.web3;
export const initContract = async (abi, address) => {
    if (web3) {
        return web3.eth.contract(abi).at(address);
    }

}


const Web3Component = (props, context) => {
    const web3Context = context.web3;
    const { selectedAccount } = web3Context;

    return (
        <div>
           {selectedAccount}
        </div>
    );
}


Web3Component.contextTypes = {
    web3: PropTypes.object,
};

export default Web3Component;
