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

  const result = octokit.issues.getLabel(labelParams).then(() => {
    console.log('getLabel');
  });

  if (result.name !== label) {
    const params = {
      ...github.context.repo,
      name: label,
      color,
    };

    octokit.issues.createLabel(params).then(() => {
      console.log('createLabel');
    });
  }
}

function addTeamLabel(members, prAuthor, label, prNumber, color) {
  if (members.includes(prAuthor)) {
    createTeamLabel(label, color);
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

module.exports = { createTeamLabel, addTeamLabel };
