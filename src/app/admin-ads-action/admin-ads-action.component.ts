import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { AdsCreate } from '../ads-create';
import { AdsService } from '../ads.service';
import { Ads } from '../adsModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-ads-action',
  templateUrl: './admin-ads-action.component.html',
  styleUrls: ['./admin-ads-action.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class AdminAdsActionComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  adsService = inject(AdsService)
  apiService = inject(ApiService)
  ads?: Ads
  adsId!: string
  action: string
  previewImageUrl: string = ''
  defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs6KcaGbyCE_GE4OmlaB2Z90bH0Y9YuF0fdf0HUchb2AEuEXS1woxAxq9xwBrBN_BUkvc&usqp=CAU'

  constructor(private titleService: Title) {
    let path = this.route.snapshot.paramMap
    this.adsId = path.get('id') ?? ''
    this.action = path.get('action') ?? 'new'
    this.initEdit(this.adsId)
  }

  // declare variable for connection forms in html template
  adsForm = new FormGroup({
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

  initEdit(adsId: string) {
    this.adsService.getAdsById(adsId).then(ads => {
      this.ads = ads
      this.adsForm.patchValue({
        ownerId: ads.ownerId,
        adsName: ads.name,
        adsBrand: ads.brand,
        adsYear: ads.year,
        adsColor: ads.color,
        adsLocation: ads.location,
        adsPhoto: ads.photo,
        adsPrice: ads.price,
        adsDesc: ads.desc
      })
      console.log(ads)
      if (this.action == 'new') {
        this.previewImageUrl = this.defaultImageUrl
        this.titleService.setTitle('Admin | Buat Iklan Baru')
      } else {
        this.previewImageUrl = ads.photo
        this.titleService.setTitle('Admin | Ubah Iklan')
      }
    });
  }
  previewAdsImage(photoUrl: string) {
    if (photoUrl === '') {
      this.previewImageUrl = this.defaultImageUrl
    } else {
      this.previewImageUrl = photoUrl
    }

  }

  submittedForm() {
    var data: AdsCreate = {
      name: this.adsForm.value.adsName ?? '',
      brand: this.adsForm.value.adsBrand ?? '',
      year: this.adsForm.value.adsYear ?? 0,
      color: this.adsForm.value.adsColor ?? '',
      desc: this.adsForm.value.adsDesc ?? '',
      location: this.adsForm.value.adsLocation ?? '',
      photo: this.adsForm.value.adsPhoto ?? '',
      price: this.adsForm.value.adsPrice ?? 0,
      sold: this.adsForm.value.adsSold ?? false,
      ownerId: this.adsForm.value.ownerId ?? 0,
    }
    if (this.action == 'new') {
      this.apiService.postAds(data)
    } else if (this.action == 'edit') {
      this.apiService.updateAds(this.adsId, data)
    }

  }
}
