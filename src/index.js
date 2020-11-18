const core = require('@actions/core');
const githubHelper = require('./githubHelper');
const getInput = require('./getInput');
const label = require('./label');

const teamsArray = [
  {
    members: 'teamOneMembers',
    labelName: 'teamOneLabel',
    labelColor: 'ffce00',
  },
  {
    members: 'teamTwoMembers',
    labelName: 'teamTwoLabel',
    labelColor: '5b0589',
  },
];

let members;
let teamLabel;

try {
  githubHelper.validateContext();

  const prNumber = githubHelper.getPrNumber();
  const prAuthor = githubHelper.getPrAuthor();

  teamsArray.forEach((team) => {
    members = getInput.getTeam(team.members);
    teamLabel = getInput.getLabelTeam(team.labelName);
    // label.createTeamLabel(teamLabel, team.labelColor);
    label.addTeamLabel(members, prAuthor, teamLabel, prNumber, team.labelColor);
  });
} catch (e) {
  core.setFailed(e.message);
}
