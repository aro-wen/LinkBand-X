const bus = new EventTarget();
export const on = (type: string, fn: EventListenerOrEventListenerObject) => bus.addEventListener(type, fn);
export const off = (type: string, fn: EventListenerOrEventListenerObject) => bus.removeEventListener(type, fn);
export const emit = (type: string) => bus.dispatchEvent(new Event(type));
export const REFRESH = "manual-refresh";
