# === Stage 1: Build the React frontend ===
FROM node:18 AS frontend

WORKDIR /app
COPY ecom-app/ ./ecom-app
WORKDIR /app/ecom-app

RUN npm install
RUN npm run build

# === Stage 2: Build the Spring Boot backend ===
FROM maven:3.9.6-eclipse-temurin-17 AS backend

WORKDIR /app
COPY backend/ ./backend
COPY --from=frontend /app/ecom-app/dist ./backend/src/main/resources/static

WORKDIR /app/backend
RUN ./mvnw package -DskipTests

# === Stage 3: Run the Spring Boot app ===
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
COPY --from=backend /app/backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
