export const updateObjectInArray = (items: any, itemId: number, objPropName: string, newObjProps: any) => {
    //@ts-ignore
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}