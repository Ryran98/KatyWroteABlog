# Backend server

## Local setup

### Downloads

First you will need to download and install [python](https://www.python.org/downloads/). Would recommend the latest version, although if you are having issues, you may need to check version compatibility with various other packages such as SQLAlchemy, Flask etc

### Virtual environment

From the backend directory, run the following bash command:

```
source env/Scripts/activate
```

This will start the virtual python environment

You will also need to run a small script to set the required environment variables for the app to run:

```
. setup.sh
```

### Installing packages

You will then need to install all of the required packages to run the backend server:

```
pip install -r requirements.txt
```

### Local testing

Once the virtual environment is setup and the packages are all installed, you can run the flask backend with the following command:

```
py app.py
```



## Database Migrations

Flask-Migrate is used to manage any scheme changes and resulting database migrations. The documentation can be found [here](https://flask-migrate.readthedocs.io/en/latest/)

After making a change to a database model (models.py), you will need to create a new migration:

```
flask db migrate -m "~migration name~"
```

You can then apply this to the database itself using 

```
flask db upgrade
```

A list of other Flask-Migrate commands can be found with:

```
flask db --help
```

## Deployment

Deployment for frontend and backend was based on [this guide](https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4)

### To-Do

- Set up docker image
- Install ubuntu on laptop test server
- Test deployment to test server
- Purchase ionos ubuntu web server (cheapest option)
- Transfer domain from GoDaddy

https://stavshamir.github.io/python/dockerizing-a-flask-mysql-app-with-docker-compose/
https://docs.docker.com/compose/install/
