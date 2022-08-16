# Full Stack Demo
This Folder will contain two project folders, one for the front end Vue app, and one for the back end Node API. They are the folders that should be opened in VSCode when working on either of them, and they are where the node_modules should be kept. This parent folder is just to hold the repo that tracks them both and this readme file that tracks the steps taken.

Note that this readme file is written using markdown syntax, so you can view it in the proper form using VSCode's markdown previewer using CTRL + SHIFT + V, or any markdown viewer of your choice.

This project will have a front end interface that will allow the user to create, view and delete reminders by communicating with a back end API that stores the data nd handles requests to send, add or remove entries in the data.

We begin with a basic empty folder structure.

## Step 1: Create the front and back end folders and begin scoping out the project.

We will use Vue for the front end and Express for the back end.

1. To create the front end folder, we can simply run the Vue setup script. In the console, execute the following while focused on this folder: `npm init vue@latest` and enter the name of the project when prompted. I will simply use 'reminder-app-front'

1. To create the back end folder, we can simply make a new folder called reminder-api-back, and the `cd` into it and run `npm init -y` to create a package.json file with all the defaults set automatically.

## Step 2: Prepare the front end

We will now remove the default Vue components.

1. Open the front end folder directly in VSCode

1. Install the dependencies necessary to begin development by running `npm install`. This will download all the parts needed to make the application work and allow us to develop properly.

1. Remove the following from the src folder:
    - icons folder
    - HelloWorld.vue
    - TheWelcome.vue
    - WelcomeItem.vue

1. Delete everything inside the assets folder, and then add a single empty css file called main.css into it. This is in case we want to add some global styles later, as the main js file looks in the assets folder and tries to import a css file called main.css.

1. Now lets go to the main App.vue file and strip out all the placeholder stuff. You should end up with just an empty Vue component that looks like this: 
```
<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
</style>
```

1. Execute `npm run dev` to start the dev server up, and in your browser visit the address of the dev server to see the Vue app. It should just be an empty viewport with no errors in the console.

We now have an empty but functional Vue scaffolding to work in :)

## Step 3: Create front end functionality for first use case: Create Reminder

We will add a form to the main component that allows the entry of the information necessary to define a reminder. This will then be submitted via an event listener to the back end. In the next step we will built a route on the back end to handle this.

1. In the main App.vue component, add a `<form>` element that contains a label/input type pair for each of the data fields that a reminder have:
    - task (`textarea`)
    - time (`date` input)
    - priority (`select` with values of 0, 1, 2)
    - color (`color` input)

1. Finally add a button to the form that on click runs a method called `submitForm`.

1. next we must add v-model attributes to each of the inputs and connect them to data properties in the component.

1. finally lets define the method `submitForm` and have it console.log a message to confirm that it works.

## Step 4: Add ability to submit data to back end

We will modify the method to be able to send a POST request when the form button is pressed. We will need to porvide a configuration object to the fetch method so that it isn't defaulting to GET

1. Add the fetch() method to the submitForm method and supply it with a configuration object as per the code example:
``` 
async submitForm() {
      const response = await fetch('http://127.0.0.1:3000/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: this.task,
          time: this.time,
          priority: this.priority,
          color: this.color
        })
      });

      const data = await response.text();
      console.log(data);
    }
```

Note, the configuration object contains the following properties: 
    - method defines the type of request, by default it is POST
    - headers are metadata about the request. When posting we must set the content type header to inform the server about what type of data we are sending
    - body contains the payload, which is a javascript object containing the inputted data. The object is stringified into JSON format before sending

## Step 5: Create a route on the back end to handle incoming POST requests

Now that the fornt end can send POST requests we need to create a a new route on the back end that can accept and respond.

1. Open the back end folder in VSCode and install express and cors by executing the following `npm install express cors`
    - Express is the framework that we will use to create this RESTful API
    - Cors is a utility that allows us to bypass Cross Origin Resource Sharing issues that result from having the front and back end on the same localhost

1. We can also install nodemon as a dev dependency to conveniently hot reload the server upon changes being detected by executing `npm install --save-dev nodemon`

