# frontend/Dockerfile
FROM node:23-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the rest of the frontend code
COPY . /app/

# Expose the Vite server port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]