import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FuncionariosLista } from './listagem-funcionarios';

describe('FuncionariosLista', () => {
  let component: FuncionariosLista;
  let fixture: ComponentFixture<FuncionariosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncionariosLista],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter funcionarios by name', () => {
    component.filtroNome = 'João';
    expect(component.funcionariosFiltrados().length).toBeGreaterThan(0);
  });

  it('should toggle filters panel', () => {
    component.toggleFiltros();
    expect(component.showFiltros).toBeTrue();
  });

  it('should change pages correctly', () => {
    const initialPage = component.currentPage;
    component.nextPage();
    expect(component.currentPage).toBeGreaterThanOrEqual(initialPage);
  });
});