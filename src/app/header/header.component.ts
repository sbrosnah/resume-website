import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Direction } from '../shared/enums';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule],
  providers: [],
  animations: [],
//   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public sections: string[] = ['About', 'Skills', 'Education', 'Experience', 'Projects'];
  public logoText: string = "SpencerBrosnahan"
  private widthThreshold: number = 1000;
  public screenIsLarge: boolean = false;
  public dropdownClicked: boolean = false;
  public logoClicked: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.screenIsLarge = window.innerWidth > this.widthThreshold;
  }

  ngOnInit(): void {
    this.onResize();
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
