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
    var users=["abc@com.au","123","admin@email.com","password","yes@com.au","pass"];
    for (let i = 0; i < users.length - 1; i++) {
      if(thing.username == users[i] && thing.password==users[i+1]){
        okay=true;
      }
    }
    if(okay){
      sessionStorage.setItem('valid', 'true')
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
