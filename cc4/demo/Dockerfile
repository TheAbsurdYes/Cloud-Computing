# FROM node:latest AS node
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    sqlite3 \
    unzip \
    openssl \
    netcat \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /run/nginx

COPY docker/nginx.conf /etc/nginx/nginx.conf

# Configure Nginx
# COPY docker/nginx/site.conf /etc/nginx/sites-available/default
# COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

# # Configure Supervisor
# COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

WORKDIR /var/www/html

COPY composer.json .
COPY package.json .

RUN composer install --no-dev --no-scripts --no-progress --prefer-dist --optimize-autoloader

COPY . .

RUN npm install
RUN npm run build

RUN chown -R www-data: .

# Set ownership and permissions
# RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
# RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=localhost"

RUN touch ./database/database.sqlite && \
    chown www-data:www-data ./database/database.sqlite && \
    chmod 664 ./database/database.sqlite

RUN php artisan migrate:fresh --force

EXPOSE 8080
# EXPOSE 443

CMD sh ./docker/startup.sh
