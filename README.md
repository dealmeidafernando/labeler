# labeler

- Create a `.yml` file under `.github/workflow/your-file.yml`

Example:

```yml
name: Add label on pull request
on:
  pull_request:
    types: [opened]

jobs:
  Add-label-on-pull-request:
    runs-on: ubuntu-latest
    steps:
      - name: Add label on pull request
        uses: dealmeidafernando/labeler
        with:
          membersTeam1: dealmeidafernando; dantunesd
          labelTeam1: labelName
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
