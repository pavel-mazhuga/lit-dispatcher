import createLitDispatcher from '../src/index';

describe('Lit Dispatcher', () => {
    it('subscribes to an event', () => {
        const dispatcher = createLitDispatcher();
        const callback = jest.fn();
        dispatcher.on('test-event', callback);
        dispatcher.dispatch('test-event');

        expect(callback).toBeCalledTimes(1);
    });

    it('unsubscribes a callback from an event', () => {
        const dispatcher = createLitDispatcher();
        const callback = jest.fn();
        dispatcher.on('test-event', callback);
        dispatcher.dispatch('test-event');
        dispatcher.off('test-event', callback);
        dispatcher.dispatch('test-event');

        expect(callback).toBeCalledTimes(1);
    });

    it('unsubscribes from an event', () => {
        const dispatcher = createLitDispatcher();
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        dispatcher.on('test-event', callback1);
        dispatcher.on('test-event', callback2);
        dispatcher.dispatch('test-event');
        dispatcher.off('test-event');
        dispatcher.dispatch('test-event');

        expect(callback1).toBeCalledTimes(1);
        expect(callback2).toBeCalledTimes(1);
    });

    it('unsubscribes from all events', () => {
        const dispatcher = createLitDispatcher();
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        dispatcher.on('test-event', callback1);
        dispatcher.on('another-test-event', callback2);
        dispatcher.dispatch('test-event');
        dispatcher.dispatch('another-test-event');
        dispatcher.off();
        dispatcher.dispatch('test-event');
        dispatcher.dispatch('another-test-event');

        expect(callback1).toBeCalledTimes(1);
        expect(callback2).toBeCalledTimes(1);
    });

    it('calls callback once', () => {
        const dispatcher = createLitDispatcher();
        const callback = jest.fn();
        dispatcher.once('test-event', callback);
        dispatcher.dispatch('test-event');
        dispatcher.dispatch('test-event');

        expect(callback).toBeCalledTimes(1);
    });

    it('does not register the same function to the same event', () => {
        const dispatcher = createLitDispatcher();
        const callback = jest.fn();
        dispatcher.on('test-event', callback);
        dispatcher.on('test-event', callback);
        dispatcher.dispatch('test-event');

        expect(callback).toBeCalledTimes(1);
    });
});
