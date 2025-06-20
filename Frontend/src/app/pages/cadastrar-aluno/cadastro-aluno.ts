import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-aluno.html',
  styleUrls: ['./cadastro-aluno.css']
})
export class CadastroAluno {
  isEditing: { [key: string]: boolean } = {};
  anotacoes: string = ''; 

  aluno = {
    nome: 'Arthur Montgomery',
    codigo: 'ALU001', 
    nascimento: '2010-02-14',
    cpf: '123.456.234-23'
  };

  responsavel = {
    nome: 'Rosana Montgomery',
    dataNascimento: '1980-07-26', 
    cpf: '432.123.346-56',
    telefone: '(21)99954-3435'
  };

  endereco = {
    rua: 'Rua das Abóboras',
    numero: 20,
    bairro: 'Jardim Ipê',
    cep: '21462-233',
    cidade: 'Americana',
    complemento: '' 
  };

  escola = {
    nome: 'São Jorge da Glória',
    periodo: 'Tarde',
    linhaVan: 'Linha 03'
  };

  financeiro = {
    mensalidade: 350.00,
    diaPagamento: 10
  };

  toggleEdit(section: string) {
    this.isEditing[section] = !this.isEditing[section];
  }
}