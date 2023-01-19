import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

defineAction({
  name: "helloSlack",
  title: "Hello Slack",
  description: "Send a message to Slack",
  apps: ["slack"],
  run: async ({ auths }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: "#general", // <-- you might want to change this!
      text: "Hello Slack!",
    });
  },
});
