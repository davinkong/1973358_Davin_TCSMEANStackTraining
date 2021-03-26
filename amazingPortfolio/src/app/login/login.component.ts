import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg:string = "";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  Reg(){
    this.router.navigate(["register"]);
    
  }
  checkLogin(loginRef:any){
    let loginUser = loginRef.user;
    let loginPass = loginRef.pass;
    let key = localStorage.getItem("Login");
    console.log(loginUser);
    console.log(loginPass);
    console.log(key);
    if(key != null){
    let get = JSON.parse(key)

    if(get[0]==loginUser &&  get[1]==loginPass){
      console.log("Successful!");
      this.router.navigate(["home"]);

    }
    else{
     

    }
  }
}
}
