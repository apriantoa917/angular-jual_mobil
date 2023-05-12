import { Component, inject, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsCardComponent } from '../ads-card/ads-card.component';
import { AdsService } from '../ads.service';
import { Ads } from '../adsModel';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, scan, startWith, tap } from 'rxjs/operators';
import { AdsResponse } from '../ads-response';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    AdsCardComponent,
    FormsModule,
    ReactiveFormsModule, RouterLink],
})
export class HomeComponent {
  ads: Ads[] = []
  adsService: AdsService = inject(AdsService);
  searchedAds: Ads[] = []
  adsResponse!: AdsResponse

  constructor() {
    // this.ads = this.brandService.getAllCarBrands();
    // this.searchedAds = this.ads
    // this.adsService.getAllAds().then((data: Ads[]) => {
    //   this.ads = data;
    //   this.searchedAds = data;
    // });

    this.adsService.getAllAds().then((data: AdsResponse) => {
      let parsedAds = this.adsService.parsingAdsResponse(data)
      this.ads = parsedAds;
      this.searchedAds = parsedAds;
    });



  }


  searchAds(keyword: string) {
    if (!keyword) { this.searchedAds = this.ads }
    this.searchedAds = this.ads.filter(ads => ads?.name.toLowerCase().includes(keyword.toLowerCase()))
  }

  onSearchChange(updatesKeyword: string): void { this.searchAds(updatesKeyword) }
}