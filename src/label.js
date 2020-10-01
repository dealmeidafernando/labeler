const github = require('@actions/github');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');

const repositoryToken = 'repo-token';
const token = getInput.getToken(repositoryToken);
const octokit = githubHelper.createClient(token);

function createTeamLabel(label, color) {
  let labelParams = {
    ...github.context.repo,
    name: label
  }

  const result = octokit.issues.getLabel(labelParams);

  if (!result.name === label) {
    let params = {
      ...github.context.repo,
      name: label,
      color: color,
      description: `team ${label}`
    }

    octokit.issues.createLabel(params);

  } else {
    console.log(`label to team ${label} already exists`);
  }
}

function addTeamLabel(members, prAuthor, label, prNumber) {
  if (members.includes(prAuthor)) {
    labelsToAdd = [];
    labelsToAdd.push(label[0]);
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
}

module.exports = { createTeamLabel, addTeamLabel };