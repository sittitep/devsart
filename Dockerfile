FROM ruby:2.7-alpine

RUN apk add --no-cache build-base gcc bash cmake

ENV INSTALL_PATH /devsart

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

COPY . ./

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0"]
