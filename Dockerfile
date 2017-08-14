FROM node:boron
MAINTAINER Shayan

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD build /usr/src/app/build
ADD server.js /usr/src/app
ADD certificates /user/src/app/certificates


# Install dependencies
WORKDIR /usr/src/app
RUN npm install express
RUN npm install fs
RUN npm install http
RUN npm install https
RUN npm install path

# Run when you don't have node_modules '
# RUN npm install

# Build the app
#RUN npm build

# Expose the app port
EXPOSE 8080
EXPOSE 8443

# Start the app

CMD ["node", "server.js" ]

