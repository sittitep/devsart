FROM ruby:2.7-alpine

RUN apk add --no-cache build-base gcc bash cmake npm yarn

ENV INSTALL_PATH /devsart

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

COPY . ./

RUN npm install
RUN yarn run build

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0"]
