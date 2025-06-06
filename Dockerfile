# Stage 1: Build the frontend app
FROM node:alpine3.18 as build
# FROM node:18-alpine as build

# Set the working directory for building the app
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all project files
COPY . ./

# Define build argument for the API URL (e.g., provided in GitHub Actions)
ARG REACT_APP_API_URL
ARG REACT_APP_RAZORPAY_KEY_ID

# Write the environment variable to a .env file
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env
RUN echo "REACT_APP_RAZORPAY_KEY_ID=$REACT_APP_RAZORPAY_KEY_ID" > .env


# Build the React app (or any other frontend framework)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Set working directory to the default Nginx HTML
WORKDIR /usr/share/nginx/html

# Remove any existing files from the Nginx root (just in case)
RUN rm -rf *

# Copy the built app from the build stage to the Nginx html directory
COPY --from=build /app/build/ .

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]



