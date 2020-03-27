/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function n(){var n=[];return{callbacks:n,registerCallback:function(e){n.push(e)},unregisterCallback:function(e){var r=n.indexOf(e);r>-1&&n.splice(r,1)},fire:function(e){(function(){for(var n=0,e=0,r=arguments.length;e<r;e++)n+=arguments[e].length;var t=Array(n),a=0;for(e=0;e<r;e++)for(var c=arguments[e],l=0,f=c.length;l<f;l++,a++)t[a]=c[l];return t})(n).forEach((function(n){n(e)}))}}}export default function(){var e={};return{on:function(r,t){var a=e[r];a||(a=n(),e[r]=a),a.callbacks.find((function(n){return n===t}))||a.registerCallback(t)},off:function(n,r){if(n){var t=e[n];r?(null==t?void 0:t.callbacks.indexOf(r))>-1&&(t.unregisterCallback(r),0===t.callbacks.length&&delete e[n]):delete e[n]}else Object.keys(e).forEach((function(n){delete e[n]}))},dispatch:function(n,r){var t=e[n];t&&t.fire(r)}}}
