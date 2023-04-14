import { NgModule } from "@angular/core";
import { EstablishmentLocationView } from "./establishment-location";
import { CommonModule } from "@angular/common";
import { LogiToolbarModule } from "src/app/components/logi-toolbar/logi-toolbar.module";

@NgModule({
    declarations: [EstablishmentLocationView],
    imports: [
        CommonModule,
        LogiToolbarModule,
    ],
    providers: []
})
export class EstablishmentLocationViewModule { }