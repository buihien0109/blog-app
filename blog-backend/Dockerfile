# Stage 1: Build the JAR using Maven 3.8.4 with JDK 17
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /home/app
COPY src ./src
COPY pom.xml .
RUN mvn clean package -DskipTests

# Stage 2: Create the final image using openjdk:17
FROM --platform=amd64 openjdk:17
WORKDIR /app
COPY --from=build /home/app/target/*.jar ./app.jar

ENTRYPOINT ["java","-jar","./app.jar"]