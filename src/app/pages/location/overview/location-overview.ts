import { Component } from "@angular/core";
import { ITab } from "src/app/components/logi-tabs/logi-tabs";
import { CompanyLocationView } from "./company-location/company-location";
import { EstablishmentLocationView } from "./establishment-location/establishment-location";
import { OverviewTabsTemplateBase } from "../../../templates/overview-tabs/overview-tabs-template";

@Component({
    selector: 'location-overview',
    templateUrl: '../../../templates/overview-tabs/overview-tabs-template.html',
    styleUrls: ['../../../templates/overview-tabs/overview-tabs-template.scss']
})

export class LocationOverview extends OverviewTabsTemplateBase {
    override title: string = 'Locations';
    override tabs: ITab[] = [
        {
            name: 'Company',
            route: 'company',
            component: CompanyLocationView
        },
        {
            name: 'Establishments',
            route: 'establishments',
            component: EstablishmentLocationView
        },
        // {
        //     name: 'Halls',
        //     route: 'halls'
        // },
        // {
        //     name: 'Paths',
        //     route: 'paths'
        // },
        // {
        //     name: 'Racks',
        //     route: 'racks'
        // },
        // {
        //     name: 'Shelves',
        //     route: 'shelves'
        // },
        // {
        //     name: 'Boxes',
        //     route: 'boxes'
        // }
    ];
}