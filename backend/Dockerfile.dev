FROM ruby:3.2

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libsqlite3-dev \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

RUN chmod +x ./bin/*

ENTRYPOINT ["./entrypoint.sh"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
