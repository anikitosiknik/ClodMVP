export function getHref() {
    return isLocal() ? 'https://localhost:3002/app' : '/app';
}

function isLocal() {
    return window.location.href.includes('localhost')
}