import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminAdsCardComponent } from '../admin-ads-card/admin-ads-card.component';
import { AdsCreate } from '../ads-create';
import { AdsResponse } from '../ads-response';
import { AdsService } from '../ads.service';
import { Ads } from '../adsModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [AdminAdsCardComponent, CommonModule, ReactiveFormsModule]
})
export class AdminComponent {
  
  ads: Ads[] = [];
  response!: AdsResponse
  adsService: AdsService = inject(AdsService)
  apiService: ApiService = inject(ApiService)
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(public router: Router) {
    this.initAdsData()
  }

  initAdsData() {
    this.adsService.getAllAds().then((data: AdsResponse) => {
      this.ads = this.adsService.parsingAdsResponse(data);
    });
  }

  // declare variable for connection forms in html template
  newAdsForm = new FormGroup({
    ownerId: new FormControl(0),
    adsName: new FormControl(''),
    adsBrand: new FormControl(''),
    adsDesc: new FormControl(''),
    adsLocation: new FormControl(''),
    adsColor: new FormControl(''),
    adsPhoto: new FormControl(''),
    adsYear: new FormControl(0),
    adsPrice: new FormControl(0),
    adsSold: new FormControl(false)
  })

  postAds() {
    var data: AdsCreate = {
      name: this.newAdsForm.value.adsName ?? '',
      brand: this.newAdsForm.value.adsBrand ?? '',
      year: this.newAdsForm.value.adsYear ?? 0,
      color: this.newAdsForm.value.adsColor ?? '',
      desc: this.newAdsForm.value.adsDesc ?? '',
      location: this.newAdsForm.value.adsLocation ?? '',
      photo: this.newAdsForm.value.adsPhoto ?? '',
      price: this.newAdsForm.value.adsPrice ?? 0,
      sold: this.newAdsForm.value.adsSold ?? false,
      ownerId: this.newAdsForm.value.ownerId ?? 0,
    }
    this.apiService.postAds(data)
  }

  newAds() {
    this.router.navigate([`/admin/ads/new`,])
  }
}
