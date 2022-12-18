import { cpus } from "node:os";

export function processorInfo() {
  return cpus().map(({ model, speed }) => {
    return { model, speed: speed / 1000 + "GHz" };
  });
}
