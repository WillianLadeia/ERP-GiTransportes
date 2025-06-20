import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-aluno',
    loadComponent: () => import('./pages/cadastrar-aluno/cadastro-aluno').then(m => m.CadastroAluno)
  },
  {
    path: 'listagem-escolas',
    loadComponent: () => import('./pages/listagem-escolas/listagem-escolas').then(m => m.EscolasListagem),
  },
  {
   path: 'listagem-veiculos',
   loadComponent: () => import('./pages/listagem-veiculos/listagem-veiculos').then(m => m.VeiculosListagem),
  },
  {
   path: 'listagem-funcionarios',
   loadComponent: () => import('./pages/listagem-funcionarios/listagem-funcionarios').then(m => m.FuncionariosLista)
 },
 {
  path: 'listagem-usuarios',
  loadComponent: () => import('./pages/listagem-usuarios/listagem-usuarios').then(m => m.UsuariosListagem),
 },
 {
   path: 'livro-caixa',
   loadComponent: () => import('./pages/livro-caixa/livro-caixa').then(m => m.LivroCaixa)
 },
 {
  path: 'relatorios-alunos-ativos',
  loadComponent: () => import('./pages/relatorios-alunos-ativos/relatorios-alunos-ativos').then(m => m.RelatorioAlunosAtivos)
 }
];
