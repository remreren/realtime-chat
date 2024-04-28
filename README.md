# realtime chat application
## description
I set this project up for testing websocket + spring boot. This uses stomp for websocket communication.

## requirements
1. java 21
2. maven
3. node.js/python (for serving the ui)

## run but how?
1. clone and setup project
2. run the java server
3. serve ui folder statically
4. open the browser and go to the served page

## further explanation
1. for spring boot server:
   - go to the root folder of the project
   - run `mvn spring-boot:run` or `./mvnw spring-boot:run`
2. for serving the ui:
   - go to the ui folder
   - run `python -m http.server 8000` or `npx http-server -p 8000`