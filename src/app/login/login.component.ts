import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Auth } from '../auth';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth: Auth[] = [];
  authLogin!: Auth;
  protected unsubscribe = new Subject<void>();

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.login();
  }


  login() {
      this.api.getAuth()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        this.auth = result;
        if(this.authLogin.answer === 'yes') {
          this.router.navigateByUrl('/beer')
          console.log('logged in')
        }
          else {
            console.log('not logged in');
          }
      });
  }
}
