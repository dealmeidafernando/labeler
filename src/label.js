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

  if (!result.name === label) {
    const params = {
      ...github.context.repo,
      name: label,
      color,
      description: `team ${label}`,
    };

    octokit.issues.createLabel(params);
  } else {
    console.log(`label to team ${label} already exists`);
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
      .then(() => {
        console.log(
          `These labels were added automatically: ${labelsToAdd.join(', ')}.`,
        );
      });
  } else {
    console.log('No label was added.');
  }
}

async function createSizeLabel(label, color) {
  const labelParams = {
    ...github.context.repo,
    name: label,
  };

  const result = await octokit.issues.getLabel(labelParams);

  if (result) {
    const params = {
      ...github.context.repo,
      name: label,
      color,
      description: 'label size',
    };

    octokit.issues.createLabel(params);
  } else {
    console.log(`label ${label} already exists`);
  }
  // try {
  //   return octokit.issues.getLabel(labelParams);
  // } catch (e) {
  //   return octokit.issues.createLabel(params);
  // }
}

async function addSizeLabel(label) {
  const labelParams = {
    ...github.context.issue,
    labels: [label],
  };

  await octokit.issues.addLabels(labelParams).then(() => {
    console.log(`These labels were added automatically: ${label.join(', ')}.`);
  });
}

module.exports = {
  createTeamLabel,
  addTeamLabel,
  createSizeLabel,
  addSizeLabel,
};
