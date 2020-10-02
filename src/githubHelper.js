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

function validateContext() {
  const contextPullRequest = github.context.payload.pull_request;
  console.log(contextPullRequest.base.repo);
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }
}

module.exports = { getPrNumber, getPrAuthor, createClient, validateContext };