import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CadastroAlunoComponent } from './cadastro-aluno';

describe('CadastroAlunoComponent', () => {
  let component: CadastroAlunoComponent;
  let fixture: ComponentFixture<CadastroAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAlunoComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle editing section', () => {
    component.toggleEdit('aluno');
    expect(component.isEditing['aluno']).toBeTrue();
    component.toggleEdit('aluno');
    expect(component.isEditing['aluno']).toBeFalse();
  });
});