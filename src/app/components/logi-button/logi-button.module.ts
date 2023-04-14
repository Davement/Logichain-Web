import { NgModule } from "@angular/core";
import { LogiButton } from "./logi-button";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LogiButton],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: [LogiButton]
})
export class LogiButtonModule { }