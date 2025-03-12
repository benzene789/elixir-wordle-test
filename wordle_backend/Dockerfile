# backend/Dockerfile
FROM python:3.12-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies (only what's needed for SQLite3)
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the Django project into the container
COPY . /app/

# Copy the words.txt file
COPY wordlist.txt /app/wordlist.txt

# Copy the populate_words.py script
COPY populate_words.py /app/populate_words.py

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose the Django server port
EXPOSE 8000

# Run the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]