# Use official Node.js runtime
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
