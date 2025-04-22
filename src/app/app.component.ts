import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAPIResponse, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookmyshow';

  eventService=inject(EventService);

  @ViewChild('model') model:ElementRef|undefined;

  isLoginForm:boolean=false;

  loginObj:any={
    'Password':'',
    'ContactNo':''

  }

  userObj:User=new User();

  constructor(){
    const loggedData=localStorage.getItem('eventUser');
    if(loggedData!=null){
      this.userObj=JSON.parse(loggedData)
    }
  }

  openPopup(){
    if(this.model){

      this.model.nativeElement.style.display='block'
    }
  }

  closePopup(){
    if(this.model){

      this.model.nativeElement.style.display='none'
    }
  }
  
  onRegister(){
    this.eventService.registerUser(this.userObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('User Registered successfully');
        this.closePopup();

      }else{
        console.log(res.message);
        alert(res.message);
      }
    })
  }

  onLogin(){
    this.eventService.loginUser(this.loginObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Logged in successfully');
        localStorage.setItem('eventUser',JSON.stringify(res.data));
        this.userObj=res.data;
        this.closePopup()

      }else{
        alert(res.message);
      }
    })
  }

  LogOff(){
    localStorage.removeItem('eventUser');
    this.userObj=new User();

  }
}
