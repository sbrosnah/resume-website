import { ChangeDetectorRef, Component, Directive, OnInit } from '@angular/core';

const DIRECTION = Object.freeze({
  FORWARD: 0,
  BACKWARD: 1
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
