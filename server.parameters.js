'use strict';

module.exports = {
    http_port: 8080,
    https_port: 443,
    enable_auth: false,
    domain: 'wic',
    use_ssl: false,
    certificate: {
        key_path: '/etc/ssl/private.pem',
        crt_path: '/etc/ssl/public.pem'
    }
};