FROM php:8.3-fpm

# Install dependensi sistem, Nginx, dan Node.js 22 sekaligus
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install ekstensi PHP esensial
RUN docker-php-ext-install pdo_mysql bcmath gd

WORKDIR /var/www

# Salin seluruh source code aplikasi
COPY . .

# Install Composer & PHP dependencies tanpa dev tools
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Install NPM dependencies & Build Assets (Inertia/React) secara bersih langsung di server
RUN npm ci --legacy-peer-deps && npm run build

# Atur permission agar folder storage bisa ditulis oleh web server Nginx
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 80

# Jalankan optimasi Laravel, hapus cache runtime, lalu hidupkan PHP-FPM & Nginx
CMD php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    php-fpm -D && \
    nginx -c /var/www/nginx.conf -g 'daemon off;'