import {FunctionComponent} from "react";

export const About: FunctionComponent = () =>  {
  return (
    <p>
      This has been a fun project, currently it has over 17 million unique and valid domain names.
      Those unique domains are spread across 60,000 unique list versions with a total of 5.8 billion entries.
      Storing all lists would be very inefficient and infeasible for such a small toy project,
      but being able to search all the versions was a key feature I wanted.
      I designed it to store only the differences in each list version. This means even if a list has a million entries,
      a new version of that list would only require a few hundred entries to generate the difference. Using the diffs,
      I can still generate the full list for any given version without having to save the entire list.
      New versions are added daily and currently only uses 21 GB. You might be curious where I got 60,000 unique versions from.
      The majority of these lists are served on Github, so it was just a simple matter of walking the Git history
      and throwing out any trivial commits.
      See <a href="https://github.com/blocklist-tools/github-history-generator">github-history-generator</a> Enjoy!
    </p>
  )
}
