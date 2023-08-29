import { GitHub } from "@runlightyear/github";
import { Slack } from "@runlightyear/slack";
import { getEnvName } from "@runlightyear/lightyear";

const envName = getEnvName();

const GITHUB_OWNER = "owner"; // The account owner of the repository. The name is not case sensitive.
const GITHUB_REPO = "repo"; // The name of the repository without the .git extension. The name is not case sensitive.
const SLACK_CHANNEL = "#general"; // The Slack channel to post messages in.

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
      text: `[${envName}] Got push event on repo: ${data.repository.fullName}`,
    });

    console.info("Posted message to Slack");
  },
});
