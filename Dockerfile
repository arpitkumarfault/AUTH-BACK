FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Rebuild bcrypt for the container
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 7000

# Command to start the application
CMD ["npm", "start"]
