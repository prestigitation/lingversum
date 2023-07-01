import jest from "jest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: ((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })),
});
