FROM gradle AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon
################################################################################
#FROM openjdk:14-jdk
FROM adoptopenjdk/openjdk11
#FROM ubuntu:20.10
#RUN apt update && apt install -y openjdk-14-jdk-headless
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar\
      /app/spring-boot-application.jar
ENTRYPOINT [\
  "java",\
  "-Djava.security.egd=file:/dev/./urandom",\
  "-jar",\
  "/app/spring-boot-application.jar"]
