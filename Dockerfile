# Use Node.js Alpine for a small footprint
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port
EXPOSE 7171

# Start the application
CMD ["node", "index.js"]