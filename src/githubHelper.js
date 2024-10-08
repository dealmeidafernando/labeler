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
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }
}

function getBranchName() {
  const branchName = github.context.payload.pull_request.head.ref;
  return branchName;
}

module.exports = { getPrNumber, getPrAuthor, createClient, validateContext, getBranchName };