import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }
// **Métodos Http**

//Método GET: Aqui busca todos os temas:
  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://willihane.herokuapp.com/temas', this.token)
  }

              //Aqui busca por id do tema:
  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://willihane.herokuapp.com/temas/${id}`, this.token)
  }

//Método POST: Aqui insere novos temas:
postTema(tema: Tema): Observable<Tema>{
  return this.http.post<Tema>('https://willihane.herokuapp.com/temas', tema,this.token)
}

//Método PUT: Aqui atualiza por tema:
putTema(tema: Tema): Observable<Tema>{
  return this.http.put<Tema>('https://willihane.herokuapp.com/temas', tema, this.token)
}

//Método DELETE: Aqui exclui:
deleteTema(id: number): Observable<Object> {
  return this.http.delete(`https://willihane.herokuapp.com/temas/${id}`, this.token)
}

}
