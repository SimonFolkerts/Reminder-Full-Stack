# Full Stack Demo
This Folder will contain two project folders, one for the front end Vue app, and one for the back end Node API. They are the folders that should be opened in VSCode when working on either of them, and they are where the node_modules should be kept. This parent folder is just to hold the repo that tracks them both and this readme file that tracks the steps taken.

Note that this readme file is written using markdown syntax, so you can view it in the proper form using VSCode's markdown previewer using CTRL + SHIFT + V, or any markdown viewer of your choice.

This project will have a front end interface that will allow the user to create, view and delete reminders by communicating with a back end API that stores the data nd handles requests to send, add or remove entries in the data.

We begin with a basic empty folder structure.

## Step 1: Create the front and back end folders and begin scoping out the project.

We will use Vue for the front end and Express for the back end.

1. To create the front end folder, we can simply run the Vue setup script. In the console, execute the following while focused on this folder: `npm init vue@latest` and enter the name of the project when prompted. I will simply use 'reminder-app-front'

1. To create the back end folder, we can simply make a new folder called reminder-api-back, and the `cd` into it and run `npm init -y` to create a package.json file with all the defaults set automatically.