export class DecoratorUtil {
    static getDecorators(target: any, propertyName: string | symbol): any[] {

        const keys: any[] = Reflect.getMetadataKeys(target, propertyName);
        const decorators = keys

          .filter(key => key.toString().startsWith("lambdalib:anotations"))
          .reduce((values, key) => {

            const currValues = Reflect.getMetadata(key, target, propertyName);
            return values.concat(currValues);
          }, []);
      
        return decorators;
    }

    static getClassDecorators (target: any) {
      const keys: any[] = Reflect.getMetadataKeys(target);

      const decorators = keys

        .filter(key => key.startsWith("lambdalib:anotations"))
        .reduce((values, key) => {
          const currValues = Reflect.getMetadata(key, target);
          return values.concat(currValues);
        }, []);

        return decorators;
    }
}

