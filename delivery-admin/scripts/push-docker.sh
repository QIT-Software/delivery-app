#!/bin/bash

server='gcr.io'
projectId='spoon-and-fork-4db98'

defaultVersion='1.0'

read -r -p "Enter version [$defaultVersion] (press enter for default): " version

version=${version:-$defaultVersion}

while read -r -p 'Enter sprint: ' sprint && [[ -z "$sprint" ]] ; do
   echo "Please enter sprint!"
done

read -r -p 'Enter tag (for example dev1 or fix1, or leave empty): ' tag

if [ "$tag" != '' ]
then
  tag="-$tag"
fi

productionImage='spoon-and-fork-admin'
stagingImage='spoon-and-fork-admin-staging'
imageTag="$version-sprint$sprint$tag"

echo "Docker production image name: $productionImage:$imageTag"
echo "Docker staging image name: $stagingImage:$imageTag"

echo "Please, dont forget to call 'gcloud auth configure-docker' command first time you use this script"

set +x
docker "tag" "$productionImage" "$server/$projectId/$productionImage:$imageTag"
docker "push" "$server/$projectId/$productionImage:$imageTag"

docker "tag" "$stagingImage" "$server/$projectId/$stagingImage:$imageTag"
docker "push" "$server/$projectId/$stagingImage:$imageTag"
