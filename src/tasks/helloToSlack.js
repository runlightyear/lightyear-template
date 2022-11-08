import { defineTask } from "@bigidea/integration";
import { Slack } from "@bigidea/slack";

defineTask({
  name: "helloSlack",
  description: "Send a message to Slack",
  auths: {
    slack: Slack.defineAuth({
      name: "slack",
    }),
  },
  run: async ({ auths }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: "#general", // <-- you might want to change this!
      text: "Hello Slack!",
    });
  },
});
