import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleDriveHandler {

  constructor(public http: HttpClient) { }

}