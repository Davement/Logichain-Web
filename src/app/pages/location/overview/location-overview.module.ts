import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogiHeaderModule } from "src/app/components/logi-header/logi-header.module";
import { LogiTabsModule } from "src/app/components/logi-tabs/logi-tabs.module";
import { CompanyLocationView } from "./company-location/company-location";
import { CompanyLocationViewModule } from "./company-location/company-location.module";
import { EstablishmentLocationViewModule } from "./establishment-location/establishment-location.module";
import { LocationOverview } from "./location-overview";
import { EstablishmentLocationView } from "./establishment-location/establishment-location";

const children: Routes = [
    {
        path: 'company',
        outlet: 'view',
        component: CompanyLocationView
    },
    {
        path: 'establishments',
        outlet: 'view',
        component: EstablishmentLocationView
    },
    {
        path: 'halls',
        outlet: 'view',
        component: CompanyLocationView
    },
    {
        path: 'paths',
        outlet: 'view',
        component: CompanyLocationView
    },
    {
        path: 'racks',
        outlet: 'view',
        component: CompanyLocationView
    },
    {
        path: 'shelves',
        outlet: 'view',
        component: CompanyLocationView
    },
    {
        path: 'boxes',
        outlet: 'view',
        component: CompanyLocationView
    }
]

const routes: Routes = [
    {
        path: '',
        component: LocationOverview,
        children: children
    }
]

@NgModule({
    declarations: [LocationOverview],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LogiTabsModule,
        LogiHeaderModule,

        // Tabs
        CompanyLocationViewModule,
        EstablishmentLocationViewModule,
    ],
    providers: []
})
export class LocationOverviewModule { }