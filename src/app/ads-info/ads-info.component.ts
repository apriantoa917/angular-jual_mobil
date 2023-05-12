import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ads } from '../adsModel';

@Component({
  selector: 'app-ads-info',
  templateUrl: './ads-info.component.html',
  styleUrls: ['./ads-info.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdsInfoComponent {

  @Input() adsData!: Ads

  constructor() {

  }
}
