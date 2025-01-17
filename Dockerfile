FROM node:alpine3.18 as build
# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Define build argument for the API URL
ARG REACT_APP_API_URL

# Write the environment variable to a .env file
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

RUN npm run build
# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


