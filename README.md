Documentation:

Things the project does NOT do:
- I could not get Node and Angular to talk to each other, so nothing is Saved to File-System, however, Angular’s Object does remember and modify itself, so these changes are done, just never saved.
- I ran out of time, and so a lot of security issues, and a few Update functions have not been implemented.

*Note: I did add documentation for the unimplemented features.

Git:
To use Git, I took the easy option, and relied on Visual Studio Code’s Git functions. Whenever I completed something and cleared my mind, I would commit the changes. The normal method of using git add, and git commit -m “message”, etc was unnecessary compared to the usefulness of Visual Studio’s Source Control tab. Since I, and I alone was working on the project, I did not need to regularly upload the files to Github, apart from ensuring data loss did not occur.
https://imgur.com/a/RJLjM89 <-Image of Visual Studio Code's button.
GitHub, ‘the largest code host in the world’ has a simple design, and is a great option for online storage of Code. As such and more, Visual Studio Code has a handy button for publishing straight to GitHub.

Data Structures:
The data structures in the current version, is all determined by the TeleCord.JSON file. In future version MongoDB will be used to store data instead.
The TeleCord JSON file is made of 2 parts. The User part deals with information to do with the user. It stores the user’s name, which should be unique to that user. An email, that might have some email verification at a later point. Role which is an array of strings for each possible role a user might have. By default a user always has the role ‘user’ but ‘Super Admin’ and ‘Group Admin’ are also used in the current system. It would be very easy to implement new or custom roles to the list. Note that the ‘Group Assis’ role is specific to the corresponding group, and is saved in the Group Part. The groups string array, is the list of all the groups the user has access to. It corresponds to the Group’s Page string.
The Group part deals with any information to deal with groups. It stores the “page” name which is what is used as the ID. As such each Page name must be unique. A list of channels are also saved, and future versions would save information corresponding to a channel here as well, like any messages. The Assis string array, lists all of the usernames of Group Assis users.

Psuedocode for Class implementation of the TeleCord.JSON file:
Class user{
username: string
email: string
role: string[]
groups: string[]
}
Class group{
page: string
channel: string[]
assis: string[]
}
Class TeleCord{
user: user
group: group
}


REST API:
*variables are in first letter Uppercase, for better reading purposes. The code used normal camelCase rules.

/user, /group
get<variable>()
The get<Variable> is used for each Variable that needs to be displayed to the HTML component. For each item, a simple piece of code to query the TeleCord.JSON object and obtain the full-list and return the corresponding value. There is 10 or more of them, so it's unfeasible to list them all here, especially since the Functions are almost identical. In the next version, I will work to see if Polymorphism can be used to merge the similar Functions together.

/login:
loginUser(Username, Email)
Checks through each user in the TeleCord.JSON file and, if the Username and Email provided through the function are the same as an existing user, it stores the User’s name in LocalStorage. The security for the system is Extremely Lax, and hasn’t been considered for this version.

/user:
createUser(Username, Email)
It updates the JSON, parsing in a new User. Setting role to “User” and groups to “default”. Passwords is not needed in the current version of the system, however it will be needed in the next one. The function will also ensure that no other user has the same username.

deleteUser(Username)
It updates the JSON, removing the user with the username, set to the one specified. Since each user requires a unique username, it can be used as the ‘id.’

modifyUser(OldUsername, NewUsername, Email)
Checks if the NewUsername is available and if it is, checks if a user for the OldUsername exists. If successful it changes the name of the user to NewUsername, and Email to Email.

AddRole(Username, Role)
Checks for if the User exists, if it does, check if it already has the Role, if not push the role to the JSON file.

removeRole(Username, Role)
Checks for if the User exists, if the user exists, then use a ForLoop to parse every Role of the user to an array. Inside the ForLoop if the role it is parsing is equal to the Role, then it doesn’t move over. Replace the current Roles of the User, with the roles from the array.

/group:
createGroup(GroupName, Channel)
Checks if a group already exists by the same, if not pushes, a new Group based on the GroupName, and creates a channel by the Channel name.

removeGroup(GroupName)
Searches for a group with the same GroupName, as provided in the form, if it is found the information stored in the JSON for that group is removed.

editGroup(OldGroupName, NewGroupName)
Searches to see if NewGroupName is available, if it is it then Searches for a group with OldGroupName, and changes it’s name to NewGroupName.

addUserToGroup(Username, GroupName)
Searches for a User, with the Username, and appends the GroupName to their groups array.

removeUserFromGroup(Username, GroupName)
Searches for a User, with the Username, and loops through their groups, and removes any that are the same as the GroupName.

addAssisToGroup(Username, GroupName)
Searches for the group by GroupName, and appends the Username to the group’s Assis array.

removeAssisFromGroup(Username, GroupName)
Searches for the group by GroupName, and loops through it’s Assis array. If any element is equal to the Username, remove it.

createChannel(GroupName, Channel)
Searches for the group with GroupName, and checks if it already has a channel with the same value as Channel. If not then it creates it in the group.

removeChannel(GroupName, Channel)
Searches for the group with GroupName, and loops through its channels. If it finds a channel with the same value as Channel, it removes it.

editChannel(GroupName, OldChannel, NewChannel)
Searches for the group with GroupName, it then loops through the channel array, and finds any with the value of OldChannel. It modifies the value to be NewChannel.


*I couldn’t get Node and Angular to talk to each other, so I wasn’t able to actually implement any of the above mentioned features, and instead had Angular deal with all of the work. It was fairly possible to complete each feature, except for saving the JSON file, so changes made would be reset when another page was loaded.

Architecture:
TeleCord.JSON
The project uses the TeleCord.JSON file to deal with any information storage server-side. For more information look at “Data Structures” above.

Angular
The Angular client-side holds 3 pages. The User page deals with showing the user’s current information, and if the user is a SuperAdmin, forms to Modify the information. The Group page shows all of the groups and channels that the user has access to. If the user has a Role which allows them to modify the Group contents, or add Group Assis users, the forms are available for them aswell. The Login is the final page, which simply asks for the user to fill a form with their login information. The user is redirected to the Login page if they attempt to view any other page without having a set LocalStorage value for their username. In the second version, proper security will be used instead.


Node
The Node Server-Side client deals with the actual Writing to Files. Angular cannot use the ‘fs’ File-System. A vast majority of the project is completed inside of Angular, and so Node wasn’t used as much as it could’ve been. The saveJSON(JSON) function created in app.js is used frequently every time the server makes changes to TeleCord.JSON. In the next version of the Project, Node will take a much bigger and active role, with MongoDB, and other server-side actions.



# TeleCord

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
