import { defineAction, defineWebhook } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

defineAction({
  name: "webhookSlack",
  title: "Webhook to Slack",
  apps: ["slack"],
  trigger: {
    webhook: defineWebhook({
      name: "slackWebhook",
      title: "Slack Webhook",
    }),
  },
  run: async ({ auths }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: "#general", // <-- you might want to change this!
      text: "Triggered by a webhook",
    });
  },
});
