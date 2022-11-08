import { defineTask } from "@bigidea/integration";

defineTask({
  name: "helloWorld",
  run: async () => {
    console.log("Hello World!");
  },
});
