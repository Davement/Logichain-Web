export module ObjectUtil {
    export function RemoveAllObjectReferences(obj: any) {
        let counter = 0;
        if (obj instanceof Object) {
            for (const properyName in obj) {
                try {
                    const properyValue = obj[properyName];
                    if (properyValue instanceof Object && typeof properyValue !== 'function') {
                        delete obj[properyName];
                        counter++;
                    }
                } catch (e) {

                }
            }
        }
    }
}