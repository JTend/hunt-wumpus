import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RESTapiService {

  URI : string;

  constructor(private http : HttpClient) { 
    this.URI = '';
  }

  /* getList = (URISection : string) => 
  this.http.get(this.URI + URISection);

  getOne = (URISection : string, id : string | number) => 
  this.http.get(this.URI + URISection + '/' + id); */

  insert = (URISection : string, row : any) => 
  this.http.post(this.URI + URISection, row);

  /* delete = (URISection : string, id : string | number) => 
  this.http.delete(this.URI + URISection + '/' + id);

  update = (URISection : string, id : string | number, row : any) => 
  this.http.put(this.URI + URISection + '/' + id, row); */
}
