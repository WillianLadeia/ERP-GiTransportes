import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from "../../sidebar/sidebar";
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';


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
  imports: [CommonModule, FormsModule, Sidebar, SearchCompassComponent],
  templateUrl: './listagem-veiculos.html',
  styleUrls: ['./listagem-veiculos.css']
})
export class VeiculosListagem {
  veiculos: Veiculo[] = [
    {
      nome: 'Van 1',
      placa: 'ABC-1234',
      modelo: 'Mercedes-Benz Sprinter',
      capacidade: 15,
      identificacao: 'V1A2B3',
      anoFabricacao: 2018,
      dataAquisicao: '20/03/2019',
      expandido: false
    },
    {
      nome: 'Van 2',
      placa: 'GYR-1845',
      modelo: 'Fiat Ducato',
      capacidade: 16,
      identificacao: 'V4C5D6',
      anoFabricacao: 2012,
      dataAquisicao: '15/07/2014',
      expandido: false
    },
    {
      nome: 'Van 3',
      placa: 'QWE-0987',
      modelo: 'Renault Master',
      capacidade: 18,
      identificacao: 'V7E8F9',
      anoFabricacao: 2021,
      dataAquisicao: '10/01/2022',
      expandido: false
    },
    {
      nome: 'Van 4',
      placa: 'ERT-5678',
      modelo: 'Ford Transit',
      capacidade: 12,
      identificacao: 'V0G1H2',
      anoFabricacao: 2020,
      dataAquisicao: '05/11/2020',
      expandido: false
    },
    {
      nome: 'Van 5',
      placa: 'ZXC-4321',
      modelo: 'Hyundai H100',
      capacidade: 10,
      identificacao: 'V3I4J5',
      anoFabricacao: 2022,
      dataAquisicao: '22/08/2023',
      expandido: false
    },
    {
      nome: 'Van 6',
      placa: 'VBN-7890',
      modelo: 'Peugeot Boxer',
      capacidade: 17,
      identificacao: 'V6K7L8',
      anoFabricacao: 2019,
      dataAquisicao: '01/04/2019',
      expandido: false
    }
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
      v.nome.toLowerCase().includes(termo) ||
      v.placa?.toLowerCase().includes(termo) ||
      v.modelo?.toLowerCase().includes(termo)
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