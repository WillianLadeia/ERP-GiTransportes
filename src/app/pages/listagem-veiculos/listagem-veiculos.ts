import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from "../../sidebar/sidebar";

interface Veiculo {
  nome: string;
  placa?: string;
  modelo?: string;
  capacidade?: number;
  identificacao?: string;
  anoFabricacao?: number;
  dataAquisicao?: string;
  expandido?: boolean;
}

@Component({
  selector: 'app-veiculos-listagem',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './listagem-veiculos.html',
  styleUrls: ['./listagem-veiculos.css']
})
export class VeiculosListagem {
  veiculos: Veiculo[] = [
    { nome: 'Veículo 1', expandido: false },
    {
      nome: 'Veículo 2',
      placa: 'GYR-1845',
      modelo: 'L74',
      capacidade: 16,
      identificacao: 'A1B2C3',
      anoFabricacao: 2012,
      dataAquisicao: '15/07/2014',
      expandido: false
    },
    { nome: 'Veículo 3', expandido: false },
    { nome: 'Veículo 4', expandido: false },
    { nome: 'Veículo 5', expandido: false },
    { nome: 'Veículo 6', expandido: false }
  ];

  veiculosFiltrados: Veiculo[] = [...this.veiculos];
  paginaAtual = 1;
  itensPorPagina = 6;
  paginas: number[] = [];

  constructor() {
    this.calcularPaginas();
  }

  toggleExpandir(veiculo: Veiculo): void {
    veiculo.expandido = !veiculo.expandido;
  }

  buscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input.value;
    const termo = term.toLowerCase();

    this.veiculosFiltrados = this.veiculos.filter(v =>
      v.nome.toLowerCase().includes(termo)
    );
    this.paginaAtual = 1;
    this.calcularPaginas();
  }

  itensPaginados(): Veiculo[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.veiculosFiltrados.slice(inicio, fim);
  }

  calcularPaginas(): void {
    const totalPaginas = Math.ceil(this.veiculosFiltrados.length / this.itensPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  previousPage(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  nextPage(): void {
    if (this.paginaAtual < this.paginas.length) {
      this.paginaAtual++;
    }
  }

  setPage(pageIndex: number): void {
    this.paginaAtual = pageIndex + 1;
  }
}