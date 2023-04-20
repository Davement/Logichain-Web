import { EventEmitter, Injectable, Output } from "@angular/core";
import { IToolbarItem } from "./logi-toolbar.model";

@Injectable()
export class ToolbarController implements IToolbarController {
    @Output() itemsChanged = new EventEmitter<IToolbarItem>();
    
    private items: IToolbarItem[] = [];

    add(item: IToolbarItem, beforeItemId?: string): void {
        let index = this.items.findIndex(x => x.id === item.id);
        if (index !== -1) {
            // TODO add log: Item id already exists
            return;
        }

        if (beforeItemId) {
            var beforeItemIndex = this.items.findIndex(x => x.id === beforeItemId);
            item.options.index = beforeItemIndex;
            this.items.splice(beforeItemIndex, 0, item);
        } else {
            this.items.push(item);
        }
        this.itemsChanged.emit(item);
    }

    show(id: string): void {
        let item = this._getItemById(id);
        if (!item) {
            // TODO log: Item not found
            return;
        }

        item.options.visible = true;
        this.itemsChanged.emit(item);
    }

    hide(id: string): void {
        let item = this._getItemById(id);
        if (!item) {
            // TODO log: Item not found
            return;
        }

        item.options.visible = false;
        this.itemsChanged.emit(item);
    }

    enable(id: string): void {
        let item = this._getItemById(id);
        if (!item) {
            // TODO log: Item not found
            return;
        }

        item.options.disabled = false;
        this.itemsChanged.emit(item);
    }

    disable(id: string): void {
        let item = this._getItemById(id);
        if (!item) {
            // TODO log: Item not found
            return;
        }

        item.options.disabled = true;
        this.itemsChanged.emit(item);
    }

    clearItems(): void {
        this.items = [];
    }

    private _getItemById(id: string): IToolbarItem {
        return this.items.find(x => x.id == id);
    }
}

export interface IToolbarController {
    add(item: IToolbarItem, beforeItemId?: string): void;
    show(id: string): void;
    hide(id: string): void;
    enable(id: string): void;
    disable(id: string): void;
    clearItems(): void;

    itemsChanged: EventEmitter<IToolbarItem>;
}