#!/bin/bash
# Relative directory path between the calling directory and this file.
binpath="$( dirname -- "$0"; )";
# Apply deploy.gitignore to file list obtained from git ls-files.
PARMS=()
IFS=$'\n' read -d '' -r -a args < "${binpath}/../.deployignore"
for i in "${!args[@]}"; do
    PARMS+=(":!:${args[$i]}")
done
# Append to list of repository file names we want to deploy.
# This list will be used during CI/CD steps to determine what gets zipped up and sent to the server.
if [ -f "${binpath}/../chosen.log" ]
then rm "${binpath}/../chosen.log"
fi
find $(composer config vendor-dir) -type f > "${binpath}/../chosen.log"
git ls-files --directory --no-empty-directory -- "${PARMS[@]}" >> "${binpath}/../chosen.log"
cat "${binpath}/../.deploy" >> "${binpath}/../chosen.log"
# Create payload.
zip --logfile-path deployed.log --log-info --must-match --recurse-paths -X -9 --names-stdin app.zip < "${binpath}/../chosen.log"
