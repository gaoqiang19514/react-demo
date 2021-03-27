export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

export function onIncrement() {
    return {
        type: INCREMENT,
    };
}

export function onDecrement() {
    return {
        type: DECREMENT,
    };
}
