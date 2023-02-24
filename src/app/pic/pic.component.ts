import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pic',
  styles: [
     `
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto;
      }
    `],
  template: `
    <img [src]="src" (error)="onError($event)">
  `
})
export class PicComponent {
  @Input() src: string | undefined;

  onError(event: any) {
    event.target.src = 'https://img.freepik.com/free-photo/young-man-white-shirt-looking-camera-looking-happy_176474-83327.jpg?w=826&t=st=1676660985~exp=1676661585~hmac=c198d42a5454354f5c5de7cf3fddc9c3bee6ff42566f48b8c381c952fa23d56e ';
  }
}
