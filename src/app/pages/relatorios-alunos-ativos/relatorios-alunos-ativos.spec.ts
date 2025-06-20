import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioAlunosAtivos } from './relatorios-alunos-ativos';

describe('RelatorioAlunosAtivos', () => {
  let component: RelatorioAlunosAtivos;
  let fixture: ComponentFixture<RelatorioAlunosAtivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioAlunosAtivos]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAlunosAtivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate table when button is clicked', () => {
    expect(component.alunos.length).toBe(0);
    component.gerarTabela();
    expect(component.alunos.length).toBeGreaterThan(0);
  });
});