FROM gradle AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon
################################################################################
FROM openjdk:11-slim
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar\
      /app/spring-boot-application.jar
ENTRYPOINT [\
  "java",\
  "-Djava.security.egd=file:/dev/./urandom",\
  "-jar",\
  "/app/spring-boot-application.jar"]
