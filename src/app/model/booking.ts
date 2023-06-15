import {Client} from "./client";
import {Treatment} from "./treatment";

export class Booking{
  id: number
  createdAt: Date
  bookingDate: Date
  duration: number
  status: string
  client: Client
  treatments: Treatment[]
  clientNotes: string


  constructor(
    id: number,
    createdAt: Date,
    bookingDate: Date,
    duration: number,
    status: string,
    client: Client,
    treatments: Treatment[],
    clientNotes:string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.bookingDate = bookingDate;
    this.duration = duration;
    this.status = status;
    this.client = client;
    this.treatments = treatments;
    this.clientNotes = clientNotes
  }
}
