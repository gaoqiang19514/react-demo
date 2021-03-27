import { INCREMENT, DECREMENT } from '@/actions';

export default function rootReducer(state, action) {
    if (action.type === INCREMENT) {
        return {
            count: state.count + 1,
        };
    }

    if (action.type === DECREMENT) {
        return {
            count: state.count - 1,
        };
    }

    return state;
}
