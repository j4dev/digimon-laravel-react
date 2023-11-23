#!/usr/bin/env bash
echo 'Running composer'
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html

echo "generating application key..."
php artisan key:generate --show

echo 'Caching config...'
php artisan config:cache

echo 'Caching routes...'
php artisan route:cache

echo 'Caching view...'
php artisan view:cache

echo 'Optimization view...'
php artisan optimize --force

echo 'Running migrations...'
php artisan migrate --force

echo 'Running swagger...'
php artisan l5-swagger:generate
