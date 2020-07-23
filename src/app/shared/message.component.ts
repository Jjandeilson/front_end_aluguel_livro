import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
   <div *ngIf="temError()" class="ui-message ui-messages-error">
      {{ texto }}
   </div>
  `,
  styles: [
    `
        .ui-message {
          color: #fff;
          margin-top: 3px;
          background-color: red;
        }
    `
  ]
})
export class MessageComponent {

  @Input() texto: string;
  @Input() control: FormControl;
  @Input() error: string;

  constructor() { }

  temError() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
