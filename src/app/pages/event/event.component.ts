import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { IEvent } from '../../model/model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe,CommonModule,DatePipe,RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  activatedRoute=inject(ActivatedRoute);
  eventService=inject(EventService);
  eventData:Observable<IEvent>=new Observable<IEvent>;
  events$:Observable<IEvent[]>=new Observable<IEvent[]>;

  constructor(){
    this.activatedRoute.params.subscribe((res:any)=>{
      console.log('hello',res)
      this.eventData= this.eventService.getEventById(res.id);
      this.eventData.subscribe((res:IEvent)=>{
        this.events$=this.eventService.getEventsByOrganizerName(res.organizerId)
      })
    })

  }

  // getEventDetails(id:number){
    

  // }


}
