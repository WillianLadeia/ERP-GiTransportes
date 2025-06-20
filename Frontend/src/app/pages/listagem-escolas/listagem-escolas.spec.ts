import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EscolasListagem } from './listagem-escolas';
import { DebugElement } from '@angular/core';

describe('EscolasListagem>;', () => {
  let component: EscolasListagem;
  let fixture: ComponentFixture<EscolasListagem>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscolasListagem],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolasListagem);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter 3 escolas', () => {
    expect(component.escolas.length).toBe(3);
  });

  it('deve alternar o expandido da escola', () => {
    const escola = component.escolas[0];
    expect(escola.expandido).toBeFalse();

    component.toggleExpandir(escola);
    expect(escola.expandido).toBeTrue();
  });

  it('deve expandir somente escolas que contenham o termo buscado', () => {
    component.buscar('Escola 2');
    fixture.detectChanges();

    const escola1 = component.escolas[0];
    const escola2 = component.escolas[1];

    expect(escola1.expandido).toBeFalse();
    expect(escola2.expandido).toBeTrue();
  });

  it('deve renderizar o nome da escola no HTML', () => {
    const escolaHeaders = debugElement.queryAll(By.css('.escola-header'));
    expect(escolaHeaders.length).toBeGreaterThan(0);
    expect(escolaHeaders[0].nativeElement.textContent).toContain('Escola 1');
  });
});