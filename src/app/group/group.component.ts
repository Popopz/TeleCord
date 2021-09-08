import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TeleCord from '../../assets/TeleCord.json';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  roles = this.getRole()
  getRole(){
    var listOfRoles = ['User']
    for (let i = 0; i < TeleCord.user.length; i++){
      if(TeleCord.user[i].username == localStorage.getItem("username")){
        listOfRoles = TeleCord.user[i].role;
        break
      }
    }
    var highestRole;
    for (let i = 0; i < listOfRoles.length; i++){
      if (listOfRoles[i] == 'SuperAdmin'){
        return 'SuperAdmin';
      }
      if(listOfRoles[i] == 'GroupAdmin'){
        highestRole = 'GroupAdmin';
      }
    }
    return highestRole
  }
  createGroup(thing:any){
    console.log("Creating new Group!");
    var notDuplicate = true;
    for (let i = 0; i < TeleCord.group.length; i++){
      if (TeleCord.group[i].page == thing.page){
        notDuplicate = false;
        alert("Name already chosen!");
      }
    }
    if (notDuplicate){
      TeleCord.group.push({
        "page": thing.page,
        "channel":[
           thing.channel
        ],
        "assis":[
           "abc@com.au"
        ]
     })
      console.log("I do not know how to connect to Node.js!");
      var list = []
      for (let i = 0; i < TeleCord.group.length; i++){
        list.push(TeleCord.group[i].page);
      }
      console.log("here is a List of the current Usernames in Object:" + list);
    }
    //parse TeleCord to Node!!!
  }
  addUserToGroup(thing:any){
    thing.page;
    thing.username;
    var notDuplicate = true;
    var pageExists = false;
    var userExists = false;
    var userIndex = 0;
    for (let i = 0; i < TeleCord.user.length; i++){
      if (TeleCord.user[i].username == thing.username){
        userIndex = i
        userExists = true
      }
    }
    for (let i = 0; i < TeleCord.group.length; i++){
      if (TeleCord.group[i].page == thing.page){
        pageExists = true
      }
    }
    if (!userExists){alert("User not found!");}
    if (!pageExists){alert("Group not found!");}
    if (userExists && pageExists){
      for (let i = 0; i < TeleCord.user[i].groups.length; i++){
        if (TeleCord.user[userIndex].groups[i] == thing.page){
          notDuplicate = false;
          alert("Already in that Group!");
          break;
        }
      }
    }
    if (notDuplicate){
      TeleCord.user[userIndex].groups.push(thing.page)
      console.log(TeleCord);
    }
  }
  addAssisToGroup(thing:any){
    thing.username
    thing.page
  }
  //For Assignment 2: removeAssisToGroup(){}
  //removeUserFromGroup(){}


  page = this.getPage();
  assis = this.getAssis();
  channel = this.getChannel();
  constructor(private router: Router) { }
  accessGroups = this.accessibleGroups()
  ngOnInit(): void {
    //Check if the user is logged in, if not, make them log-in.
    let myvar = localStorage.getItem("username");
    if (myvar == undefined){
      this.router.navigateByUrl('/login');
    }
  }
  accessibleGroups(){
    //Figure out if the user has access to any specific groups
    var listOfGroups = []
    var userID = 0;
    for (let i = 0; i < TeleCord.user.length; i++){
      userID = i;
      listOfGroups.push(TeleCord.user[i].groups);
    }
    //If the user is a 'GroupAdmin' give them access to every group.
    for (let i = 0; i < TeleCord.user[userID].role.length; i++){
      if (TeleCord.user[userID].role[i] == 'GroupAdmin'){
        var temp = []
        for (let i = 0; i < TeleCord.group.length; i++){
          temp.push(TeleCord.group[i].page)
        }
        listOfGroups = temp;
      }
    }
  }
  getPage(){
    var page = []
    for (let i = 0; i < TeleCord.group.length; i++){
      page.push(TeleCord.group[i].page);
    }
    return page;
  }
  getChannel(){
    var channel = []
    for (let i = 0; i < TeleCord.group.length; i++){
      var temp1 = []
      for (let j = 0; j < TeleCord.group[i].channel.length; j++){
         temp1.push(TeleCord.group[i].channel[j]);
      }
      channel.push(temp1)
    }
    return channel;
  }
  getAssis(){
    var assis = []
    for (let i = 0; i < TeleCord.group.length; i++){
      var temp2 = []
      for (let j = 0; j < TeleCord.group[i].assis.length; j++){
        temp2.push(TeleCord.group[i].assis[j]);
      }
      assis.push(temp2)
    }
    return assis;
  }
}
