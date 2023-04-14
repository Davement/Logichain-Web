import { ITab } from "src/app/components/logi-tabs/logi-tabs";

export abstract class OverviewTabsTemplateBase {
    abstract title: string;
    abstract tabs: ITab[];
}