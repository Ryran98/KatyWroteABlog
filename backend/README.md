# Backend server



## Local Setup

### Virtual Environment

From the backend directory, run the following bash command:

```
source env/Scripts/activate
```

This will start the virtual python environment

You will also need to run a small script to set the required environment variables for the app to run:

```
. setup.sh
```

You will then need to install all of the required packages to run the backend server:

```
pip install -r requirements.txt
```

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

### To-Do

- Set up docker image
- Install ubuntu on laptop test server
- Test deployment to test server
- Purchase ionos ubuntu web server (cheapest option)
- Configure domain routing from GoDaddy
