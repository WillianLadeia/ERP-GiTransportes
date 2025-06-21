import { Component, ViewChild, ElementRef } from '@angular/core'; // Adicione ElementRef aqui
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

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.user === 'root' && this.password === 'toor') {
      sessionStorage.setItem('usuarioId', '1'); // simula login
      this.router.navigate(['/home']);
    } else {
      this.error = 'Usuário ou senha inválidos';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

focusPasswordInput() {
  console.log('Tentando focar a senha...');
  if (this.passwordInput) {
    console.log('Elemento da senha encontrado!', this.passwordInput.nativeElement);
    this.passwordInput.nativeElement.focus();
  } else {
    console.log('Elemento da senha NÃO encontrado!');
  }
}
}