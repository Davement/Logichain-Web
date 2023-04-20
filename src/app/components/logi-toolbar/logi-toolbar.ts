import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild, ViewContainerRef } from "@angular/core";
import { ButtonTypes, LogiButton } from "../logi-button/logi-button";
import { ToolbarController } from "./logi-toolbar.controller";
import { IToolbarItem, ToolbarItemLocations, ToolbarItemTypes } from "./logi-toolbar.model";

@Component({
    selector: 'logi-toolbar',
    templateUrl: './logi-toolbar.html',
    styleUrls: ['./logi-toolbar.scss']
})
export class LogiToolbar implements OnDestroy {
    @ViewChild('beforeContainer', { read: ViewContainerRef, static: true }) beforeContainer: ViewContainerRef;
    @ViewChild('afterContainer', { read: ViewContainerRef, static: true }) afterContainer: ViewContainerRef;

    @Output() onClickNew = new EventEmitter();
    @Output() onClickDelete = new EventEmitter();

    newButtonInitialized: boolean = false;
    deleteButtonInitialized: boolean = false;

    constructor(
        private _toolbarController: ToolbarController,
        private _elemRef: ElementRef,
    ) {
        this._subscribeToEvents();
        this._addDefaultItems();
    }

    ngOnDestroy(): void {
        this._toolbarController.clearItems();
    }

    private _subscribeToEvents() {
        this._toolbarController.itemsChanged.subscribe((item: IToolbarItem) => this._updateToolbarItems(item));
    }

    private _addDefaultItems(): void {
        this._toolbarController.add({
            id: 'new',
            location: ToolbarItemLocations.Before,
            options: {
                icon: '',
                text: 'New',
                type: ToolbarItemTypes.PrimaryButton,
                index: 0,
                onClick: (button: LogiButton) => {
                    this.onClickNew.emit(button);
                }
            }
        });
        this._toolbarController.add({
            id: 'delete',
            location: ToolbarItemLocations.Before,
            options: {
                icon: '',
                text: 'Delete',
                type: ToolbarItemTypes.ErrorButton,
                disabled: true,
                index: 1,
                onClick: (button: LogiButton) => {
                    this.onClickDelete.emit(button);
                }
            }
        });
    }

    private _updateToolbarItems(item: IToolbarItem): void {
        this._deleteItemIfExists(item.id);

        if (item.options.type === ToolbarItemTypes.PrimaryButton || item.options.type === ToolbarItemTypes.NormalButton || item.options.type === ToolbarItemTypes.ErrorButton) {
            this._addButton(item);
        }
    }

    private _deleteItemIfExists(id: string): void {
        let item = this._elemRef.nativeElement.querySelector('#' + id);
        item?.remove();
    }

    private _addButton(item: IToolbarItem): void {
        let container = this._getToolbarContainer(item.location);
        let component = container?.createComponent(LogiButton, { index: item.options.index });
        if (!component) {
            return;
        }
        component.instance.id = item.id;
        component.instance.text = item.options.text;
        component.instance.buttonType = this._getButtonType(item.options.type);
        component.instance.visible = item.options.visible ?? true;
        component.instance.disabled = item.options.disabled ?? false;
        component.instance.onClick.subscribe(($event: LogiButton) => item.options.onClick($event));
        console.log('Button added')
    }

    private _getToolbarContainer(location: ToolbarItemLocations): ViewContainerRef {
        if (location === ToolbarItemLocations.After) {
            return this.afterContainer;
        }
        return this.beforeContainer;
    }

    private _getButtonType(type: ToolbarItemTypes): ButtonTypes {
        if (type === ToolbarItemTypes.PrimaryButton) {
            return ButtonTypes.Primary;
        }
        if (type === ToolbarItemTypes.ErrorButton) {
            return ButtonTypes.Error;
        }
        return ButtonTypes.Normal;
    }
}