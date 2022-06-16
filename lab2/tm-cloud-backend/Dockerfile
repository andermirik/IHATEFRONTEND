FROM maven AS build
COPY . /home/app/src
WORKDIR /home/app/src
#RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline
RUN mvn clean package
#--mount=type=cache,target=/root/.m2 mvn clean package

#
# Package stage
#
FROM openjdk:17-slim
RUN mkdir /app
COPY --from=build /home/app/src/target/*.jar /app/tm-cloud-backend.jar
ENTRYPOINT ["java",\
              "-XX:+UseContainerSupport",\
              "-XX:-UseAdaptiveSizePolicy",\
              "-Xmx5120m",\
              "-Xms256m",\
              "-Xss256k",\
              "-Djava.security.egd=file:/dev/./urandom",\
              "-jar",\
              "/app/tm-cloud-backend.jar"]