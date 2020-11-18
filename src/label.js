const github = require('@actions/github');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');

const repositoryToken = 'repo-token';
const token = getInput.getToken(repositoryToken);
const octokit = githubHelper.createClient(token);

async function createTeamLabel(label, color) {
  const labelParams = {
    ...github.context.repo,
    name: label,
  };

  const result = await octokit.issues.getLabel(labelParams).then(() => {
    console.log('getLabel');
  });

  if (result.name !== label) {
    const params = {
      ...github.context.repo,
      name: label,
      color,
    };

    await octokit.issues.createLabel(params).then(() => {
      console.log('createLabel');
    });
  }
}

async function addTeamLabel(members, prAuthor, label, prNumber, color) {
  if (members.includes(prAuthor)) {
    await createTeamLabel(label, color);
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
