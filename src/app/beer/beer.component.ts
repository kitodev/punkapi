import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Beer} from '../beer';
import { Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {
  protected unsubscribe = new Subject<void>();
  beers: Beer[] = [];
  data: any;
  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers() {
    this.api.getBeers()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(result => {
      this.beers = result;
    });
  }

  // search(value: string, $event: Event) {
  //   $event.preventDefault();

  //   this.beers = [];

  //   if (value.length === 0) {
  //     this.getBeers();
  //     return;
  //   }

  //   this.api.getBeerByName(value)
  //     .subscribe(resp => {
  //     console.log(resp);

  //     for (const b of resp.body) {
  //       this.beers.push(b);
  //     }

  //     console.log(this.beers);
  //   });
  // }
}
