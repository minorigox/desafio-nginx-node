FROM node:14

ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - "https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz" | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/* \
    && npm install express --save && npm install mysql --save

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "node", "index.js"]