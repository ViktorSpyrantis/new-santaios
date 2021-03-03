import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleDriveHandler } from 'src/providers/googleDriveHandler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private driveHandler: GoogleDriveHandler
  ) {
    this.router.navigate(['/dashboard']);
  }

}


