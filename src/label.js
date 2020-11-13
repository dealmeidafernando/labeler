const github = require('@actions/github');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');

const repositoryToken = 'repo-token';
const token = getInput.getToken(repositoryToken);
const octokit = githubHelper.createClient(token);

function createTeamLabel(label, color) {
  const labelParams = {
    ...github.context.repo,
    name: label,
  };

  const result = octokit.issues.getLabel(labelParams);

  if (result.name !== label) {
    const params = {
      ...github.context.repo,
      name: label,
      color,
    };

    octokit.issues.createLabel(params);
  }
}

function addTeamLabel(members, prAuthor, label, prNumber) {
  if (members.includes(prAuthor)) {
    octokit.issues
      .addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: [label],
      })
      .then(() => {
        console.log(`These labels were added automatically: ${label}`);
      });
  }
}

module.exports = {
  createTeamLabel,
  addTeamLabel,
};
