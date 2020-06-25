import { Injectable } from '@angular/core';
//meus imports
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Produto } from './../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  //link para a API(back-end)
  url = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/";

  //Injeção dos métodos http(get, post, put, delete...)
  constructor(private http: HttpClient) { }

  //Header(cabeçalho com tipagem de dados para métodos que necessitam)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'applicantion/json' })
  }

  //Obter todos os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url + 'Produtos_SelecionarTodos_Get')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Obter produto pelo identificador(id)
  getProdutoid(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.url + 'Produtos_SelecionarTodos_Get/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Cadastrar um novo produto
  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url + 'Produtos_Incluir_Post', JSON.stringify(produto), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Editar um produto
  editarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.url + 'Produtos_Alterar_Post/' + produto.TABPROD_seq_tabprod, JSON.stringify(produto), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Deletar um produto
  excluirProduto(produto: Produto): Observable<Produto> {
    return this.http.delete<Produto>(this.url + 'Produtos_Selecionar_Get/' + produto.TABPROD_seq_tabprod, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Gerenciador de erros(caso ocorra algum)
  handleError(error: HttpErrorResponse){
    //variavel para receber o erro
    let errorMensagem = '';

    if(error.error instanceof ErrorEvent){
      //Erro no lado do cliente
      errorMensagem = 'Cliente error: ' + error.error.message;
    }else{
      //Erro no lado do servidor
      errorMensagem = 'Server error: ' + `Código do erro ${error.status}, ` + `mensagem: ${error.message}`;
    }

    console.log(errorMensagem);
    return throwError(errorMensagem);
  };
}
