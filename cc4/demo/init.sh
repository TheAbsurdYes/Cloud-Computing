#!/bin/bash
WORKDIR='/var/www'

# Setup PHP
echo '[PHP] Running composer install.';
composer install -d ${WORKDIR} --no-progress --no-interaction

# echo '[PHP] Running migrations.';
# php ${WORKDIR}/artisan migrate;

echo '[NODE] npm install and build'
npm i && npm run build

php artisan serve --port=8080
exec docker-php-entrypoint "$@"
