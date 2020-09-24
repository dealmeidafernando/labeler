const core = require('@actions/core');
const github = require('@actions/github');

const DLM = ";";

try {
  const contextPullRequest = github.context.payload.pull_request;
  console.log(contextPullRequest.head.user.login);
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }

  const prNumber = contextPullRequest.number;

  // Get injected inputs
  const token = core.getInput('repo-token');
  // const team1 = core.getInput('team1');
  const membersTeam1 = core.getInput('membersTeam1').split(DLM);
  const labelTeam1 = core.getInput('labelTeam1');

  const octokit = github.getOctokit(token);

  const currentUser = contextPullRequest.head.user.login;

  if (membersTeam1.includes(currentUser)) {
    labelsToAdd = [];
    labelsToAdd.push(labelTeam1);
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

  // if (labelsToAdd.length > 0) {
  //   octokit.issues
  //     .addLabels({
  //       ...github.context.repo,
  //       issue_number: prNumber,
  //       labels: labelsToAdd,
  //     })
  //     .then(() => {
  //       console.log(
  //         `These labels were added automatically: ${labelsToAdd.join(", ")}.`
  //       );
  //     });
  // } else {
  //   console.log("No label was added.");
  // }

} catch (e) {
  core.setFailed(e.message);
}

