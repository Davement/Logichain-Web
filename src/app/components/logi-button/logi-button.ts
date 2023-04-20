import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'logi-button',
    templateUrl: './logi-button.html',
    styleUrls: ['./logi-button.scss'],
    host: {'[id]': 'id'}
})
export class LogiButton {
    @Input() id: string;
    @Input() text: string;
    @Input() visible: boolean = true;
    @Input() disabled: boolean = false;
    @Input() buttonType: ButtonTypes;

    @Output() onClick = new EventEmitter<LogiButton>();

    onButtonClick() {
        this.onClick.emit(this);
    }
}

export enum ButtonTypes {
    Primary = 'primary',
    Normal = 'normal',
    Error = 'error'
}