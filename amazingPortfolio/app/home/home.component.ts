import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserName:String = "";
  ConNum:String[] = [];
  ConName:String[] = [];
  hide:String = "hidden";
  constructor() { }

  ngOnInit(): void {
  }
  data(info:any){
    this.hide = "";
    let cname = info.cname; 
    let pnumber = info.pnumber;
    this.ConName.push(cname);
    this.ConNum.push(pnumber);
  }
  userName(){
    let key = localStorage.getItem("Login");
    if(key != null){
      let get = JSON.parse(key)
      this.UserName = get[0]
    }
  }
}
