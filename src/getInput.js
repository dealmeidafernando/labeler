const core = require('@actions/core');

const DLM = ";";

function getToken(token) {
  return core.getInput(token);
}

function getTeam(team) {
  return core.getInput(team).split(DLM);
}

function getLabelTeam(label) {
  return core.getInput(label);
}

module.exports = { getToken, getTeam, getLabelTeam }