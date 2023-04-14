import { NgModule } from "@angular/core";
import { CompanyLocationView } from "./company-location";
import { CommonModule } from "@angular/common";
import { LogiToolbarModule } from "src/app/components/logi-toolbar/logi-toolbar.module";

@NgModule({
    declarations: [CompanyLocationView],
    imports: [
        CommonModule,
        LogiToolbarModule,
    ],
    providers: []
})
export class CompanyLocationViewModule { }