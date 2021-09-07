import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TeleCord from '../../assets/TeleCord.json';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
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
