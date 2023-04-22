import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'logi-tabs',
    templateUrl: 'logi-tabs.html',
    styleUrls: ['./logi-tabs.scss']
})
export class LogiTabs implements OnInit {
    @Input() tabs: ITab[];

    constructor(private _router: Router) { }

    ngOnInit(): void {
        if (!this._router.url.includes('view')) {
            this._router.navigate([this._getParentRoute(), { outlets: { view: [this.tabs[0].route] } }]);
        }
    }

    onActivateRoute(viewInstance: any): void {
        this._resetAllTabs();
        const selectedTabIndex = this._getSelectedTabIndex(viewInstance);
        this.tabs[selectedTabIndex].selected = true;
    }

    onClickTab(route: string): void {
        this._router.navigate([this._getParentRoute(), { outlets: { view: [route] } }]);
    }

    private _resetAllTabs(): void {
        for (const tab of this.tabs) {
            tab.selected = false;
        }
    }

    private _getSelectedTabIndex(viewInstance: any): number {
        return this.tabs.findIndex(x => x.component && x.component.prototype && x.component.prototype.isPrototypeOf(viewInstance));
    }

    private _getParentRoute(): string {
        if (!this._router.url.includes('view')) {
            return this._router.url;
        }
        const index = this._router.url.indexOf('/(view');
        return this._router.url.slice(0, index);
    }
}

export interface ITab {
    name: string;
    route: string;
    component: any;
    selected?: boolean;
}