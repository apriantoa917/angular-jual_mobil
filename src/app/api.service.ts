import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ads } from './adsModel';
import { catchError, Observable, of, tap } from 'rxjs';
import { AdsCreate } from './ads-create';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public router: Router) { }

  postAds(ads: AdsCreate) {
    const insertUrl = 'https://jual-mobil-com-default-rtdb.firebaseio.com/ads.json'
    var message = `DATA SUDAH BENAR ?
    ==================
    TITLE -> ${ads.name}
    BRAND -> ${ads.brand}
    YEAR -> ${ads.year}
    COLOR -> ${ads.color}
    DESC -> ${ads.desc}
    LOCATION -> ${ads.location}
    PHOTO -> ${ads.photo}
    PRICE -> ${ads.price}
    SOLD -> ${ads.sold}
    OWNER -> ${ads.ownerId}`
    console.log(ads)
    if (confirm(message)) {
      this.http.post<Ads>(insertUrl, ads, this.httpOptions).pipe(
        tap((insertedData: Ads) => {
          alert(`data '${ads.name}' berhasil diinputkan`)
          this.router.navigateByUrl('/admin')
        }),
        catchError(this.handleError<Ads>("Insert new Ads"))).subscribe(inserted => { console.log(inserted) })
    }
  }

  updateAds(adsId: string, ads: AdsCreate) {
    const updateUrl = `https://jual-mobil-com-default-rtdb.firebaseio.com/ads/${adsId}.json`
    var message = `DATA SUDAH BENAR ?
    ==================
    TITLE -> ${ads.name}
    BRAND -> ${ads.brand}
    YEAR -> ${ads.year}
    COLOR -> ${ads.color}
    DESC -> ${ads.desc}
    LOCATION -> ${ads.location}
    PHOTO -> ${ads.photo}
    PRICE -> ${ads.price}
    SOLD -> ${ads.sold}
    OWNER -> ${ads.ownerId}
    url -> ${updateUrl}`
    if (confirm(message)) {
      this.http.put<Ads>(updateUrl, ads, this.httpOptions).pipe(
        tap((insertedData: Ads) => {
          alert(`data '${ads.name}' berhasil diupdate`)
          this.router.navigateByUrl('/admin')
        }),
        catchError(this.handleError<Ads>("Insert new Ads"))).subscribe(inserted => { console.log(inserted) })
    }
  }

  removeAds(ads: Ads) {
    const updateUrl = `https://jual-mobil-com-default-rtdb.firebaseio.com/ads/${ads.id}.json`
    var message = `Apakah anda ingin menghapus iklan '${ads.name}' ?`
    if (confirm(message)) {
      this.http.delete(updateUrl, this.httpOptions).subscribe(deleted => {
        alert(`Data '${ads.name}' berhasil dihapus`)
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      })
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
