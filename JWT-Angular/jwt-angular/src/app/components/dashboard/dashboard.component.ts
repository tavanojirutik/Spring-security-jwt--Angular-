import { Component, OnInit } from '@angular/core';
import { JwtRegisterService } from 'src/app/service/jwt/jwt.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{


  message!:string;

  constructor(private g_objJwtRegisterService: JwtRegisterService){}

  ngOnInit(): void {
    this.hello();
  }

  hello(){
    this.g_objJwtRegisterService.hello().subscribe(
      (response) => {
        console.log(response);
        this.message=response.message;
      }
    )
  }

 
}
