import { GitHub } from "@runlightyear/github";
import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

const githubWebhook = GitHub.defineWebhook({
  name: "githubWebhook",
  title: "GitHub Webhook",
  variables: ["owner", "repo"],
  subscribeProps: ({ variables }) => {
    return {
      owner: variables.owner,
      repo: variables.repo,
      events: ["push"],
    };
  },
});

defineAction({
  name: "githubToSlack",
  title: "GitHub to Slack",
  trigger: {
    webhook: githubWebhook,
  },
  apps: ["slack"],
  variables: ["channel"],
  run: async ({ data, auths, variables }) => {
    const pushPayload = GitHub.asPushPayload(data);

    if (pushPayload) {
      console.info("Got a push payload");

      const slack = new Slack({ auth: auths.slack });

      await slack.postMessage({
        channel: variables.channel,
        text: `Got push event on repo: ${pushPayload.repository.fullName}`,
      });

      console.info("Posted message to Slack");
    }
  },
});
