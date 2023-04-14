import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LogiBreadcrumb } from "./logi-breadcrumb";

@NgModule({
    declarations: [LogiBreadcrumb],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: [LogiBreadcrumb]
})
export class LogiBreadcrumbModule { }