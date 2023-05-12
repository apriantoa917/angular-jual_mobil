import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../ads.service';
import { Ads } from '../adsModel';
import { AdsInfoComponent } from '../ads-info/ads-info.component';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AdsInfoComponent]
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  adsService = inject(AdsService)
  @Input() adsParams!: Ads

  // ambil ads data yg direquest
  constructor() {
    const adsId = this.route.snapshot.params['id']
    // this.adsData = this.brandService.getCarById(adsId);
    this.adsService.getAdsById(adsId).then(ads => {
      this.adsParams = ads;
      console.log(this.adsParams)
    });
  }

  offeringForm = new FormGroup({
    fullName: new FormControl(''),
    bid: new FormControl(0),
    email: new FormControl('')
  })




  // inisialisasi
  // ngOnInit() {
  //   const dataId = Number(this.route.snapshot.params['id']);
  //   this.adsData = this.brandService.getCarById(dataId)
  //   console.log("boolean: " + this.adsData?.sold);
  // }

  // inject ke service
  submitOffering() {
    this.adsService.submitOffer(
      this.offeringForm.value.fullName ?? '',
      this.offeringForm.value.bid ?? 0,
      this.offeringForm.value.email ?? '',
    )
  }
}
