export function parse(value = '') {
  if (value.startsWith('=')) {
    const num = +value.slice(-1);
    if (!isNaN(num)) {
      try {
        return eval(value.slice(1));
      } catch (error) {
        console.warn('Parse error', error.message);
      }
    }
  }
  return value;
}
