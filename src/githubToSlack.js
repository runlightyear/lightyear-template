import { GitHub } from "@runlightyear/github";
import { Slack } from "@runlightyear/slack";

const GITHUB_OWNER = "owner";
const GITHUB_REPO = "repo";
const SLACK_CHANNEL = "#general";

GitHub.onPush({
  name: "githubToSlack",
  title: "GitHub to Slack",
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  apps: ["slack"],
  run: async ({ data, auths }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: SLACK_CHANNEL,
      text: `Got push event on repo: ${data.repository.fullName}`,
    });

    console.info("Posted message to Slack");
  },
});
