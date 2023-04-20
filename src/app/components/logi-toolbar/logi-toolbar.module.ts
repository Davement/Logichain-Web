import { NgModule } from "@angular/core";
import { LogiToolbar } from "./logi-toolbar";
import { CommonModule } from "@angular/common";
import { LogiButtonModule } from "../logi-button/logi-button.module";
import { ToolbarController } from "./logi-toolbar.controller";

@NgModule({
    declarations: [LogiToolbar],
    imports: [
        CommonModule,
        LogiButtonModule,
    ],
    providers: [ToolbarController],
    exports: [LogiToolbar]
})
export class LogiToolbarModule { }