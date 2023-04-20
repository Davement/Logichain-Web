import { Component, OnInit } from "@angular/core";
import { ToolbarController } from "../../../../components/logi-toolbar/logi-toolbar.controller";
import { OverviewTemplateBase } from "../../../../templates/overview/overview-template";

@Component({
    selector: 'company-location',
    templateUrl: '../../../../templates/overview/overview-template.html',
    styleUrls: ['../../../../templates/overview/overview-template.scss'],
})
export class CompanyLocationView extends OverviewTemplateBase implements OnInit {

    constructor(
        private _toolbarController: ToolbarController,
    ) {
        super();
    }

    ngOnInit(): void {
        this._toolbarController.show('new');
        this._toolbarController.show('delete');
        this._toolbarController.enable('delete')
    }

    override onClickNew(): void {
        // TODO: Add logic
    }

    override onClickDelete(): void {
        // TODO: Add logic
    }
}