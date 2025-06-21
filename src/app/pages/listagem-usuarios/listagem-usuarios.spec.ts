// listagem-usuarios.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UsuariosListagem } from './listagem-usuarios';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UsuariosListagem', () => {
  let component: UsuariosListagem;
  let fixture: ComponentFixture<UsuariosListagem>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosListagem, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosListagem);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title "Usuários"', () => {
    const title = compiled.querySelector('.page-title');
    expect(title?.textContent).toContain('Usuários');
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(3);
    expect(component.usuarios.length).toBe(3);
  });

  it('should initialize filteredUsuarios with all usuarios', () => {
    expect(component.filteredUsuarios.length).toBe(component.usuarios.length);
  });

  describe('Search functionality', () => {
    it('should filter usuarios by name', () => {
      component.searchTerm = 'Usuário 1';
      component.onSearch();
      
      expect(component.filteredUsuarios.length).toBe(1);
      expect(component.filteredUsuarios[0].nome).toBe('Usuário 1');
    });

    it('should filter usuarios by username', () => {
      component.searchTerm = 'Usuario_2';
      component.onSearch();
      
      expect(component.filteredUsuarios.length).toBe(1);
      expect(component.filteredUsuarios[0].username).toBe('Usuario_2');
    });

    it('should return all usuarios when search term is empty', () => {
      component.searchTerm = '';
      component.onSearch();
      
      expect(component.filteredUsuarios.length).toBe(component.usuarios.length);
    });

    it('should be case insensitive', () => {
      component.searchTerm = 'usuário 1';
      component.onSearch();
      
      expect(component.filteredUsuarios.length).toBe(1);
    });

    it('should reset to first page when searching', () => {
      component.currentPage = 2;
      component.searchTerm = 'test';
      component.onSearch();
      
      expect(component.currentPage).toBe(1);
    });
  });

  describe('Usuario expansion', () => {
    it('should toggle usuario expanded state', () => {
      const initialState = component.usuarios[0].expanded;
      component.toggleUsuario(0);
      
      expect(component.usuarios[0].expanded).toBe(!initialState);
    });

    it('should show usuario details when expanded', () => {
      component.usuarios[0].expanded = true;
      fixture.detectChanges();
      
      const details = compiled.querySelector('.usuario-details');
      expect(details).toBeTruthy();
    });

    it('should hide usuario details when collapsed', () => {
      component.usuarios[0].expanded = false;
      fixture.detectChanges();
      
      const details = compiled.querySelector('.usuario-details');
      expect(details).toBeFalsy();
    });
  });

  describe('Permission management', () => {
    it('should toggle permission when not admin', () => {
      const usuario = component.usuarios[0];
      const permissao = usuario.permissoes.find(p => !p.admin);
      
      if (permissao) {
        const initialState = permissao.ativa;
        component.togglePermissao(0, permissao);
        
        expect(permissao.ativa).toBe(!initialState);
      }
    });

    it('should not toggle admin permission', () => {
      const usuario = component.usuarios[0];
      const adminPermissao = usuario.permissoes.find(p => p.admin);
      
      if (adminPermissao) {
        const initialState = adminPermissao.ativa;
        component.togglePermissao(0, adminPermissao);
        
        expect(adminPermissao.ativa).toBe(initialState);
      }
    });

    it('should display admin tag for admin permissions', () => {
      component.usuarios[0].expanded = true;
      fixture.detectChanges();
      
      const adminTags = compiled.querySelectorAll('.admin-tag');
      expect(adminTags.length).toBeGreaterThan(0);
    });
  });

  describe('Pagination', () => {
    it('should navigate to next page', () => {
      component.currentPage = 1;
      component.nextPage();
      
      expect(component.currentPage).toBe(2);
    });

    it('should navigate to previous page', () => {
      component.currentPage = 2;
      component.previousPage();
      
      expect(component.currentPage).toBe(1);
    });

    it('should not go beyond first page', () => {
      component.currentPage = 1;
      component.previousPage();
      
      expect(component.currentPage).toBe(1);
    });

    it('should not go beyond last page', () => {
      component.currentPage = component.totalPages;
      component.nextPage();
      
      expect(component.currentPage).toBe(component.totalPages);
    });

    it('should generate correct page numbers', () => {
      component.currentPage = 2;
      component.totalPages = 5;
      
      const pages = component.getPages();
      expect(pages).toEqual([1, 2, 3, 4]);
    });

    it('should go to specific page', () => {
      component.goToPage(3);
      expect(component.currentPage).toBe(3);
    });

    it('should not go to invalid page', () => {
      const initialPage = component.currentPage;
      component.goToPage(0);
      expect(component.currentPage).toBe(initialPage);
      
      component.goToPage(component.totalPages + 1);
      expect(component.currentPage).toBe(initialPage);
    });
  });

  describe('UI Elements', () => {
    it('should render search input', () => {
      const searchInput = compiled.querySelector('.search-input');
      expect(searchInput).toBeTruthy();
    });

    it('should render filter button', () => {
      const filterBtn = compiled.querySelector('.filter-btn');
      expect(filterBtn).toBeTruthy();
    });

    it('should render cadastrar button', () => {
      const cadastrarBtn = compiled.querySelector('.cadastrar-btn');
      expect(cadastrarBtn).toBeTruthy();
    });

    it('should render all usuarios', () => {
      const usuarioItems = compiled.querySelectorAll('.usuario-item');
      expect(usuarioItems.length).toBe(component.usuarios.length);
    });

    it('should render pagination controls', () => {
      const pagination = compiled.querySelector('.pagination');
      expect(pagination).toBeTruthy();
    });
  });

  describe('Status display', () => {
    it('should display correct status classes', () => {
      component.usuarios[0].expanded = true;
      component.usuarios[0].status = 'Ativo';
      fixture.detectChanges();
      
      const statusElement = compiled.querySelector('.status-ativo');
      expect(statusElement).toBeTruthy();
    });

    it('should display inactive status', () => {
      component.usuarios[2].expanded = true;
      fixture.detectChanges();
      
      const statusElement = compiled.querySelector('.status-inativo');
      expect(statusElement).toBeTruthy();
    });
  });

  describe('Event handlers', () => {
    it('should call toggleFilters when filter button is clicked', () => {
      spyOn(component, 'toggleFilters');
      
      const filterBtn = compiled.querySelector('.filter-btn') as HTMLButtonElement;
      filterBtn.click();
      
      expect(component.toggleFilters).toHaveBeenCalled();
    });

    it('should call cadastrarUsuario when cadastrar button is clicked', () => {
      spyOn(component, 'cadastrarUsuario');
      
      const cadastrarBtn = compiled.querySelector('.cadastrar-btn') as HTMLButtonElement;
      cadastrarBtn.click();
      
      expect(component.cadastrarUsuario).toHaveBeenCalled();
    });

    it('should update searchTerm when input changes', () => {
      const searchInput = compiled.querySelector('.search-input') as HTMLInputElement;
      
      searchInput.value = 'test search';
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      expect(component.searchTerm).toBe('test search');
    });
  });

  describe('Async methods', () => {
    it('should handle loadUsuarios', async () => {
      spyOn(console, 'log');
      await component.loadUsuarios();
      expect(console.log).toHaveBeenCalledWith('Carregando usuários do backend...');
    });

    it('should handle savePermissoes', async () => {
      spyOn(console, 'log');
      await component.savePermissoes('1', []);
      expect(console.log).toHaveBeenCalledWith('Salvando permissões do usuário 1', []);
    });

    it('should handle updateUsuarioStatus', async () => {
      spyOn(console, 'log');
      await component.updateUsuarioStatus('1', 'Ativo');
      expect(console.log).toHaveBeenCalledWith('Atualizando status do usuário 1 para Ativo');
    });
  });
});