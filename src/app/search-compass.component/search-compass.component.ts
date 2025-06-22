// search-compass.component.ts
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  data?: any;
}

@Component({
  selector: 'app-search-compass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-compass.component.html',
  styleUrls: ['./search-compass.component.css']
})
export class SearchCompassComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() resultSelected = new EventEmitter<SearchResult>();

  isExpanded = false;
  searchQuery = '';
  filteredResults: SearchResult[] = [];
  selectedIndex = -1;

  // Dicionário de dados para busca
  private searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Arthur Montgomery',
      description: 'Visualize métricas e estatísticas gerais do sistema',
      url: '/dashboard'
    },
    {
      id: '2',
      title: 'Perfil do Usuário',
      description: 'Gerencie suas informações pessoais e configurações',
      url: '/profile'
    },
    {
      id: '3',
      title: 'Relatórios',
      description: 'Acesse relatórios detalhados e análises',
      url: '/reports'
    },
    {
      id: '4',
      title: 'Configurações',
      description: 'Ajuste preferências e configurações do sistema',
      url: '/settings'
    },
    {
      id: '5',
      title: 'Usuários',
      description: 'Gerencie usuários e permissões',
      url: '/users'
    }
  ];

  toggleSearch(): void {
    this.isExpanded = !this.isExpanded;
    
    if (this.isExpanded) {
      // Foca no input após a animação
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      }, 100);
    } else {
      this.resetSearch();
    }
  }

  closeSearch(): void {
    this.isExpanded = false;
    this.resetSearch();
  }

  private resetSearch(): void {
    this.searchQuery = '';
    this.filteredResults = [];
    this.selectedIndex = -1;
  }

  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredResults = [];
      this.selectedIndex = -1;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredResults = this.searchData.filter(item => 
      item.id?.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
    
    this.selectedIndex = -1;
  }

  selectResult(result: SearchResult): void {
    this.resultSelected.emit(result);
    this.closeSearch();
  }

  selectFirstResult(): void {
    if (this.filteredResults.length > 0) {
      this.selectResult(this.filteredResults[0]);
    }
  }

  // Navegação por teclado
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isExpanded || this.filteredResults.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(
          this.selectedIndex + 1, 
          this.filteredResults.length - 1
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
        
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.filteredResults[this.selectedIndex]);
        } else {
          this.selectFirstResult();
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        this.closeSearch();
        break;
    }
  }

  // Fecha a busca ao clicar fora do componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const compassElement = target.closest('.search-compass');
    
    if (!compassElement && this.isExpanded) {
      this.closeSearch();
    }
  }

  // Método para adicionar novos itens ao dicionário (opcional)
  addSearchItem(item: SearchResult): void {
    this.searchData.push(item);
  }

  // Método para remover item do dicionário (opcional)
  removeSearchItem(id: string): void {
    this.searchData = this.searchData.filter(item => item.id !== id);
  }

  // Método para atualizar item do dicionário (opcional)
  updateSearchItem(id: string, updatedItem: Partial<SearchResult>): void {
    const index = this.searchData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.searchData[index] = { ...this.searchData[index], ...updatedItem };
    }
  }

  // Getter para acessar os dados de busca (opcional)
  get searchItems(): SearchResult[] {
    return [...this.searchData];
  }
}