import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';

interface Aluno {
  nome: string;
  matricula: string;
  curso: string;
  status: string;
}

@Component({
  selector: 'app-relatorio-alunos-ativos',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './relatorios-alunos-ativos.html',
  styleUrls: ['./relatorios-alunos-ativos.css']
})
export class RelatorioAlunosAtivos {
  alunos: Aluno[] = [];

  gerarTabela() {
    this.alunos = [
      { nome: 'Maria Oliveira', matricula: '2021001', curso: 'Engenharia', status: 'Ativo' },
      { nome: 'João Silva', matricula: '2021002', curso: 'Administração', status: 'Ativo' },
      { nome: 'Carla Souza', matricula: '2021003', curso: 'Direito', status: 'Ativo' }
    ];
  }
}