export interface IToolbarItem {
    id: string;
    location: ToolbarItemLocations;
    options: IToolbarOptions;
}

export interface IToolbarOptions {
    icon: string;
    text: string;
    type: ToolbarItemTypes;
    onClick: Function;
    visible?: boolean;
    disabled?: boolean;
    index?: number;
}

export enum ToolbarItemTypes {
    PrimaryButton,
    NormalButton,
    ErrorButton
}

export enum ToolbarItemLocations {
    Before,
    After
}