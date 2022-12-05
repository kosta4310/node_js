import { Transform } from "node:stream";
import { EOL } from "node:os";
import { stdin, stdout } from "node:process";

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, callback) {
      callback(null, String(chunk).trim().split("").reverse().join("") + EOL);
    },
  });

  stdin.pipe(transformStream).pipe(stdout);
};

await transform();
