README here

# LitDispatcher

## A lightweight (< 1kb gzipped) dispatcher. Written in TypeScript.

## Installation

Install it from NPM:
`npm i lit-dispatcher`

## Usage

```javascript
import createLitDispatcher from 'lit-dispatcher';

const dispatcher = createLitDispatcher();

// Usage Example
dispatcher.on('my-event', ({ customData }) => {
    // ...
});

// Somewhere in the code
dispatcher.dispatch('my-event', { customData: 'value' });
```

## API

### Methods

| Method   | Parameters                                                 | Description                                                                                                                                                                                                                                                                              |
| -------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| on       | (`eventName`: string, `callback`: (`data`: any) => void)   | Subscribe to an event                                                                                                                                                                                                                                                                    |
| off      | (`eventName`?: string, `callback`?: (`data`: any) => void) | Unsubscribe method. If both `eventName` and `callback` are provided, unregister a specified callback only. If only `eventName` is provided, unregister all callbacks for this particular event. If no arguments provided - unregister all callbacks (basically, destroy the dispatcher). |
| dispatch | (`eventName`: string, `data`?: any)                        | Dispatch an event with optional data                                                                                                                                                                                                                                                     |
