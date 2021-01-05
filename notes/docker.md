# docker

[Docker - Get Started](https://docs.docker.com/get-started/)

## Start

* `docker container list` or `docker ps`
* `docker stop <container-id>`
* `docker rm <container-id>`

* `docker run -dp 80:80 docker/getting-started`
  * -d - run the container in detached mode (in the background)
  * -p 80:80 - map port 80 of the host to port 80 in the container
  * docker/getting-started - the image to use

* `docker volume create todo-db` use volume to persist data between container creation/deletion
* `docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started`
  * add the -v flag to specify a volume mount.
  * We will use the named volume and mount it to /etc/todos, which will capture all files created at the path.

* ` docker build -t getting-started .`
  * -t tags the image
  * . tells that Docker should look for the Dockerfile in the current directory
