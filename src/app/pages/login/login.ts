import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}


  login() {
  if (this.user === 'root' && this.password === 'toor') {
    sessionStorage.setItem('usuarioId', '1'); // simula login
    this.router.navigate(['/home']);
  } else {
    this.error = 'Usuário ou senha inválidos';
  }
}

  // login() {    
  //   this.error = '';
  //   this.auth.login(this.user, this.password).subscribe({
  //     next: (res: any) => {
  //       // Aqui você pode salvar token, dados do usuário, etc
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err: any) => {
  //       this.error = 'Usuário ou senha inválidos';
  //     }
  //   });
  // }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}