const github = require('@actions/github');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');

const repositoryToken = 'repo-token';
const token = getInput.getToken(repositoryToken);
const octokit = githubHelper.createClient(token);

async function createTeamLabel(label, color) {
  let labelParams = {
    ...github.context.repo,
    name: label
  }

  try {
    console.log(`Checking if label exists with params: ${JSON.stringify(labelParams)}`);
    const result = await octokit.issues.getLabel(labelParams);

    if (result.data.name !== label) {
      let params = {
        ...github.context.repo,
        name: label,
        color: color,
        description: `team ${label}`
      }

      await octokit.issues.createLabel(params);
      console.log(`Label ${label} created successfully.`);
    } else {
      console.log(`Label ${label} already exists.`);
    }
  } catch (error) {
    if (error.status === 404) {
      // Label does not exist, create it
      let params = {
        ...github.context.repo,
        name: label,
        color: color,
        description: `team ${label}`
      }

      try {
        await octokit.issues.createLabel(params);
        console.log(`Label ${label} created successfully.`);
      } catch (createError) {
        console.error(`Failed to create label ${label}: ${createError.message}`);
      }
    } else {
      console.error(`Failed to get label ${label}: ${error.message}`);
    }
  }
}

async function addTeamLabel(members, prAuthor, label, prNumber) {
  if (members.includes(prAuthor)) {
    let labelsToAdd = [];
    labelsToAdd.push(label);
    try {
      await octokit.issues.addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: labelsToAdd,
      });
      console.log(`These labels were added automatically: ${labelsToAdd.join(", ")}.`);
    } catch (error) {
      console.error(`Failed to add labels: ${error.message}`);
    }
  } else {
    console.log(`PR author ${prAuthor} is not a member of the team. Please, add on the team.`);
  }
}

async function addReviewers(reviewers, prNumber) {
  try {
    await octokit.pulls.requestReviewers({
      ...github.context.repo,
      pull_number: prNumber,
      reviewers: reviewers,
    });
    console.log(`These reviewers were added automatically: ${reviewers.join(", ")}.`);
  } catch (error) {
    console.error(`Failed to add reviewers: ${error.message}`);
  }
}

async function addAssignees(assignees, prNumber) {
  try {
    await octokit.issues.addAssignees({
      ...github.context.repo,
      issue_number: prNumber,
      assignees: assignees,
    });
    console.log(`These assignees were added automatically: ${assignees.join(", ")}.`);
  } catch (error) {
    console.error(`Failed to add assignees: ${error.message}`);
  }
}

module.exports = { createTeamLabel, addTeamLabel, addReviewers, addAssignees };