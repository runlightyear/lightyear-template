import { Github } from "@runlightyear/github";
import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

const githubWebhook = Github.defineWebhook({
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
  name: "githubPushToSlack",
  title: "GitHub push to Slack",
  trigger: {
    webhook: githubWebhook,
  },
  apps: ["slack"],
  variables: ["channel"],
  run: async ({ data, auths, variables }) => {
    const pushData = Github.parsePushPayload(data);

    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: variables.channel,
      text: `Got push event on repo: ${pushData.repo}`,
    });
  },
});
