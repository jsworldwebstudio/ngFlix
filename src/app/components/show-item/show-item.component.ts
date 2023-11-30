import { Component, Input } from '@angular/core';
import { imagesBaseUrl } from '../../constants/images-sizes';
import { Movie } from '../../types/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent {
  @Input() showItem : Movie | null = null;
  @Input() showType: string | null = 'movie';

  constructor(
    private router: Router) { }

  imagesBaseUrl = imagesBaseUrl;

  // ngOnInit(): void {
  //   //  ...
  //   // With the below line you can now reload the same component from the same route
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
  // }
  // [routerLink]="'/detail/' + showItem.id + '/' + showType"
  // (click)="routeToThisComponent(showItem.id, showType)"

  routeToThisComponent(urlId: number, urlType: string): void {
    const url = `detail/${urlId}/${urlType}`;
    this.router.navigate([`/${url}`]);
  }

  // reloadPage(){
  //   window.location.reload()
  // }
}
