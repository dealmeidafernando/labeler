const core = require('@actions/core');
const github = require('@actions/github');

const DLM = ";";

try {
  const contextPullRequest = github.context.payload.pull_request;
  // console.log(contextPullRequest);
  if (!contextPullRequest) {
    throw new Error (
      `This action can only be invoked in pull_request events. Otherwise the pull request can't be inferred.`
    );
  }

  const prNumber = contextPullRequest.number;

  // Get injected inputs
  const token = core.getInput('repo-token');
  const membersTeam1 = core.getInput('membersTeam1').split(DLM);
  const labelTeam1 = core.getInput('labelTeam1');

  const octokit = github.getOctokit(token);
  // const bla = octokit.teams.listChildInOrg('catho', '')
  // console.log('BLA ==>', bla);
  // octokit.teams.listMembersInOrg({ org: 'catho', team_slug: 'thunderbolts', }) .then(({ data }) => { console.log(data); })
  const bla = octokit.repos.listTeams({ ...github.context.repo }).then(() => {
    console.log(bla);
  });
  console.log(bla);

  const currentUser = contextPullRequest.user.login;

  if (membersTeam1.includes(currentUser)) {
    labelsToAdd = [];
    labelsToAdd.push(labelTeam1);
    octokit.issues
      .addLabels({
        ...github.context.repo,
        issue_number: prNumber,
        labels: labelsToAdd,
      })
      .then(() => {
        console.log(
          `These labels were added automatically: ${labelsToAdd.join(", ")}.`
        );
      });
  } else {
    console.log("No label was added.");
  }
} catch (e) {
  core.setFailed(e.message);
}