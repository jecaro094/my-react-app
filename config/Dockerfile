FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf.template
CMD /bin/sh -c "UPSTREAM_HOST='${UPSTREAM_HOST}' envsubst '\$UPSTREAM_HOST' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"