import { NgModule } from "@angular/core";
import { LogiToolbar } from "./logi-toolbar";
import { CommonModule } from "@angular/common";
import { LogiButtonModule } from "../logi-button/logi-button.module";

@NgModule({
    declarations: [LogiToolbar],
    imports: [
        CommonModule,
        LogiButtonModule,
    ],
    providers: [],
    exports: [LogiToolbar]
})
export class LogiToolbarModule { }