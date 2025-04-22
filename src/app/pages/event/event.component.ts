import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { IAPIResponse, IEvent, User } from '../../model/model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe,CommonModule,DatePipe,RouterLink,FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  activatedRoute=inject(ActivatedRoute);
  eventService=inject(EventService);
  eventData:Observable<IEvent>=new Observable<IEvent>;
  events$:Observable<IEvent[]>=new Observable<IEvent[]>;

  @ViewChild('model') model:ElementRef|undefined;
  members:any={
    
    Name:'',
    Age:0,
    IdentityCard:'',
    CardNo:'',
    ContactNo:''
  }

  bookingObj:any={
    BookingId:0,
    userId:0,
    EventId:0,
    NoOfTickets:0,
    EventBookingMembers:[]

  }
  // userObj:User=new User();
  userObj:any;

  constructor(){
    const loggedData=localStorage.getItem('eventUser');
    if(loggedData!=null){
      this.userObj=JSON.parse(loggedData)
      this.bookingObj.userId=this.userObj.userId
    }

    this.activatedRoute.params.subscribe((res:any)=>{
      console.log('hello',res)
      this.bookingObj.EventId=res.id;
      this.eventData= this.eventService.getEventById(res.id);

      this.eventData.subscribe((res:IEvent)=>{
        this.events$=this.eventService.getEventsByOrganizerName(res.organizerId)
      })
    })

  }

  // getEventDetails(id:number){
    

  // }

  openModel(){
    if(this.model){

      this.model.nativeElement.style.display='block';
    }
  }

  closeModel(){
    if(this.model){

      this.model.nativeElement.style.display='none';
    }
  }


  AddMember(){
    const newObj=JSON.stringify(this.members);
    const obj=JSON.parse(newObj);
    this.bookingObj.EventBookingMembers.push(obj);
  }


  onBooking(){
    this.bookingObj.NoOfTickets=this.bookingObj.EventBookingMembers.length;
    this.eventService.book(this.bookingObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Booking success');
        this.closeModel()
      }else{
        alert(res.message)
      }
    })
  }
}
