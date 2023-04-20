export module ObjectUtil {
    export function RemoveAllObjectReferences(obj: any): void {
        if (!(obj instanceof Object)) {
            return;
        }
        for (const properyName in obj) {
            try {
                const properyValue = obj[properyName];
                if (properyValue instanceof Object && typeof properyValue !== 'function') {
                    delete obj[properyName];
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}