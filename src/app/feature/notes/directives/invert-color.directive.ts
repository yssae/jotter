import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[jtrInvertColor]'
})
export class InvertColorDirective implements OnChanges {
  @Input() bgColor: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const color = changes['bgColor'];
    if (color && color.currentValue) {
      const brightness = this.perceivedBrightness(color.currentValue);
      if (brightness < 64) {
        this.elementRef.nativeElement.style.color = '#FFF';
      } else if (brightness > 192) {
        this.elementRef.nativeElement.style.color = '#000';
      } else {
        this.elementRef.nativeElement.style.color = 'inherit';
      }
    }
  }

  private perceivedBrightness(color: string): number {
    // calculate the perceived brightness of a color (0-255)
    const rgba = this.hexToRgba(color);
    if (rgba.r === 0 && rgba.g === 0 && rgba.b === 0) {
      return 1; // return a small positive value for black
    }
    return (rgba.r * 299 + rgba.g * 587 + rgba.b * 114) / 1000;
  }

  private hexToRgba(hex: string): { r: number, g: number, b: number, a: number } {
    // convert a hex color to RGBA format
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
    return { r, g, b, a };
  }
}
