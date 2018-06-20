import { FETCH_CONTRACTS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CONTRACTS:
            return action.payload
        default:
            return state;
    }
}
