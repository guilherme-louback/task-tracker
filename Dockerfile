# Use a minimal Linux image with Node.js
FROM node:alpine  

# Set the working directory
WORKDIR /usr/src/app  

# Copy package.json and install dependencies
COPY package.json package-lock.json ./  
RUN npm ci --omit=dev  

# Copy the entire project
COPY . .  

# Make sure your CLI script is executable
RUN npm link 

# Set the entrypoint to your CLI
ENTRYPOINT ["/bin/sh", "-c", "node bin/index.js; exec /bin/sh"]


