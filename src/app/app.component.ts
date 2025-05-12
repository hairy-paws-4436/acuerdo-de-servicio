import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SaasComponent} from './hairy-paws/saas/saas.component';

@Component({
  selector: 'app-root',
  imports: [SaasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'acuerdo-de-servicio';
}
