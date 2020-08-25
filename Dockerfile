FROM node:14-buster as node
COPY . /opt/ui
RUN cd /opt/ui \
    && npm install \
    && npm run build


FROM nginx:1.19
COPY --from=node /opt/ui/build /usr/share/nginx/html
COPY ./nginx /etc/nginx/
