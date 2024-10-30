import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { homeCarouselData } from '../../../../../../Data/main-carousel';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
})
export class MainCarouselComponent implements OnInit {
  currentSlide = 0;
  interval: any;
  carouselData = homeCarouselData;

  ngOnInit() {
    // this.carouselData = homeCarouselData;
  }

}
