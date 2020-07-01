import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({ selector: '[mouseoverCatcher]' })

export class MouseoverCatcher {

    @Output() passData: EventEmitter<any> = new EventEmitter();

    constructor(
        private el: ElementRef,
    ) { }

    @HostListener('mouseover') onMouseOver() {
        const target = this.el.nativeElement;
        const data = {
            title: target.getAttribute('title'),
            value: target.getAttribute('data-value'),
            index: target.getAttribute('id')
        };
        this.passData.emit(data);
    }

}
