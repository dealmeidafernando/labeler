const core = require('@actions/core');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');
const label = require('./label');
const size = require('./size');

const teamOne = 'membersTeam1';
const labelTeamOne = 'labelTeam1';
const colorTeamOne = '7c0dc1';

try {
  githubHelper.validateContext();

  size.size();

  const prNumber = githubHelper.getPrNumber();

  const membersTeam1 = getInput.getTeam(teamOne);
  const labelTeam1 = getInput.getLabelTeam(labelTeamOne);
  const prAuthor = githubHelper.getPrAuthor();

  label.createTeamLabel(labelTeam1, colorTeamOne);
  label.addTeamLabel(membersTeam1, prAuthor, labelTeam1, prNumber);
} catch (e) {
  core.setFailed(e.message);
}
