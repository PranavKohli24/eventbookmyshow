import { Component ,OnInit, inject} from '@angular/core';
import { EventService } from '../../service/event.service';
import { IAPIResponse } from '../../model/model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  imports: [DatePipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit{

  eventSrv=inject(EventService)
  userObj:any;
  bookingList:any[]=[];
  ngOnInit(): void {
    const loggedData=localStorage.getItem('eventUser');
    if(loggedData!=null){
      this.userObj=JSON.parse(loggedData)
      this.getBookingByUserId()
    }
  }

  getBookingByUserId(){
    this.eventSrv.GetBookingsByCustomer(this.userObj.userId).subscribe((res:IAPIResponse)=>{
      
        this.bookingList=res.data;
        console.log('ethe',this.bookingList);
    })
  }
}
