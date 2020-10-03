const { context } = require("@actions/github/lib/utils");
const github = require('@actions/github');
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

// async function getCustomGeneratedFiles () { // TODO: think this func
//   const pullRequest = context.payload.pull_request;
//   const { owner: { login: owner }, name: repo } = pullRequest.base.repo;
//   let files = []
//   const path = ".gitattributes"

//   let response;
//   try {
//     response = await octokit.repos.getContent({owner, repo, path});
//     console.log('RESPONSE ==>', response);
//   } catch (e) {
//     return files;
//   }

//   const buff = Buffer.from(response.data.content, 'base64');
//   const lines = buff.toString('ascii').split("\n")

//   lines.forEach(function(item) {
//     if (item.includes("linguist-generated=true")) {
//       files.push(item.split(" ")[0])
//     }
//   })
//   console.log('FILES ==>', files);
//   return files;
// }

async function size() {
  const pullRequest = context.payload.pull_request;
  const { owner: { login: owner }, name: repo } = pullRequest.base.repo;
  const { number } = pullRequest;
  // const { labels } = context.payload.pull_request;
  let { additions, deletions } = pullRequest;

  // var res = await octokit.pulls.listFiles({ owner: owner, repo: repo, pull_number: number }).catch((e) => { console.error(e.message) });

  var labelToAdd = sizeLabel(additions + deletions);

  // size/XS
  pullRequest.labels.forEach((prLabel) => {
    if(Object.values(label).includes(prLabel.name)) {
      if (prLabel.name != labelToAdd) {
        octokit.issues.removeLabel({
          ...github.context.repo,
          name: prLabel.name,
        });
      }
    }
  });

  // TODO: add Label
}

module.exports = { size };