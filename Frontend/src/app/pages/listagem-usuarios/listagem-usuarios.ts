import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  nome: string;
  status: string;
  permissoes: { [key: string]: boolean };
  expandido: boolean;
}

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: 'listagem-usuarios.html',
  styleUrls: ['listagem-usuarios.css']
})
export class UsuariosListagem {
  filtro = '';
  paginaAtual = 0;
  itensPorPagina = 5;

  permissoes = ['Administrativo', 'Financeiro', 'Fiscal', 'Sistema (admin)'];

  usuarios: Usuario[] = [
    {
      nome: 'Usuário_1',
      status: 'Ativo',
      permissoes: { Administrativo: true, Financeiro: false, Fiscal: false, 'Sistema (admin)': false },
      expandido: false
    },
    {
      nome: 'Usuário_2',
      status: 'Ativo',
      permissoes: { Administrativo: true, Financeiro: true, Fiscal: true, 'Sistema (admin)': false },
      expandido: false
    },
    {
      nome: 'Usuário_3',
      status: 'Ativo',
      permissoes: { Administrativo: false, Financeiro: false, Fiscal: false, 'Sistema (admin)': true },
      expandido: false
    },
  ];

  get paginas() {
    return Array(Math.ceil(this.usuariosFiltrados().length / this.itensPorPagina));
  }

  usuariosFiltrados() {
    return this.usuarios.filter(u =>
      u.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  usuariosPaginados() {
    const inicio = this.paginaAtual * this.itensPorPagina;
    return this.usuariosFiltrados().slice(inicio, inicio + this.itensPorPagina);
  }

  nextPage() {
    if (this.paginaAtual < this.paginas.length - 1) {
      this.paginaAtual++;
    }
  }

  previousPage() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
    }
  }

  setPage(index: number) {
    this.paginaAtual = index;
  }

  toggleFiltros() {
    alert('Filtros adicionais podem ser implementados aqui.');
  }

  cadastrarUsuario() {
    alert('Abrir formulário para cadastro de novo usuário...');
  }

  toggleExpand(index: number) {
    const usuario = this.usuariosPaginados()[index];
    usuario.expandido = !usuario.expandido;
  }
}
