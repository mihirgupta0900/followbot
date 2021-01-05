import { EventEmitter } from "events";
const END = "\r\n";
const END_LENGTH = 2;

class Stream extends EventEmitter {
  buffer: string;
  constructor() {
    super();
    this.buffer = "";
  }

  parse(buffer: Buffer) {
    this.buffer += buffer.toString("utf8");
    let index;
    let json;

    while ((index = this.buffer.indexOf(END)) > -1) {
      json = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + END_LENGTH);
      if (json.length > 0) {
        try {
          json = JSON.parse(json);
          this.emit(json.event || "data", json);
        } catch (error) {
          error.source = json;
          this.emit("error", error);
        }
      } else {
        this.emit("ping");
      }
    }
  }
}

export default Stream;
