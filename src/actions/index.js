import getContracts from './ethereum/contractInstances';
export const FETCH_CONTRACTS = 'FETCH_CONTRACTS';

export function fetchTokenContract() {
    const contracts = getContracts();
    return {
        type: FETCH_CONTRACTS,
        payload: contracts
    };
}
