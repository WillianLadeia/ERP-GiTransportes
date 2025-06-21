import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EscolasComponent, Escola } from './listagem-escolas';

describe('EscolasComponent', () => {
  let component: EscolasComponent;
  let fixture: ComponentFixture<EscolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolasComponent, FormsModule, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.userName).toBe('Valéria da Silva Santos');
    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(3);
    expect(component.schools.length).toBe(3);
  });

  it('should display user name in sidebar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.user-name').textContent).toContain('Valéria da Silva Santos');
  });

  it('should display schools list', () => {
    const schoolItems = fixture.debugElement.queryAll(By.css('.school-item'));
    expect(schoolItems.length).toBe(component.displayedSchools.length);
  });

  it('should filter schools based on search term', () => {
    component.searchTerm = 'Escola 1';
    component.onSearch();
    
    expect(component.filteredSchools.length).toBe(1);
    expect(component.filteredSchools[0].nome).toBe('Escola 1');
  });

  it('should filter schools by address', () => {
    component.searchTerm = 'Sumaré';
    component.onSearch();
    
    expect(component.filteredSchools.length).toBe(1);
    expect(component.filteredSchools[0].endereco.cidade).toBe('Sumaré');
  });

  it('should reset to page 1 when searching', () => {
    component.currentPage = 2;
    component.searchTerm = 'Escola';
    component.onSearch();
    
    expect(component.currentPage).toBe(1);
  });

  it('should show all schools when search term is empty', () => {
    component.searchTerm = 'test';
    component.onSearch();
    
    component.searchTerm = '';
    component.onSearch();
    
    expect(component.filteredSchools.length).toBe(component.schools.length);
  });

  it('should toggle school expansion', () => {
    const schoolIndex = 0;
    const initialExpanded = component.schools[0].expanded;
    
    component.toggleSchool(schoolIndex);
    
    expect(component.schools[0].expanded).toBe(!initialExpanded);
  });

  it('should handle pagination correctly', () => {
    component.currentPage = 1;
    component.nextPage();
    
    expect(component.currentPage).toBe(2);
    
    component.previousPage();
    
    expect(component.currentPage).toBe(1);
  });

  it('should not go to previous page when on first page', () => {
    component.currentPage = 1;
    component.previousPage();
    
    expect(component.currentPage).toBe(1);
  });

  it('should not go to next page when on last page', () => {
    component.currentPage = component.totalPages;
    component.nextPage();
    
    expect(component.currentPage).toBe(component.totalPages);
  });

  it('should go to specific page', () => {
    const targetPage = 2;
    component.goToPage(targetPage);
    
    expect(component.currentPage).toBe(targetPage);
  });

  it('should not go to invalid page numbers', () => {
    const currentPage = component.currentPage;
    
    component.goToPage(0);
    expect(component.currentPage).toBe(currentPage);
    
    component.goToPage(component.totalPages + 1);
    expect(component.currentPage).toBe(currentPage);
  });

  it('should generate correct page numbers', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    
    const pageNumbers = component.getPageNumbers();
    
    expect(pageNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle page numbers when there are many pages', () => {
    component.totalPages = 10;
    component.currentPage = 5;
    
    const pageNumbers = component.getPageNumbers();
    
    expect(pageNumbers.length).toBeLessThanOrEqual(5);
    expect(pageNumbers).toContain(5);
  });

  it('should call cadastrarEscola method', () => {
    spyOn(component, 'cadastrarEscola');
    
    const button = fixture.debugElement.query(By.css('.add-button button'));
    button.nativeElement.click();
    
    expect(component.cadastrarEscola).toHaveBeenCalled();
  });

  it('should call editarEscola method with correct school', () => {
    spyOn(component, 'editarEscola');
    
    const testSchool = component.schools[0];
    component.editarEscola(testSchool);
    
    expect(component.editarEscola).toHaveBeenCalledWith(testSchool);
  });

  it('should call toggleFilters method', () => {
    spyOn(component, 'toggleFilters');
    
    const button = fixture.debugElement.query(By.css('.filter-button button'));
    button.nativeElement.click();
    
    expect(component.toggleFilters).toHaveBeenCalled();
  });

  it('should update displayed schools when pagination changes', () => {
    const initialDisplayed = component.displayedSchools.length;
    
    component.updateDisplayedSchools();
    
    expect(component.displayedSchools.length).toBeLessThanOrEqual(component.itemsPerPage);
    expect(component.displayedSchools.length).toBeLessThanOrEqual(component.filteredSchools.length);
  });

  it('should handle search input changes', () => {
    const searchInput = fixture.debugElement.query(By.css('.search-bar input'));
    
    searchInput.nativeElement.value = 'Escola 2';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    
    expect(component.searchTerm).toBe('Escola 2');
  });

  it('should display correct school details when expanded', () => {
    component.schools[0].expanded = true;
    fixture.detectChanges();
    
    const schoolDetails = fixture.debugElement.query(By.css('.school-details'));
    expect(schoolDetails).toBeTruthy();
    
    const endereco = schoolDetails.query(By.css('.detail-group'));
    expect(endereco).toBeTruthy();
  });

  it('should hide school details when collapsed', () => {
    component.schools[0].expanded = false;
    fixture.detectChanges();
    
    const schoolDetails = fixture.debugElement.query(By.css('.school-details'));
    expect(schoolDetails).toBeFalsy();
  });

  it('should calculate total pages correctly', () => {
    component.filteredSchools = new Array(25).fill(null).map((_, i) => ({
      id: i + 1,
      nome: `Escola ${i + 1}`,
      endereco: {
        rua: `Rua ${i + 1}`,
        numero: `${i + 1}`,
        bairro: 'Bairro Teste',
        cep: '12345-678',
        cidade: 'Cidade Teste',
        complemento: 'Complemento'
      },
      periodos: ['Manhã'],
      vans: ['Van 1']
    }));
    
    component.itemsPerPage = 10;
    component.updateDisplayedSchools();
    
    expect(component.totalPages).toBe(3);
  });

  it('should handle empty search results', () => {
    component.searchTerm = 'escola inexistente';
    component.onSearch();
    
    expect(component.filteredSchools.length).toBe(0);
    expect(component.displayedSchools.length).toBe(0);
  });

  it('should maintain case-insensitive search', () => {
    component.searchTerm = 'ESCOLA 1';
    component.onSearch();
    
    expect(component.filteredSchools.length).toBe(1);
    expect(component.filteredSchools[0].nome).toBe('Escola 1');
  });

  it('should search in multiple fields', () => {
    component.searchTerm = 'Jardim';
    component.onSearch();
    
    const result = component.filteredSchools.some(school => 
      school.endereco.bairro.includes('Jardim')
    );
    expect(result).toBeTruthy();
  });

  it('should handle navigation menu items', () => {
    const navItems = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(navItems.length).toBe(4);
    
    const activeItem = fixture.debugElement.query(By.css('.nav-item.active'));
    expect(activeItem.nativeElement.textContent.trim()).toContain('Sistema');
  });

  it('should display correct pagination buttons state', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    
    const prevBtn = fixture.debugElement.query(By.css('.prev-btn'));
    const nextBtn = fixture.debugElement.query(By.css('.next-btn'));
    
    expect(prevBtn.nativeElement.disabled).toBeTruthy();
    expect(nextBtn.nativeElement.disabled).toBeFalsy();
  });

  it('should display active page number correctly', () => {
    component.currentPage = 2;
    fixture.detectChanges();
    
    const activePageNumber = fixture.debugElement.query(By.css('.page-number.active'));
    expect(activePageNumber.nativeElement.textContent.trim()).toBe('2');
  });

  it('should show correct number of periods and vans for each school', () => {
    component.schools[0].expanded = true;
    fixture.detectChanges();
    
    const periodsItems = fixture.debugElement.queryAll(By.css('.periods-list li'));
    const vansItems = fixture.debugElement.queryAll(By.css('.vans-list li'));
    
    expect(periodsItems.length).toBe(component.schools[0].periodos.length);
    expect(vansItems.length).toBe(component.schools[0].vans.length);
  });
}