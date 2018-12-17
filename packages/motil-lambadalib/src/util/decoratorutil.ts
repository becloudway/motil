export class DecoratorUtil {
    static getDecorators(target: any, propertyName: string | symbol): any[] {
        return Reflect.getMetadataKeys(target, propertyName)
            .filter(key => key.toString().startsWith("lambdalib:anotations"))
            .reduce((values, key) => values.concat(Reflect.getMetadata(key, target, propertyName)), []);

    }

    static getClassDecorators (target: any) {
        return Reflect.getMetadataKeys(target)
            .filter(key => key.startsWith("lambdalib:anotations"))
            .reduce((values, key) =>  values.concat(Reflect.getMetadata(key, target)), []);
    }
}
