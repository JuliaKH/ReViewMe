import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  indexSlides = 2;
  slides;
  dots;

  constructor() { }

  ngOnInit() {
    this.showSlides(this.indexSlides);
  }
  showSlides(n) {
    this.slides = document.getElementsByClassName('mySlides');
    this.dots = document.getElementsByClassName('dot');
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = 'none';
    }
    if (n < 1) {
      this.indexSlides = this.slides.length;
    }

    if (n > this.slides.length) {
      this.indexSlides = 1;
    }
    for (let i = 0; i < this.dots.length; i++) {
      // this.dots[i].className = this.dots[i].className.replace(' active' , ' ');
      this.dots[i].classList.remove('active');
    }
    this.slides[this.indexSlides - 1].style.display = 'block';
    // this.dots[this.indexSlides - 1].className += 'active';
    this.dots[this.indexSlides - 1].classList.add('active');
  }
  plusSlides(n) {
    this.showSlides(this.indexSlides += n);
  }
  currentSlide(n) {
    this.showSlides(this.indexSlides = n);
  }

}
