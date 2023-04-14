import { NgModule } from "@angular/core";
import { LogiTabs } from "./logi-tabs";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [LogiTabs],
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [],
    exports: [LogiTabs]
})
export class LogiTabsModule { }