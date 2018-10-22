import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { List } from '../models/List'

import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

    constructor(private http: Http) { }

    //private serverApi= 'http://localhost:3000';
    private serverApi= 'https://iitonestopdoc.azurewebsites.net/';


    public getAllLists():Observable<List[]> {
      let URI = `${this.serverApi}/iitsummaries/`;
      //let URI = `/iitsummaries/`;
        return this.http.get(URI)
            .map(res => res.json())
            .map(res => <List[]>res.lists);
    }

    public deleteList(listId : string) {
      let URI = `${this.serverApi}/iitsummaries/${listId}`;
      //let URI = `/iitsummaries/${listId}`;
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.delete(URI, {headers: headers})
        .map(res => res.json());
    }

    public get(listId : string):Observable<List> {
      let URI = `${this.serverApi}/iitsummaries/${listId}`;
      //let URI = `/iitsummaries/${listId}`;
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.get(URI)
        .map(res => res.json())
        .map(res => <List>res.item);
    }

    	public addList(list: List) {
         let URI = `${this.serverApi}/iitsummaries/`;
         // let URI = `/iitsummaries/`;
  		let headers = new Headers;
  		 let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
  		headers.append('Content-Type', 'application/json');
  		return this.http.post(URI, body ,{headers: headers})
  		.map(res => res.json());
  	}
}
