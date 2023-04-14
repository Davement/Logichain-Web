import { NgModule } from "@angular/core";

export module GlobalProvider {
    export function getGlobalProviders(moduleDef: NgModule) {
        if (!moduleDef.providers) {
            moduleDef.providers = [];
        }
        // set default providers
        // moduleDef.providers.push({ provide: MenuController, useFactory: MenuControllerMock.instance });
        return moduleDef;
    }
}
