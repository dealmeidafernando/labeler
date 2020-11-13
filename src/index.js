const core = require('@actions/core');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');
const label = require('./label');

const teamOne = 'teamOneMembers';
const labelTeamOne = 'teamOneLabel';
const colorTeamOne = 'FFD200';

const teamTwo = 'teamTwoMembers';
const labelTeamTwo = 'teamTwoLabel';
const colorTeamTwo = '5b0589';

try {
  githubHelper.validateContext();

  const prNumber = githubHelper.getPrNumber();
  const prAuthor = githubHelper.getPrAuthor();

  const teamOneMembers = getInput.getTeam(teamOne);
  const teamOneLabel = getInput.getLabelTeam(labelTeamOne);

  label.createTeamLabel(teamOneLabel, colorTeamOne);
  label.addTeamLabel(teamOneMembers, prAuthor, teamOneLabel, prNumber);

  const teamTwoMembers = getInput.getTeam(teamTwo);
  const teamTwoLabel = getInput.getLabelTeam(labelTeamTwo);

  label.createTeamLabel(teamTwoLabel, colorTeamTwo);
  label.addTeamLabel(teamTwoMembers, prAuthor, teamTwoLabel, prNumber);
} catch (e) {
  core.setFailed(e.message);
}
