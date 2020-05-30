type RegisterCallback = (callback: Function) => void;
type UnregisterCallback = (callback: Function) => void;
type Fire = (data: any) => void;
type LitDispatcherEvent = {
    callbacks: Function[];
    registerCallback: RegisterCallback;
    unregisterCallback: UnregisterCallback;
    fire: Fire;
};

function createLitDispatcherEvent(): LitDispatcherEvent {
    const callbacks: Function[] = [];

    const registerCallback: RegisterCallback = (callback) => {
        callbacks.push(callback);
    };

    const unregisterCallback: UnregisterCallback = (callback) => {
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    };

    const fire: Fire = (data) => {
        // We loop over a cloned version of the callbacks array
        // in case the original array is spliced while looping
        const clonedCallbacks = [...callbacks];

        clonedCallbacks.forEach((callback) => {
            callback(data);
        });
    };

    return {
        callbacks,
        registerCallback,
        unregisterCallback,
        fire,
    };
}
/**
 * Create a dispatcher instance.
 */
export default function createLitDispatcher() {
    const events: { [key: string]: LitDispatcherEvent } = {};

    /**
     * Dispatch an event with some optional data
     *
     * @param  {string} eventName
     * @param  {any} data
     */
    function dispatch<T = any>(eventName: string, data?: T) {
        const event = events[eventName];

        if (event) {
            event.fire(data);
        }
    }

    /**
     * Subscribe to an event
     *
     * @param  {string} eventName
     * @param  {Function} callback
     */
    function on(eventName: string, callback: (data?: any) => void) {
        let event = events[eventName] as LitDispatcherEvent | undefined;

        if (!event) {
            event = createLitDispatcherEvent();
            events[eventName] = event;
        }

        if (!event.callbacks.find((cb) => cb === callback)) {
            event.registerCallback(callback);
        }
    }

    /**
     * Unsubscribe method.
     *
     * If both 'eventName' and 'callback' are provided,
     * unregister a specified callback only.
     *
     * If only 'eventName' is provided,
     * unregister all callbacks for this particular event.
     *
     * If no arguments provided - unregister all callbacks
     * (basically, destroy the dispatcher).
     *
     * @param  {string} eventName
     * @param  {Function} callback
     */
    function off(eventName?: string, callback?: Function) {
        if (eventName) {
            const event = events[eventName];

            if (callback) {
                if (event?.callbacks.indexOf(callback) > -1) {
                    event.unregisterCallback(callback);

                    if (event.callbacks.length === 0) {
                        delete events[eventName];
                    }
                }
            } else {
                delete events[eventName];
            }
        } else {
            Object.keys(events).forEach((event) => {
                delete events[event];
            });
        }
    }

    /**
     * Subscribe to an event and unsubscribe on first execution
     *
     * @param  {string} eventName
     * @param  {Function} callback
     */
    function once(eventName: string, callback: (data?: any) => void) {
        on(eventName, function fn(...args) {
            off(eventName, fn);
            callback(...args);
        });
    }

    return { on, off, once, dispatch };
}
