export FLASK_APP=app.py
export FLASK_DEBUG=True
export innodb_strict_mode=0

# Database strings

    # localhost
# export DATABASE_URL="mysql+pymysql://katy:Tfhiliwn63!@localhost:3306/katywroteablog"
# export DATABASE_URL="mysql+pymysql://root:Tfpihwabci02!@localhost:3306/katywroteablog"

    # ryanwilson-staging
# export DATABASE_URL="mysql+pymysql://ryan.wilson:Tfhibw28spc!@192.168.1.74/katywroteablog"
# export DATABASE_URL="mysql+pymysql://katy:Tfhiliwn63!@192.168.1.74/katywroteablog"

    # AWS EC2 server (Staging)
# export DATABASE_URL="mysql+pymysql://katy:Tfhiliwn63!@ryanbwilson.com/katywroteablog"
export DATABASE_URL="mysql+pymysql://root:Tfpihwabci02!@ryanbwilson.com/katywroteablog"