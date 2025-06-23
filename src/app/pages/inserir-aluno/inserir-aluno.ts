import { Component } from '@angular/core';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';

@Component({
  selector: 'app-inserir-aluno',
  imports: [Sidebar, SearchCompassComponent],
  templateUrl: './inserir-aluno.html',
  styleUrl: './inserir-aluno.css'
})
export class InserirAluno {

}
