const core = require('@actions/core');
const github = require('@actions/github');

const DLM = ";";

try {
  const contextPullRequest = github.context.payload.pull_request;
  console.log(contextPullRequest);
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }

  const prNumber = contextPullRequest.number;

  // Get injected inputs
  const token = core.getInput('repo-token');
  const membersTeam1 = core.getInput('membersTeam1').split(DLM);
  const labelTeam1 = core.getInput('labelTeam1');

  const octokit = github.getOctokit(token);
  const bla = octokit.issues.listEvents('catho', 'billing_debit-gateway_job', prNumber, 1, 10);
  console.log('BLA ==>', bla);

  const bla2 = octokit.teams.listForAuthenticatedUser(1);
  console.log('BLA ==>', bla2);

  const currentUser = contextPullRequest.user.login;

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
} catch (e) {
  core.setFailed(e.message);
}

