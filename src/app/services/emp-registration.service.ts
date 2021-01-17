import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmpRegistrationService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    
  }



  public getAllData(): Observable<Employee[]> {

    return this.http.get<Employee[]>(environment.API_BASE_URL + '/api/v1/all');
  }

  public saveData(employee: Employee): Observable<Employee> {

    const body = JSON.stringify(employee);

    let params = new HttpParams();
    // params = params.append('Content-Type', 'application/json');

    return this.http.post<Employee>(environment.API_BASE_URL + "/api/v1/save", body,this.httpOptions);
  }
}
