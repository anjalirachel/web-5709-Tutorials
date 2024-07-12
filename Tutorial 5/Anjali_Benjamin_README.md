# Tutorial5

* *Date Created*: 11 Jul 2024
* *Last Modification Date*: 11 Jul 2024
* *Tutorial Repository URL*: <https://git.cs.dal.ca/kurian/csci-5709-tutorials>
* *Netlify Deployment Link*: <https://starlit-heliotrope-ba7260.netlify.app>


## Authors


* [Anjali Rachel Benjamin](an653262@dal.ca) - Owner


## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this tutorial up and running on your local machine, you will first need to install the following software / libraries

```
Node.js
Visual Studio Code
Postman

```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins


### Installing

A step by step series of examples that tell you how to get a development env running

1. Download and install the JDK 17 from the preferred distribution.
2. Set the JAVA_HOME environment variable to the JDK installation path.
3. Add the JDK bin directory to the PATH environment variable.
4. Download and install Maven from the Maven website.
5. Set the MAVEN_HOME environment variable to the Maven installation path.
6. Add the Maven bin directory to your PATH environment variable.
7. Navigate to Your Project Directory and build the project.

```
mvn clean package

```
8. Run the Spring Boot Application.

```
mvn spring-boot:run

```
The app will run on the localhost. The app will run in the development mode at [http://localhost:8080/] 

9. Create a Dockerfile in the project directory.

```
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR file to the container
COPY --from=build /app/target/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```


## Deployment

1. Push the app on the GitLab repository
2. Mirror the Gitlab repository to the GitHub
3. Open Render with the GitHub account
4. Go to the Render Dashboard
5. Click the "New" button, then select "Web Service".
6. Render will prompt to connect to the GitHub account.
7. Authorize Render to access the repositories.
8. Choose the repository that contains the Spring Boot project.
9. Enter a name for the web service.
10. Click on "Create Web Service".


## Built With

* [jdk](https://www.oracle.com/ca-en/java/technologies/downloads/) - The development kit used
* [Maven](https://maven.apache.org/) - software project management and comprehension tool