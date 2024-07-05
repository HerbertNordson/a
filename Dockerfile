FROM node:20-alpine
WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production

# Copy package.json
COPY package*.json ./
COPY yarn.lock ./

# Install packages for application
RUN yarn --network-timeout 100000 --production

# Copy rest of application
COPY . .

# Build production version
RUN yarn build

# Entrypoint
CMD ["/bin/sh", "-c", "yarn start"]
