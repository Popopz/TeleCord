import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TeleCord from '../../assets/TeleCord.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser(thing:any){
    console.warn(thing);
    var okay = false;
    for (let i = 0; i < TeleCord.user.length; i++){
      if (thing.username == TeleCord.user[i].username && thing.email == TeleCord.user[i].email){
        okay=true;
      }
    }
    if(okay){
      sessionStorage.setItem('valid', 'true')
      localStorage.setItem("username",thing.username)
      this.router.navigateByUrl('/group');
    }
    else{
      alert("Error: Incorrect Username/Password");
    }
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('Reading local json files');
    console.log(TeleCord);
  }
}