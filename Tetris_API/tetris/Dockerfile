FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target /app/target
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar $(find /app/target -name '*.jar' ! -name '*plain.jar' | head -n 1)"]