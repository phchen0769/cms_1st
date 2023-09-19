FROM alpine:latest

LABEL MAINTAINER = "Fedorov"


# 替换apk使用的源
COPY repositories /etc/apk/repositories

# Install required packages and remove the apt packages cache when done.
RUN apk update && apk add --no-cache --update-cache libuv\
    nodejs \
	gcc \
	make \
	g++ \
	npm

WORKDIR /workspaces/cms_1st/

EXPOSE 8888

CMD ["npm", "run", "dev"]