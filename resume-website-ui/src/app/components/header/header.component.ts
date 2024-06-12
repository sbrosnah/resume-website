import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Direction } from '../../shared/enums';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  providers: [],
  animations: [],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public sections: string[] = ['About', 'Skills', 'Education', 'Experience', 'Projects'];
  public logoText: string = "SpencerBrosnahan"
  public screenIsLarge: boolean = false;
  public dropdownClicked: boolean = false;
  public logoClicked: boolean = false;

  private widthThreshold: number = 800;
  private unsubscribe$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
    .observe([`(max-width: ${this.widthThreshold}px)`])
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
        this.screenIsLarge = !result.matches;
    });
  }


  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

  public toggleDropdown() {
    this.dropdownClicked =!this.dropdownClicked;
  }

  public animateNav(): void {

    let elements = Array.from(document.querySelectorAll(".movable")).filter(element => {
        return window.getComputedStyle(element).display !== 'none';
    }).map(element => element as HTMLElement);

    if(elements.length <= 1) {
        return
    }

    function moveToNextElement(index: number, dir: number): void {

        if (dir == Direction.BACKWARD && index < 0) {
            return; 
        }

        const element = elements[index];

        let dist;
        if(dir == Direction.FORWARD) {
            dist = elements[index + 1].getBoundingClientRect().left - element.getBoundingClientRect().right;
        }

        if(index == 0 && dir == Direction.FORWARD) {
            element.style.transition = "transform .7s ease-in";
        } else if (index == 0 && dir == Direction.BACKWARD) {
            element.style.transition = "transform 1.4s ease-out";
        } else {
            element.style.transition = "transform .07s ease-out";
        } 

        if(dir == Direction.FORWARD) {
            element.style.transform = `translateX(${dist}px)`; 
        } else {
            element.style.transform = '';
        }
        

        function handleTransitionEnd() {
            element.removeEventListener('transitionend', handleTransitionEnd); 

            let nextInd;
            //decide next index
            if(index < elements.length - 2 && dir == Direction.FORWARD) {
                nextInd = index + 1;
            } else if (index <= elements.length - 2 && dir == Direction.BACKWARD) {
                nextInd = index - 1;
            } else {
                nextInd = index;
            }

            //decide next direction
            //only switch when we are at our last movable element
            let nextDir;
            if(index == elements.length - 2) {
                nextDir = Direction.BACKWARD;
            } else {
                nextDir = dir;
            }

            moveToNextElement(nextInd, nextDir); 
        }

        element.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    moveToNextElement(0, Direction.FORWARD); 
  }

}
