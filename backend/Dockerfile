FROM python:3.10
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
ENV DATABASE_URL="mysql+pymysql://root:Tfpihwabci02!@server.ryanbwilson.com/katywroteablog"
EXPOSE 8080
COPY . .
CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:8080", "-t 30"]