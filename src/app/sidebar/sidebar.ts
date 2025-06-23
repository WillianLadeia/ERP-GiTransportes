import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar', 
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  imports: [CommonModule]
})
export class Sidebar {
  // Properties to control submenu visibility
  adminOpen: boolean = false;
  financeiroOpen: boolean = false;
  fiscalOpen: boolean = false;
  sistemaOpen: boolean = false;

  constructor(private router: Router) { } // Inject Router

  toggleAdminMenu() {
    this.adminOpen = !this.adminOpen;
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToCadastroAluno() {
    this.router.navigate(['/inserir-aluno']);
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


  goToggleFinanceiroMenu() {
    this.financeiroOpen = !this.financeiroOpen;
  }

  goToggleFiscalMenu() {
    this.fiscalOpen = !this.fiscalOpen;
  }

  goToggleSistemaMenu() {
    this.sistemaOpen = !this.sistemaOpen;
  }
}