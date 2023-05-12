import { Injectable } from '@angular/core';
import { AdsResponse } from './ads-response';
import { Ads } from './adsModel';

@Injectable({
  providedIn: 'root'
})
export class AdsService {



  url = 'https://jual-mobil-com-default-rtdb.firebaseio.com/ads.json'

  async getAllAds(): Promise<AdsResponse> {
    const data = await fetch(this.url)
    return await data.json() ?? []
  }

  async getAdsById(adsId: string): Promise<Ads> {
    const url = `https://jual-mobil-com-default-rtdb.firebaseio.com/ads/${adsId}.json`
    // const data = await fetch(`${this.url}/${adsId}`)
    const data = await fetch(url)
    return await data.json() ?? {}
  }

  submitOffer(fullName: string, bid: number, email: string) {
    console.log(`Nama Lengkap : ${fullName} \n Harga Penawaran : ${bid} \n Email : ${email}`)
    alert(`RECAP \n============== \nNama Lengkap : ${fullName} \n Harga Penawaran : ${bid} \n Email: ${email} `)
  }

 

  parsingAdsResponse(response: AdsResponse): Ads[] {
    let parsedAds: Ads[] = []
    for (let adsId in response) {
      type ObjectKey = keyof typeof response;
      var currentAds = response[adsId as ObjectKey]
      let _ads: Ads = {
        id: adsId,
        name: currentAds.name,
        brand: currentAds.brand,
        year: currentAds.year,
        color: currentAds.color,
        desc: currentAds.desc,
        location: currentAds.location,
        photo: currentAds.photo,
        price: currentAds.price,
        sold: currentAds.sold,
        ownerId: currentAds.ownerId,
      }
      parsedAds.push(_ads)
    }
    return parsedAds
  }

}
