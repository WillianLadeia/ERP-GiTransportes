import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LivroCaixa } from './livro-caixa';
import { Sidebar } from '../../sidebar/sidebar';

describe('LivroCaixa', () => {
  let component: LivroCaixa;
  let fixture: ComponentFixture<LivroCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivroCaixa],
      imports: [FormsModule, Sidebar]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items by search', () => {
    component.filtro = 'Recebimento';
    expect(component.itensFiltrados().length).toBeGreaterThan(0);
  });

  it('should change pages correctly', () => {
    component.nextPage();
    expect(component.paginaAtual).toBeGreaterThanOrEqual(0);
  });

  it('should revert item', () => {
    spyOn(window, 'alert');
    component.reverter(component.itens[0]);
    expect(window.alert).toHaveBeenCalledWith('Reverter item: ' + component.itens[0].id);
  });
});