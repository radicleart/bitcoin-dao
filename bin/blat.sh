#!/bin/bash

sh -c "truncate -s 0 /var/lib/docker/containers/**/*-json.log"
docker system prune -a -f
docker volume rm $(docker volume ls -qf dangling=true)


# see also
# brew upgrade
# brew cleanup --prune=all