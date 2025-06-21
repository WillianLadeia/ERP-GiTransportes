import { Component, OnInit } from '@angular/core';

// Adicione esta exportação para o roteamento
export { EscolasComponent as EscolasListagem };
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
}

export interface Escola {
  id: number;
  nome: string;
  endereco: Endereco;
  periodos: string[];
  vans: string[];
  expanded?: boolean;
}

@Component({
  selector: 'app-escolas',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './listagem-escolas.html',
  styleUrls: ['./listagem-escolas.css']
})
export class EscolasComponent implements OnInit {
  userName: string = 'Valéria da Silva Santos';
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 3;
  itemsPerPage: number = 10;
  
  schools: Escola[] = [
    {
      id: 1,
      nome: 'Escola 1',
      endereco: {
        rua: 'Rua Principal, 123',
        numero: '123',
        bairro: 'Centro',
        cep: '12345-678',
        cidade: 'São Paulo',
        complemento: 'Próximo ao shopping'
      },
      periodos: ['Manhã', 'Tarde', 'Noite'],
      vans: ['Van 1', 'Van 2'],
      expanded: false
    },
    {
      id: 2,
      nome: 'Escola 2',
      endereco: {
        rua: 'Rua Albuquerque de Lacerda',
        numero: '1738',
        bairro: 'Jardim das Beterrabas',
        cep: '12.345-678',
        cidade: 'Sumaré',
        complemento: 'Em cima'
      },
      periodos: ['Manhã', 'Tarde', 'Noite'],
      vans: ['Van 1', 'Van 2'],
      expanded: false
    },
    {
      id: 3,
      nome: 'Escola 3',
      endereco: {
        rua: 'Rua das Flores, 456',
        numero: '456',
        bairro: 'Jardim América',
        cep: '54321-987',
        cidade: 'Campinas',
        complemento: 'Ao lado da praça'
      },
      periodos: ['Manhã', 'Tarde'],
      vans: ['Van 3'],
      expanded: false
    }
  ];

  filteredSchools: Escola[] = [];
  displayedSchools: Escola[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredSchools = [...this.schools];
    this.updateDisplayedSchools();
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredSchools = [...this.schools];
    } else {
      this.filteredSchools = this.schools.filter(school =>
        school.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        school.endereco.rua.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        school.endereco.bairro.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        school.endereco.cidade.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updateDisplayedSchools();
  }

  toggleSchool(index: number): void {
    const actualIndex = this.schools.findIndex(school => 
      school.id === this.displayedSchools[index].id
    );
    if (actualIndex !== -1) {
      this.schools[actualIndex].expanded = !this.schools[actualIndex].expanded;
      this.updateDisplayedSchools();
    }
  }

  toggleFilters(): void {
    // Implementar lógica de filtros
    console.log('Toggle filters');
  }

  cadastrarEscola(): void {
    // Implementar lógica para cadastrar nova escola
    console.log('Cadastrar nova escola');
  }

  editarEscola(escola: Escola): void {
    // Implementar lógica para editar escola
    console.log('Editar escola:', escola);
  }

  updateDisplayedSchools(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedSchools = this.filteredSchools.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredSchools.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedSchools();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedSchools();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedSchools();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}