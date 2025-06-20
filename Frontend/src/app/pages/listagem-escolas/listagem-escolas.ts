import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Escola {
  nome: string;
  endereco: {
    rua?: string;
    numero?: number;
    bairro?: string;
    cep?: string;
    cidade?: string;
    complemento?: string;
  };
  periodos: string[];
  vans: string[];
  expandido?: boolean;
}

@Component({
  selector: 'app-escolas-listagem',
  imports: [CommonModule, FormsModule],
  templateUrl: './listagem-escolas.html',
  styleUrls: ['./listagem-escolas.css']
})
export class EscolasListagem {
  escolas: Escola[] = [
    {
      nome: 'Escola 1',
      endereco: {},
      periodos: [],
      vans: [],
      expandido: false
    },
    {
      nome: 'Escola 2',
      endereco: {
        rua: 'Rua Albuquerque de Lacerda',
        numero: 1738,
        bairro: 'Jardim das Beterrabas',
        cep: '12.345-678',
        cidade: 'Sumaré',
        complemento: 'Em cima'
      },
      periodos: ['Manhã', 'Tarde', 'Noite'],
      vans: ['Van 1', 'Van 2'],
      expandido: false
    },
    {
      nome: 'Escola 3',
      endereco: {},
      periodos: [],
      vans: [],
      expandido: false
    }
  ];

  escolasFiltradas: Escola[] = [...this.escolas];
  paginaAtual = 1;

  toggleExpandir(escola: Escola): void {
    escola.expandido = !escola.expandido;
  }

  buscar(term: string): void {
    const termo = term.toLowerCase();
    this.escolasFiltradas = this.escolas.filter(e =>
      e.nome.toLowerCase().includes(termo)
    );
  }
}
