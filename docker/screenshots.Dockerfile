# Окружение для скриншотных тестов, идентичное CI.
#
# База — тот же образ, что стоит в container.image у обоих workflow: браузер и
# шрифты уже внутри, поэтому шага `playwright install` нет (он к тому же
# воспроизводимо подвисал на runner-е). Пиксели эталонов зависят именно от
# сборки Chromium в этом образе, поэтому тег обязан совпадать с версией
# playwright в yarn.lock — за этим следит scripts/assert-playwright-image.mjs.
#
# Поверх базы ставим Node ровно той версии, что CI получает через
# actions/setup-node, иначе окружения расходятся по тулчейну.
#
# Сборкой и запуском рулит scripts/screenshots-docker.mjs — он подставляет
# оба ARG из package.json и .nvmrc, вручную этот Dockerfile собирать не нужно.

ARG PLAYWRIGHT_TAG=v1.58.2-noble
FROM mcr.microsoft.com/playwright:${PLAYWRIGHT_TAG}

ARG NODE_VERSION=24.17.0
ARG YARN_VERSION=1.22.22

# Именно .tar.gz, а не .tar.xz: в базовом образе нет xz, и распаковка падает
# на "xz: Cannot exec: No such file or directory".
RUN curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" \
      | tar -xz -C /usr/local --strip-components=1 \
        --exclude=CHANGELOG.md --exclude=LICENSE --exclude=README.md \
  && npm install -g "yarn@${YARN_VERSION}" \
  && node --version \
  && yarn --version

WORKDIR /app
