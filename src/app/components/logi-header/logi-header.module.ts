import { NgModule } from "@angular/core";
import { LogiHeader } from "./logi-header";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LogiHeader],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: [LogiHeader],
    bootstrap: [LogiHeader]
})
export class LogiHeaderModule { }