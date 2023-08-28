import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

defineAction({
  name: "helloSlack",
  title: "Hello Slack",
  apps: ["slack"],
  run: async ({ auths }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: "#general", // <-- you might want to change this!
      text: "Hello Slack!",
    });

    console.info("Posted message to Slack");
  },
});
