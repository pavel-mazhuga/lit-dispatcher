/**
 * Create a dispatcher instance.
 */
export default function createLitDispatcher(): {
    on: (eventName: string, callback: (data?: any) => void) => void;
    off: (eventName?: string | undefined, callback?: Function | undefined) => void;
    dispatch: <T = any>(eventName: string, data?: T | undefined) => void;
};
