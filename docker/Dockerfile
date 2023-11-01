FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port application will run on
EXPOSE 3000

# Command to start Node.js application
CMD [ "node", "app.js" ]
