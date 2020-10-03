const { context } = require("@actions/github/lib/utils");

const githubHelper = require('./githubHelper');
const getInput = require('./getInput');

const repositoryToken = 'repo-token';
const token = getInput.getToken(repositoryToken);
const octokit = githubHelper.createClient(token);


const label = {
  XS: 'size/XS',
  S: 'size/S',
  M: 'size/M',
  L: 'size/L',
  XL: 'size/XL',
  XXL: 'size/XXL',
}

const colors = {
  'size/XS': '3CBF00',
  'size/S': '5D9801',
  'size/M': '7F7203',
  'size/L': 'A14C05',
  'size/XL': 'C32607',
  'size/XXL': 'E50009'
}

const sizes = {
  S: 10,
  M: 30,
  L: 100,
  Xl: 500,
  Xxl: 1000
}

function sizeLabel(lineCount) {
  switch (lineCount) {
    case (lineCount < sizes.S):
      return label.XS;
    case (lineCount < sizes.M):
      return label.S;
    case (lineCount < sizes.L):
      return label.M;
    case (lineCount < sizes.Xl):
      return label.L;
    case (lineCount < sizes.Xxl):
      return label.XL;

    default:
      return label.XXL;
  }
}

async function size() {
  const pullRequest = context.payload.pull_request;
  const { owner: { login: owner }, name: repo } = pullRequest.base.repo;
  const { number } = pullRequest;
  // let { additions, deletions } = pullRequest;

  // const res = await context.github.pullRequests.listFiles({owner, repo, number})

  const res = await octokit.pulls.listFiles({ owner, repo, number }).catch(error => { throw error});

  console.log('PULL =>', pullRequest);
  console.log(res);
}

module.exports = { size };