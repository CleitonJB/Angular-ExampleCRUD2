import { Component, OnInit } from '@angular/core';

//meus imports
import { ProdutoService } from './services/produto.service';
import { Produto } from './models/produto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projetoCrud2';

  produto = {} as Produto;
  produtos: Produto[];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.getProdutos();
  }

  //define se o produto será atualizado ou criado
  atualizaProduto(form: NgForm){
    if(this.produto.TABPROD_seq_tabprod !== undefined){
      this.produtoService.editarProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }else{
      this.produtoService.cadastrarProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //obter todos os produtos
  getProdutos(){
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  //deletar um produto
  excluiProduto(produto: Produto){
    this.produtoService.excluirProduto(produto).subscribe(() => {
      this.getProdutos();
    });
  }

  //buscar produto para ser editado
  editarProduto(produto: Produto){
    this.produto = { ...produto };
  }

  //limpar formulário
  cleanForm(form: NgForm){
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produto;
  }
}
