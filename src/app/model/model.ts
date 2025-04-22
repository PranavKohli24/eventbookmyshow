export interface IAPIResponse{
    message:string;
    result:boolean;
    data:any;
    
}

export interface  IEvent{
    eventId:number;
    eventName:string;
    startDate:string;
    startTime:string;
    endDate:string;
    organizerName:string;
    userId:number
    price:number
    location:string
    imageUrl:string;
    organizerId:number;
}

export class User{
    UserId:number;
    Name:string;
    Email:string;
    Password:string;
    ContactNo:string;
    Role:string;
    // contactNo?:string;


    constructor(){
        this.UserId=0;
        this.Name='';
        this.Email='';
        this.Password='';
        this.ContactNo='';
        this.Role='Customer';

    }
}