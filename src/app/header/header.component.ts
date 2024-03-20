import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Directive, HostListener, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

const DIRECTION = Object.freeze({
  FORWARD: 0,
  BACKWARD: 1
});

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule],
  providers: [],
  animations: [],
})
export class HeaderComponent implements OnInit {
  public sections: string[] = ['Home', 'Skills', 'Education', 'Experience', 'Projects'];
  private widthThreshold: number = 800;
  public screenIsLarge: boolean = false;
  public dropdownClicked: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.screenIsLarge = window.innerWidth > this.widthThreshold;
  }

  ngOnInit(): void {
    this.onResize();
  }

  public toggleDropdown() {
    this.dropdownClicked =!this.dropdownClicked;
    console.log(this.dropdownClicked);
  }

}
