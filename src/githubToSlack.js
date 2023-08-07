import { GitHub } from "@runlightyear/github";
import { Slack } from "@runlightyear/slack";
import { getEnvName } from "@runlightyear/lightyear";

let GITHUB_OWNER, GITHUB_REPO, SLACK_CHANNEL;

if (getEnvName() === "dev") {
  GITHUB_OWNER = "owner";
  GITHUB_REPO = "repo";
  SLACK_CHANNEL = "#general";
} else if (getEnvName() === "prod") {
  GITHUB_OWNER = "owner";
  GITHUB_REPO = "repo";
  SLACK_CHANNEL = "#general";
}

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
