import { sumValues } from "./sum";
export function asnycAdd(values) {
  return new Promise((callback) =>
    setTimeout(() => {
      let total = sumValues(values);
      console.log(`Async Total: ${total}`);
      callback(total);
    }, 10000)
  );
}
