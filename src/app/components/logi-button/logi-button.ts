import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'logi-button',
    templateUrl: './logi-button.html',
    styleUrls: ['./logi-button.scss']
})
export class LogiButton implements OnInit {
    @HostBinding('id') buttonId: string;
    @Input() id: string;
    @Input() text: string;
    @Input() visible: boolean = true;
    @Input() disabled: boolean = false;
    @Input() buttonType: ButtonTypes;

    @Output() onClick = new EventEmitter<LogiButton>();

    ngOnInit(): void {
        this.buttonId = this.id;
    }

    onButtonClick(): void {
        this.onClick.emit(this);
    }
}

export enum ButtonTypes {
    Primary = 'primary',
    Normal = 'normal',
    Error = 'error'
}