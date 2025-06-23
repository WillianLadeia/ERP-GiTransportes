import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';

interface Funcionario {
  id: number;
  cargo: string;
  nome: string;
  dataNascimento: string;
  rg: string;
  sexo: string;
  cpf: string;
  estadoCivil: string;
  celular1: string;
  email: string;
  celular2?: string; 
  status: string;
  expanded: boolean; 
}

@Component({
  selector: 'app-listagem-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, SearchCompassComponent],
  templateUrl: './listagem-funcionarios.html',
  styleUrls: ['./listagem-funcionarios.css']
})
export class FuncionariosLista implements OnInit {
  filtroNome: string = '';
  showFiltros: boolean = false;
  allFuncionarios: Funcionario[] = []; 
  funcionariosExibidos: Funcionario[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 3; 
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.allFuncionarios = [ 
      {
        id: 1,
        cargo: 'Motorista',
        nome: 'João da Silva',
        dataNascimento: '10/05/1985',
        rg: '12.345.678-9',
        sexo: 'Masculino',
        cpf: '123.456.789-00',
        estadoCivil: 'Casado',
        celular1: '(11) 98765-4321',
        email: 'joao.silva@email.com',
        celular2: '(11) 91234-5678',
        status: 'Ativo',
        expanded: false
      },
      {
        id: 2,
        cargo: 'Monitora',
        nome: 'Maria Oliveira',
        dataNascimento: '22/11/1990',
        rg: '98.765.432-1',
        sexo: 'Feminino',
        cpf: '009.876.543-21',
        estadoCivil: 'Solteira',
        celular1: '(21) 99876-1234',
        email: 'maria.o@email.com',
        status: 'Ativo',
        expanded: false
      },
      {
        id: 3,
        cargo: 'Motorista',
        nome: 'Carlos Souza',
        dataNascimento: '01/01/1978',
        rg: '11.222.333-4',
        sexo: 'Masculino',
        cpf: '112.233.445-56',
        estadoCivil: 'Divorciado',
        celular1: '(31) 97654-8765',
        email: 'carlos.s@email.com',
        status: 'Inativo',
        expanded: false
      },
      {
        id: 4,
        cargo: 'Monitora',
        nome: 'Ana Pereira',
        dataNascimento: '15/03/1995',
        rg: '23.456.789-0',
        sexo: 'Feminino',
        cpf: '234.567.890-12',
        estadoCivil: 'Casada',
        celular1: '(41) 99123-4567',
        email: 'ana.p@email.com',
        status: 'Ativo',
        expanded: false
      },
      {
        id: 5,
        cargo: 'Motorista',
        nome: 'Pedro Lima',
        dataNascimento: '30/09/1980',
        rg: '34.567.890-1',
        sexo: 'Masculino',
        cpf: '345.678.901-23',
        estadoCivil: 'Solteiro',
        celular1: '(51) 98765-4321',
        email: 'pedro.l@email.com',
        status: 'Ativo',
        expanded: false
      }
    ];
    this.updateFuncionariosList(); 
  }

  toggleFiltros(): void {
    this.showFiltros = !this.showFiltros;
  }

  cadastrarFuncionario(): void {
    console.log('Botão Cadastrar Funcionário clicado!');
    alert('Funcionalidade de cadastrar funcionário será implementada aqui!');
  }

  toggleExpand(funcionario: Funcionario): void {
    funcionario.expanded = !funcionario.expanded;
  }

  updateFuncionariosList(): void {
    const filtered = this.filtroNome
      ? this.allFuncionarios.filter(f =>
          f.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) ||
          f.cargo.toLowerCase().includes(this.filtroNome.toLowerCase())
        )
      : this.allFuncionarios;

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 0; 
    }
    
    if (this.currentPage === 0 && filtered.length > 0) {
        this.currentPage = 1;
    }


    const startIndex = (this.currentPage - 1) * this.itemsPerPage; 
    const endIndex = startIndex + this.itemsPerPage;
    this.funcionariosExibidos = filtered.slice(startIndex, endIndex);
  }

  
  onSearch(): void {
    this.currentPage = 1; 
    this.updateFuncionariosList();
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5; 
    let startPage: number, endPage: number;

    if (this.totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        startPage = this.totalPages - maxPagesToShow + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFuncionariosList();
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}