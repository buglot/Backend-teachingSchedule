# Use the official MySQL image as the base image
FROM mysql:8.0

# Set the root password
ENV MYSQL_ROOT_PASSWORD 123123123

# Copy the SQL files into the container
COPY ./basetableandsomedata.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
