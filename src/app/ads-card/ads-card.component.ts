import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ads } from '../adsModel';
import { RouterModule, Router } from '@angular/router';
import { AdsResponse } from '../ads-response';

@Component({
  selector: 'ads-card',
  templateUrl: './ads-card.component.html',
  styleUrls: ['./ads-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class AdsCardComponent {
  @Input() ads!: Ads;

  constructor(public router: Router) { }


  viewDetails(adsId: string) {
    this.router.navigate([`/details/${adsId}`])
  }

}
