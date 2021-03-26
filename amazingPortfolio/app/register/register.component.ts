import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:string = "";
  pass:string = "";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  myLogin(){
    this.router.navigate(["login"]);
  }
  checkRegister(regRef:any){
    this.user = regRef.user;
    this.pass = regRef.pass;
    let obj:string[] = [this.user, this.pass];
    const myuser={
        user:this.user,
        pass:this.pass
    }
    console.log(myuser);
    localStorage.setItem("Login", JSON.stringify(obj));
  }
}
