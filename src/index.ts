import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import { getDirname } from "./utils/getDirname";

const __dirname = getDirname(import.meta.url);

console.log(__dirname);
console.log("hello from master");

const server = http
  .createServer((req, res) => {
    res.end("hello from server");
  })
  .listen(4000, () => console.log("server is running on port 4000"));

server.on("error", () => console.log("error"));
server.on("close", () => console.log("close"));
