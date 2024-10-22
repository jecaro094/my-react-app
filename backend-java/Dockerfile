# Step 1: Use an official Java runtime as a parent image
FROM openjdk:17-jdk-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the JAR file into the container
# Replace "myapp.jar" with the actual name of your JAR file
COPY target/conference-demo-0.0.1-SNAPSHOT.jar /app/myapp.jar

# Step 4: Expose the port that Spring Boot listens on (default is 8080)
EXPOSE 8000

# Step 5: Set the default command to run the JAR file
CMD ["java", "-jar", "/app/myapp.jar"]
