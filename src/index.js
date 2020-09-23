const core = require('@actions/core');
const github = require('@actions/github');

try {
  const contextPullRequest = github.context.payload.pull_request;
  console.log(contextPullRequest);
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }

  const prNumber = contextPullRequest.number;
  const label = core.getInput('label')

  // Get injected inputs
  const token = core.getInput('repo-token');

  const octokit = github.getOctokit(token);

  octokit.issues.addLabels({
    ...github.context.repo,
    issue_number: prNumber,
    labels: label,
  })
  .then(() => {
    console.log(
      `These label were added automatically: ${label}`
    );
  });

} catch (e) {
  core.setFailed(e.message);
}

