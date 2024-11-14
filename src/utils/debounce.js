export function debounce(f, t) {
  return function (...args) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => f(...args), t);
  };
}
