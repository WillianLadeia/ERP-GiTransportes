import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent } from '../../search-compass.component/search-compass.component';

@Component({
  selector: 'app-inserir-aluno',
  standalone: true,
  imports: [CommonModule,FormsModule, Sidebar, SearchCompassComponent],
  templateUrl: './inserir-aluno.html',
  styleUrl: './inserir-aluno.css'
})
export class InserirAluno {
  showPopup = false;

  constructor(private router: Router) {}

  cadastrarAluno() {
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
      this.router.navigate(['/home']);
    }, 3000); 
  }
}
