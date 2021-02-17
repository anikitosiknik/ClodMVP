export function getHref() {
    return isLocal() ? '/app' : '/app';
}

function isLocal() {
    return window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
}