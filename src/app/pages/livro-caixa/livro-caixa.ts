import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';


interface LivroCaixaItem {
  tipo: string;
  data: string;
  valor: string;
  categoria: string;
  observacao: string;
  id: string;
}

@Component({
  selector: 'app-livro-caixa',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, SearchCompassComponent],
  templateUrl: './livro-caixa.html',
  styleUrls: ['./livro-caixa.css']
})
export class LivroCaixa {
  filtro = '';
  paginaAtual = 0;
  itensPorPagina = 5;
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 3;
  itemsPerPage: number = 10;

  itens: LivroCaixaItem[] = [
    { tipo: 'Recebimento', data: '12/12/2012', valor: 'R$300,00', categoria: 'Mensalidade', observacao: '------------------------------', id: 'RM0051' },
    { tipo: 'Pagamento', data: '11/11/2011', valor: 'R$100,00', categoria: 'Manutenção', observacao: 'Troca de óleo', id: 'MT0021' },
    // Adicione mais itens se quiser testar a paginação
  ];

  filteredLivroCaixaItems: LivroCaixaItem[] = [];
  displayedLivroCaixaItems: LivroCaixaItem[] = [];

  get paginas() {
    return Array(Math.ceil(this.itensFiltrados().length / this.itensPorPagina)).fill(0);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredLivroCaixaItems = [...this.itens];
    } else {
      this.filteredLivroCaixaItems = this.itens.filter(item =>
        item.tipo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.observacao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updateDisplayedRegisters();
  }

  toggleSchool(index: number): void {
    const actualIndex = this.itens.findIndex(item => 
      item.id === this.displayedLivroCaixaItems[index].id
    );
    if (actualIndex !== -1) {
      this.updateDisplayedRegisters();
    }
  }

  updateDisplayedRegisters(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedLivroCaixaItems = this.filteredLivroCaixaItems.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredLivroCaixaItems.length / this.itemsPerPage);
  }

  itensFiltrados() {
    const filtroLower = this.filtro.toLowerCase();
    return this.itens.filter(item =>
      Object.values(item).some(valor =>
        valor && valor.toString().toLowerCase().includes(filtroLower)
      )
    );
  }

  itensPaginados() {
    const inicio = this.paginaAtual * this.itensPorPagina;
    return this.itensFiltrados().slice(inicio, inicio + this.itensPorPagina);
  }

  nextPage() {
    if (this.paginaAtual < this.paginas.length - 1) this.paginaAtual++;
  }

  previousPage() {
    if (this.paginaAtual > 0) this.paginaAtual--;
  }

  setPage(index: number) {
    this.paginaAtual = index;
  }

  toggleFiltros() {
    alert('Filtros adicionais podem ser implementados aqui.');
  }

  registrarRecebimento() {
    alert('Abrir modal de novo recebimento...');
  }

  registrarPagamento() {
    alert('Abrir modal de novo pagamento...');
  }

  editar(item: LivroCaixaItem) {
    alert('Editar item: ' + item.id);
  }

  reverter(item: LivroCaixaItem) {
    alert('Reverter item: ' + item.id);
  }
}
