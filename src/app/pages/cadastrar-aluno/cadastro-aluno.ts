import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from "../../sidebar/sidebar";

interface Aluno {
  nome: string;
  codigo: string;
  nascimento: string;
  cpf: string;
  rg?: string; // Adicionado RG
}

interface Responsavel {
  nome: string;
  dataNascimento: string;
  cpf: string;
  telefone: string;
}

interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  complemento?: string;
}

interface Escola {
  nome: string;
  periodo: string;
  linhaVan: string;
}

interface Financeiro {
  mensalidade: number;
  diaPagamento: number;
}


@Component({
  selector: 'app-listagem-alunos',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './cadastro-aluno.html',
  styleUrls: ['./cadastro-aluno.css']
})
export class CadastroAluno {
  aluno: Aluno = {
    nome: 'Arthur Montgomery',
    codigo: '20250400001',
    nascimento: '14/02/2010',
    cpf: '123.456.234-23',
    rg: '12.345.567-78' 
  };

  responsavel: Responsavel = {
    nome: 'Rosana Montgomery',
    dataNascimento: '26/07/1980',
    cpf: '432.123.346-56',
    telefone: '(21)99954-3435'
  };

  endereco: Endereco = {
    rua: 'Rua das Abóboras',
    numero: '20',
    bairro: 'Jardim Ipê',
    cep: '21462-233',
    cidade: 'Americana',
    complemento: ''
  };

  escola: Escola = {
    nome: 'São Jorge da Glória',
    periodo: 'Tarde',
    linhaVan: 'Linha 03'
  };

  financeiro: Financeiro = {
    mensalidade: 350.00,
    diaPagamento: 10
  };

  anotacoes: string = '';

  showEditAlunoPopup: boolean = false;
  editedAluno: Aluno = { ...this.aluno };
  confirmChanges: boolean = false; // Variável para o checkbox de confirmação

  constructor() { }

  openEditAlunoPopup(): void {
    this.editedAluno = { ...this.aluno };
    this.confirmChanges = false; // Reseta o checkbox ao abrir
    this.showEditAlunoPopup = true;
  }

  closeEditAlunoPopup(): void {
    this.showEditAlunoPopup = false;
  }

  saveAlunoChanges(): void {
    if (!this.confirmChanges) {
      alert('Por favor, confirme as alterações antes de atualizar.');
      return;
    }
    // Aqui você faria a validação dos dados se necessário
    this.aluno = { ...this.editedAluno };

    // Lógica para salvar no backend (ex: serviço HTTP) viria aqui
    console.log('Dados do aluno atualizados:', this.aluno);

    this.closeEditAlunoPopup();
  }
}