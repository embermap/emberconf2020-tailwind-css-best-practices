// Exercise 1: Basic
import { Server } from "miragejs";

export default function makeServer() {
  return new Server({
    routes() {
      this.get("/movies", () => {
        return {
          movies: [
            { id: 1, name: "Inception", year: 2010 },
            { id: 2, name: "Interstellar", year: 2014 },
            { id: 3, name: "Dunkirk", year: 2017 }
          ]
        };
      });
    }
  });
}
