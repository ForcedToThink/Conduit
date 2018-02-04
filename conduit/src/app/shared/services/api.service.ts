import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  constructor (private http: Http) {}

  private setHeaders() {
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headerConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    const url = environment.api_url + path;
    return this.http.post(`${url}`, JSON.stringify(body), { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}
