import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TeleCord from '../../assets/TeleCord.json';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
  parsedJson: any;
  createUser(thing: any){
    console.log("Creating new User");
    var notDuplicate = true;
    for (let i = 0; i < TeleCord.user.length; i++){
      if (TeleCord.user[i].username == thing.username){
        notDuplicate = false;
        alert("Name already chosen!");
      }
    }
    if (notDuplicate){
      TeleCord.user.push({
        "username": thing.username,
        "email":thing.email,
        "role":[
          "User"
        ],
        "groups":[
          "default"
        ]
      })
      console.log("I do not know how to connect to Node.js!");
      var list = []
      for (let i = 0; i < TeleCord.user.length; i++){
        list.push(TeleCord.user[i].username);
      }
      console.log("here is a List of the current Usernames in Object:" + list);
    }
    //parse TeleCord to Node!!!
  }
  deleteUser(thing: any){
    console.log("Deleting User: " + thing.username);
    for (let i = 0; i < TeleCord.user.length; i++){
      if (TeleCord.user[i].username == thing.username){
        delete TeleCord.user[i];
        console.log(TeleCord);
        break;
      }
    }
    console.log("I do not know how to connect to Node.js!");
    console.log("Here is the Object: ");
    console.log(TeleCord);
  }
  username=this.getUsername()
  email=this.getEmail()
  role=this.getRoles()
  groups=this.getGroups()
  constructor(private router: Router) { }

  ngOnInit(): void {
    let myvar = localStorage.getItem("username");
    if (myvar == undefined){
      this.router.navigateByUrl('/login');
    }
  }
  getUsername(){
    var username = [];
    for (let i = 0; i < TeleCord.user.length; i++){
      username.push(TeleCord.user[i].username);
    }
    return username;
  }
  getEmail(){
    var email = [];
    for (let i = 0; i < TeleCord.user.length; i++){
      email.push(TeleCord.user[i].email);
    }
    return email;
  }
  getRoles(){
    var temp0 = [];
    for (let i = 0; i < TeleCord.user.length; i++){
      temp0.push(TeleCord.user[i].username);
    }
    var roles = temp0;
    return roles;
  }
  getGroups(){
    var temp1 = [];
    for (let i = 0; i < TeleCord.user.length; i++){
      temp1.push(TeleCord.user[i].username);
    }
    var groups = temp1;
    return groups;
  }
}
