const github = require('@actions/github');

function getPrNumber() {
  return github.context.payload.pull_request.number;
}

function getPrAuthor() {
  return github.context.payload.pull_request.user.login;
}

function createClient(token) {
  return github.getOctokit(token);
}

async function validateContext() {
  const contextPullRequest = github.context.payload.pull_request;
  if (!contextPullRequest) {
    throw new Error(
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred`,
    );
  }
}

module.exports = { getPrNumber, getPrAuthor, createClient, validateContext };
