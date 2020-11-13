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

  const result = octokit.issues.getLabel(labelParams).catch((e) => {
    console.log('CREATE TEAM LABEL', e.message);
  });

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
    const labelsToAdd = [];
    labelsToAdd.push(label);
    octokit.issues
      .addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: labelsToAdd,
      })
      .catch((e) => {
        console.log(e.message);
      });
      // .then(() => {
      //   console.log(
      //     `These labels were added automatically: ${labelsToAdd.join(', ')}.`,
      //   );
      // });
  } // else {
  //   console.log('No label was added.');
  // }
}

module.exports = {
  createTeamLabel,
  addTeamLabel,
};
