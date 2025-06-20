import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { VeiculosListagem } from './listagem-veiculos';

describe('VeiculosListagem', () => {
  let component: VeiculosListagem;
  let fixture: ComponentFixture<VeiculosListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiculosListagem],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculosListagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter 6 veículos na lista', () => {
    expect(component.veiculos.length).toBe(6);
  });

  it('deve alternar a exibição dos detalhes do veículo', () => {
    const veiculo = component.veiculos[0];
    expect(veiculo.expandido).toBeFalse();
    component.toggleExpandir(veiculo);
    expect(veiculo.expandido).toBeTrue();
  });

  it('deve expandir somente veículos com nome correspondente à busca', () => {
    component.buscar({ target: { value: 'Veículo 2' } } as unknown as Event);
    const v1 = component.veiculos[0];
    const v2 = component.veiculos[1];
    expect(v1.expandido).toBeFalse();
    expect(v2.expandido).toBeTrue();
  });
});