import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TodoItem} from "../models/TodoItem";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class TodoService{


  constructor(private httpClient: HttpClient) {
  }


  getAll(): Observable<TodoItem[]>{
    return this.httpClient.get<TodoItem[]>(environment.api.baseUrl + 'api/GetAll');
  }

  create(obj: TodoItem){
    return this.httpClient.post<TodoItem>(environment.api.baseUrl + 'api/Save',obj);
  }

  delete(obj: TodoItem) {
   return this.httpClient.delete(environment.api.baseUrl + 'api/Delete', {body: obj});

  }

  update(todo: TodoItem) {
    return this.httpClient.put<TodoItem>(environment.api.baseUrl + 'api/Update',todo);
  }
}
