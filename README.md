**Current state of the app (29-06-2024)**

- I can run the app locally running `docker-compose up --build`, from the root of the repo.
- I can deploy the app to `eb aws` following these steps:
	- Create `Test-env` as aws elastic beanstalk environment (docker).
	- Configure the environment, from terminal, to accept `ssh` connection.
		- `eb ssh Test-env`
		- The environment will restart to apply the changes.
	- Run github workflow `db-workflow.yaml`, manually from `react-project` repo on github.
	- Connect `eb ssh Test-env` to check that all 4 containers are running with `sudo docker ps`
	- Check that you can access the login from the new eb environment `url`

**TODO**
- Define configuration in the repo for `hosts variables`, so that I do not have to change manually in:
	- nginx
	- backend
	- frontend

- Check why I cannot login the app from `eb url`, accessing the containers...
	- `docker exec -it <container_id_or_name> bash`
- ...and then trying to send a curl to another container. Test with several host names to see what is the correct one, and add it to the code environment variables (configuration)
- Put data on `database` service from the `docker compose` services. 
    - Use a `named volume` so that the data persists, without depending on docker container restarts.
    - Use `ssh` and `port forwarding` to make it easier, from `dbeaver`.