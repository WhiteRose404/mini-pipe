FROM python:latest
# Path: flask/Dockerfile

# set working directory
WORKDIR /app

# get the repo
RUN git clone https://github.com/WhiteRose404/hand-writing-back.git /app

# install app dependencies
RUN pip install -r requirement.txt

# expose port
EXPOSE 5000

# start app
CMD ["python", "app.py"]