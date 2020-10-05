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

function createSizeLabel(label, color) {
  const labelParams = {
    ...github.context.repo,
    name: label,
  };

  // octokit.issues.getLabel(labelParams).catch((e) => {
  //   console.error(e.message);
  // });

  const params = {
    ...github.context.repo,
    name: label,
    color,
  };

  // octokit.issues.createLabel(params).catch((e) => {
  //   console.error(e.message);
  // });

  try {
    return octokit.issues.getLabel(labelParams);
  } catch (e) {
    return octokit.issues.createLabel(params);
  }
}

function addSizeLabel(label) {
  // const labelParams = {
  //   ...github.context.issue,
  //   labels: [label],
  // };

  const { number } = github.context.issue;

  octokit.issues
    .addLabels({
      ...github.context.repo,
      issue_number: number,
      labels: [label],
    })
    .catch((e) => {
      console.error(e.message);
    });

  // octokit.issues.addLabels(labelParams).catch((e) => {
  //   console.error(e.message);
  // });
}

module.exports = {
  createTeamLabel,
  addTeamLabel,
  createSizeLabel,
  addSizeLabel,
};
