const github = require('@actions/github');

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

function getPrAuthor() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.user.login;
}

function createClient(token) {
  const octokit = github.getOctokit(token);
  return octokit;
}

module.exports = { getPrNumber, getPrAuthor, createClient };