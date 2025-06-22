// listagem-usuarios.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';


export interface Permissao {
  nome: string;
  ativa: boolean;
  admin?: boolean;
}

export interface Usuario {
  id: string;
  nome: string;
  username: string;
  status: 'Ativo' | 'Inativo';
  expanded: boolean;
  permissoes: Permissao[];
}

@Component({
  selector: 'app-listagem-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, SearchCompassComponent],
  templateUrl: './listagem-usuarios.html',
  styleUrls: ['./listagem-usuarios.css']
})
export class UsuariosListagem implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 3;
  itemsPerPage: number = 10;
  
  usuarios: Usuario[] = [
    {
      id: '1',
      nome: 'Usuário 1',
      username: 'usuario_1',
      status: 'Ativo',
      expanded: false,
      permissoes: [
        { nome: 'Administrativo', ativa: true },
        { nome: 'Financeiro', ativa: true },
        { nome: 'Fiscal', ativa: true },
        { nome: 'Sistema', ativa: false, admin: true }
      ]
    },
    {
      id: '2',
      nome: 'Usuário 2',
      username: 'Usuario_2',
      status: 'Ativo',
      expanded: false,
      permissoes: [
        { nome: 'Administrativo', ativa: true },
        { nome: 'Financeiro', ativa: true },
        { nome: 'Fiscal', ativa: true },
        { nome: 'Sistema', ativa: false, admin: true }
      ]
    },
    {
      id: '3',
      nome: 'Usuário 3',
      username: 'usuario_3',
      status: 'Inativo',
      expanded: false,
      permissoes: [
        { nome: 'Administrativo', ativa: false },
        { nome: 'Financeiro', ativa: false },
        { nome: 'Fiscal', ativa: true },
        { nome: 'Sistema', ativa: false, admin: true }
      ]
    }
  ];

  filteredUsuarios: Usuario[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredUsuarios = [...this.usuarios];
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredUsuarios = [...this.usuarios];
    } else {
      this.filteredUsuarios = this.usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        usuario.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page when searching
  }

  toggleUsuario(index: number): void {
    this.usuarios[index].expanded = !this.usuarios[index].expanded;
  }

  togglePermissao(usuarioIndex: number, permissao: Permissao): void {
    if (!permissao.admin) {
      permissao.ativa = !permissao.ativa;
      // Aqui você pode adicionar lógica para salvar as alterações
      console.log(`Permissão ${permissao.nome} alterada para ${permissao.ativa} no usuário ${this.usuarios[usuarioIndex].nome}`);
    }
  }

  toggleFilters(): void {
    // Implementar lógica para exibir/ocultar filtros
    console.log('Toggleando filtros');
  }

  cadastrarUsuario(): void {
    // Implementar lógica para cadastrar novo usuário
    console.log('Cadastrando novo usuário');
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Implementar lógica para carregar dados da página
      console.log(`Navegando para página ${page}`);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(`Página anterior: ${this.currentPage}`);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log(`Próxima página: ${this.currentPage}`);
    }
  }

  // Métodos auxiliares para integração com backend
  
  async loadUsuarios(): Promise<void> {
    try {
      // Implementar chamada para API
      // const response = await this.usuarioService.getUsuarios();
      // this.usuarios = response.usuarios;
      // this.totalPages = response.totalPages;
      console.log('Carregando usuários do backend...');
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  async savePermissoes(usuarioId: string, permissoes: Permissao[]): Promise<void> {
    try {
      // Implementar chamada para API
      // await this.usuarioService.updatePermissoes(usuarioId, permissoes);
      console.log(`Salvando permissões do usuário ${usuarioId}`, permissoes);
    } catch (error) {
      console.error('Erro ao salvar permissões:', error);
    }
  }

  async updateUsuarioStatus(usuarioId: string, status: 'Ativo' | 'Inativo'): Promise<void> {
    try {
      // Implementar chamada para API
      // await this.usuarioService.updateStatus(usuarioId, status);
      console.log(`Atualizando status do usuário ${usuarioId} para ${status}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  }
}