The most actual branch while you read it ---> ```optimization``` 


# Introduction

The project that was created is a simple application that allows you to order / buy books in the demo version.
When I was writing the application, I was more interested to show technological content, the division of business logic, than actual appearance and extensive functionality.

The main assumption of the project was to show how I deal with writing applications from the front and backend side, additionally connecting it to the database.

## Technologies

- React.js - React Router/ Context API / React Query
- Node.js - 
- Sass 
- MySQLWorkbench

## Construction:

To make the application desktop more readable, the application files has been divided into folders:
For client side: 

```components``` - app contains with several divided children component 
  - layout - contains that files composed of visual elements 
  - pages - pages with result of visualation server's responds for requests  
  - items - contains rest of code from pages/ children of page
```context``` - here are all contexts with logic side app like functions and states included in Providers's functions nested with main.ts file.  
```hooks```  - contains all the request to the server with REST API 
```styles``` - css modifed to sass 
```types```  - all typical types characteristic for typeScript
```utils``` - contain interceptors with base URL and updated headers with accessToken to pass it to the files's hooks


## Run applications by Vite:

After downloading file, first pass to the correct path and install ```node.modules``` environment, in terminal write: 

for client: 
```bash
/cd client /npm install
```
for server: 

```bash
/cd server /npm install
```

To run the application, in terminals in the main path for both write: 

for client: 
```bash
/cd client /npm run dev
```
for server: 

```bash
/cd server /npm run devStart
```