1. Once we have these, create a new `server.js` file.

1. Import express and cors and set up a new express app and listener that uses `cors()`

1. Add a route that matches with POST requests to /reminders, that sends back a text response like "hello"

## Step 6: Create ability to interpret incoming request JSON payloads

1. Add middleware that applies express.json() to incoming requests. This allows endpoints to access the JSON of requests and manipulate or otherwise work with them.

1. We can then send that back down to the client.

1. The client can then use response.json() instead of .text() to render the data as an actual object

## Step 7: Add ability to save data

We need the ability to save data to a file on disk in order to permanently store it. This can for now be achieved with a JSON file that we can read and write to using the fs module.

1. Before we can use fs to read and write we must import it using `require()`.

1. We also will need a JSON file with an object that has the data array as a property to keep things organised

1. Once it is imported, in our POST /reminders endpoint we can read the contents of the file using `fs.readFileSync()`

1. We decode from a buffer to regular javascript using the `JSON.parse()`

1. Once decoded, we can append the request body to the reminders array in the JSON data object using `push()`

1. Now we encode it back into JSON using `JSON.stringify()`

1. Finally, we take the updated data and write it back into the file, overwriting the previous data

Normally we would be using a proper database for this, however for now reading and writing JSON is simple and acceptable for this scale. The only issue is that when we write to JSON the previous data is overridden so we need to extract all of it, modify it and then save all of it each time, which would get slower the more data there is.

## Step 8: Add ability to get all reminders

Now that we have the ability to add reminders to the JSON file it makes sense to write the logic needed to view the reminders. We can create in the Vue app the ability to send a GET request that fetches the list of reminders.

1. Add a button to the Vue application somewhere under the inputs called Get Reminders. This is a temporary implementation that will be tidied up later

1. The button should have a click listener, which triggers a method called `getReminders()`

1. We can use the `getReminders()` method to send a GET request to the server to retrieve the list of reminders, as per our planning document using `fetch()`

1. Add a standard asynchronous `fetch()` setup that GETs to /reminders, and decodes and logs the response from JSON using `.json()`

1. Now switch to the back end. We can add a new endpoint that can handle GET requests to reminders, and using logic similar to what was used for the POST endpoint, we can read and decode the data from the JSON file. In this case we do not need to modify, encode and write the data, we can simply send the data down to the client once it is decoded, as all that is required is to send the list down

1. Upon clicking the button you should see that the client receives and logs the data from the server. By modifying exactly what gets sent from the server and what gets displayed on the client you can determine weather you get the whole data object in the console or just the array

1. Finally we can create a data property to hold the fetched data on the Vue client. Add a data property called `reminderArray` and then put a string interpolation {{}} into the template to render it out

1. Modify the `getReminders()` method so that rather than console.logging the data, it saves it to the `reminderArray` property

Now the client and server are able to work together to allow the creation and viewing of reminders. This is a sensoble place to start as now we can set up a better view for the reminders using components, and we can also add validation if we like. Once we have the reminders being rendered properly we can add a button that triggers the deletion of the reminder.

## Step 9: Create components to represent the reminders on the front end

Now that we are able to get a list of reminders rendered into the DOM it would make sense to spend some time to create a component to represent them, as we will want to add a way to delete reminders by cliking a button on each one. Having some form of interface will make this process a bit nicer. This doesn't have to be final styling, jsut enough to add a bit of convenience to the application development process.

1. We will need to create a new component in the components folder (or wherever you are keeping your components, the folder structure is arbitrary). It is best practice to use two+ word component names using PascalCase. We can call it ReminderListItem.vue

1. We can add a basic component boilerplate to it so that it is able to be imported and rendered. Let's put a simple h1 into the template so we can see it show up.

1. Import the component into App.vue and register and render it. When rendering it, use `v-for` to display it once for each item in the reminders array.

Now when you click you then get reminders button you can see each reminder gets a component that displays its hardcorded html. In the next step we will add the ability for each component instance to display the actual data that it represents.