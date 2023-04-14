import { Component, Input } from "@angular/core";

@Component({
    selector: 'logi-button',
    templateUrl: './logi-button.html',
    styleUrls: ['./logi-button.scss']
})
export class LogiButton {
    @Input() text: string;
}