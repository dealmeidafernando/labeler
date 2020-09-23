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

  labelsToAdd = [];
  labelsToAdd.push(label);

  if (labelsToAdd.length > 0) {
    octokit.issues
      .addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: labelsToAdd,
      })
      .then(() => {
        console.log(
          `These labels were added automatically: ${labelsToAdd.join(", ")}.`
        );
      });
  } else {
    console.log("No label was added.");
  }

} catch (e) {
  core.setFailed(e.message);
}

