const core = require('@actions/core');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');
const label = require('./label');

const teamOne = 'membersTeam1';
const labelTeamOne = 'labelTeam1';
const colorTeamOne = '7c0dc1';

async function run() {
  try {
    githubHelper.validateContext();

    const prNumber = githubHelper.getPrNumber();

    const membersTeam1 = getInput.getTeam(teamOne);
    const labelTeam1 = getInput.getLabelTeam(labelTeamOne);
    const prAuthor = githubHelper.getPrAuthor();

    await label.createTeamLabel(labelTeam1, colorTeamOne);
    await label.addTeamLabel(membersTeam1, prAuthor, labelTeam1, prNumber);
    await label.addAssignees([prAuthor], prNumber);
    // TODO: add reviewers to PR
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();