import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beer } from '../beer';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  beer!: Beer;
  id!: number;
  protected unsubscribe = new Subject<void>();
  constructor(
          private route: ActivatedRoute,
          private apiService: ApiService
  ) {
      this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params) => {
        this.id = params.get('id') as any
        if(!this.id) {
          console.log('invalid ID');
          return;
        }
      })
    }

  ngOnInit(): void {
    this.apiService.getBeerById(this.id)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((beer) => {
      console.log(beer);
      this.beer = beer;
    })
  }
}
