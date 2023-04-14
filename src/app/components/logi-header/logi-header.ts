import { Component, Input } from "@angular/core";

@Component({
    selector: 'logi-header',
    templateUrl: './logi-header.html',
    styleUrls: ['./logi-header.scss']
})
export class LogiHeader {
    @Input() title: string; 
}