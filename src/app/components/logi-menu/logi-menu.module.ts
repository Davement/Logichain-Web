import { NgModule } from "@angular/core";
import { LogiMenu } from "./logi-menu";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LogiMenu],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: [LogiMenu]
})
export class LogiMenuModule { }