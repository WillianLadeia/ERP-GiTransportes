import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';

interface Funcionario {
  nome: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  estadoCivil: string;
  celular1: string;
  celular2: string;
  email: string;
  status: string;
  cargo: string;
  expanded: boolean;
}

@Component({
  selector: 'app-funcionarios-list',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './listagem-funcionarios.html',
  styleUrls: ['./listagem-funcionarios.css']
})
export class FuncionariosLista {
  filtroNome = '';
  showFiltros = false;
  currentPage = 0;
  itemsPerPage = 2;

  funcionarios: Funcionario[] = [
    {
      nome: 'João das Dores Filomeno',
      rg: '12.345.456-78',
      cpf: '123.456.789-10',
      dataNascimento: '01/02/2003',
      sexo: 'Masculino',
      estadoCivil: 'Solteiro',
      celular1: '(19) 98731-1273',
      celular2: '(19) 98128-1238',
      email: 'joaodores@gmail.com',
      status: 'Ativo',
      cargo: 'Motorista 2',
      expanded: false
    },
    {
      nome: 'Outro Funcionário',
      rg: '11.222.333-44',
      cpf: '555.666.777-88',
      dataNascimento: '15/05/1990',
      sexo: 'Feminino',
      estadoCivil: 'Casado',
      celular1: '(19) 99999-9999',
      celular2: '(19) 88888-8888',
      email: 'outro@gmail.com',
      status: 'Ativo',
      cargo: 'Motorista 1',
      expanded: false
    }
  ];

  toggleFiltros() {
    this.showFiltros = !this.showFiltros;
  }

  cadastrarFuncionario() {
    alert('Cadastro de novo funcionário...');
  }

  toggleExpand(funcionario: Funcionario) {
    funcionario.expanded = !funcionario.expanded;
  }

  funcionariosFiltrados() {
    const inicio = this.currentPage * this.itemsPerPage;
    const fim = inicio + this.itemsPerPage;
    return this.funcionarios
      .filter(f => f.nome.toLowerCase().includes(this.filtroNome.toLowerCase()))
      .slice(inicio, fim);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.funcionarios.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}