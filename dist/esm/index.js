export default function(){const e={};function c(c,n){let t=e[c];t||(t=function(){const e=[];return{callbacks:e,registerCallback:c=>{e.push(c)},unregisterCallback:c=>{const n=e.indexOf(c);n>-1&&e.splice(n,1)},fire:c=>{[...e].forEach(e=>{e(c)})}}}(),e[c]=t),t.callbacks.find(e=>e===n)||t.registerCallback(n)}function n(c,n){if(c){const t=e[c];n?(null==t?void 0:t.callbacks.indexOf(n))>-1&&(t.unregisterCallback(n),0===t.callbacks.length&&delete e[c]):delete e[c]}else Object.keys(e).forEach(c=>{delete e[c]})}return{on:c,off:n,once:function(e,t){c(e,(function c(...l){n(e,c),t(...l)}))},dispatch:function(c,n){const t=e[c];t&&t.fire(n)}}}
