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