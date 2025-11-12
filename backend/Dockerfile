FROM ruby:3.2-slim

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  libpq5 \
  libyaml-dev \
  libyaml-0-2 \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle config set deployment 'true' \
  && bundle config set without 'development test' \
  && bundle install

COPY . .


ENV RAILS_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bash","-lc","bundle exec rails db:migrate && bundle exec rails server -e production -b 0.0.0.0 -p=$PORT"]
