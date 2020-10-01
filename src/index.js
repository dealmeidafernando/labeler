const core = require('@actions/core');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');
const label = require('./label');
const github = require('@actions/github');

// const repositoryToken = 'repo-token';
const teamOne = 'membersTeam1';
const labelTeamOne = 'labelTeam1';
const colorTeamOne = '7c0dc1';

try {
  const contextPullRequest = github.context.payload.pull_request;
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }

  const prNumber = githubHelper.getPrNumber();

  // const token = getInput.getToken(repositoryToken);
  const membersTeam1 = getInput.getTeam(teamOne);
  const labelTeam1 = getInput.getTeam(labelTeamOne);

  // const octokit = githubHelper.createClient(token);

  label.existsLabel(labelTeam1, colorTeamOne);

  label.createTeamLabel(membersTeam1, prAuthor, labelTeamOne, prNumber);
  // let label = {
  //   ...github.context.repo,
  //   name: labelTeam1
  // }

  // const result = octokit.issues.getLabel(label);

  // label.existsLabel(result, )
  // if (!result.name === labelTeam1.toLowerCase()) {
  //   let params = {
  //     ...github.context.repo,
  //     name: labelTeam1,
  //     color: '7c0dc1',
  //     description: `team ${labelTeam1}`
  //   }
  //   octokit.issues.createLabel(params);
  // } else {
  //   console.log(`label to team ${labelTeam1} already exists`);
  // }

  const prAuthor = githubHelper.getPrAuthor();

  // if (membersTeam1.includes(prAuthor)) {
  //   labelsToAdd = [];
  //   labelsToAdd.push(labelTeam1);
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