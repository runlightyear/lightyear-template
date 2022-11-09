import { defineAction } from "@runlightyear/lightyear";

defineAction({
  name: "helloWorld",
  run: async () => {
    console.log("Hello World!");
  },
});
