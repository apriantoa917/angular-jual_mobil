import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Ads } from '../adsModel';
import { RouterModule, Router } from '@angular/router';
import { AdsService } from '../ads.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AdsCreate } from '../ads-create';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-admin-ads-card',
  templateUrl: './admin-ads-card.component.html',
  styleUrls: ['./admin-ads-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminAdsCardComponent {
  @Input() ads!: Ads

  apiService = inject(ApiService)



  constructor(public router: Router) { }

  viewAds() {
    this.router.navigate([`/details/${this.ads.id}`])
  }



  editAds() {
    // alert(`Anda mengedit iklan ${this.ads.name}`)
    this.router.navigate([`/admin/ads/edit/${this.ads.id}`,])
  }

  deleteAds() {
    this.apiService.removeAds(this.ads)
    
  }
}
