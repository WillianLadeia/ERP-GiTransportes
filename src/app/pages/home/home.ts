import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { Sidebar } from '../../sidebar/sidebar';
import { SearchCompassComponent,} from '../../search-compass.component/search-compass.component';


export class HomeModule { }
@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, Sidebar, SearchCompassComponent], 
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home {
  adminOpen = false;
  financeiroOpen = false;
  fiscalOpen = false;
  sistemaOpen = false;

  constructor(private router: Router) { }

  toggleAdminMenu() {
    this.adminOpen = !this.adminOpen;
  }

  goToCadastroAluno() {
    this.router.navigate(['/cadastro-aluno']);
  }

  goToListagemEscolas() {
    this.router.navigate(['/listagem-escolas']);
  }

  goToListagemVeiculos() {
    this.router.navigate(['/listagem-veiculos']);
  }

  goToListagemFuncionarios() {
    this.router.navigate(['/listagem-funcionarios']);
  }

  goToListagemUsuarios() {
    this.router.navigate(['/listagem-usuarios']);
  }

  goToLivroCaixa() {
    this.router.navigate(['/livro-caixa']);
  }

  goToRelatoriosAlunosAtivos() {
    this.router.navigate(['/relatorios-alunos-ativos']);
  }


  toggleFinanceiroMenu() {
    this.financeiroOpen = !this.financeiroOpen;
  }

  toggleFiscalMenu() {
    this.fiscalOpen = !this.fiscalOpen;
  }

  toggleSistemaMenu() {
    this.sistemaOpen = !this.sistemaOpen;
  }
}