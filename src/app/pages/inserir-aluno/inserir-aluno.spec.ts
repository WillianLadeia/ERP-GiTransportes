import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAluno } from './inserir-aluno';

describe('InserirAluno', () => {
  let component: InserirAluno;
  let fixture: ComponentFixture<InserirAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirAluno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirAluno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
