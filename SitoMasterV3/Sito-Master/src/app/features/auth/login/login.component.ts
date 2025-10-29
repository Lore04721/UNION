import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly router: Router) {}

  entra(): void {
    // Naviga verso una rotta definita (NON verso un file fisico)
    //this.router.navigateByUrl('/student');
    // In alternativa:
     this.router.navigate(['/student']);
  }
}
