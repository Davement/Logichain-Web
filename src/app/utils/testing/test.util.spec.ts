import { ComponentFixture, TestBed, TestModuleMetadata, getTestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ObjectUtil } from "../object.util";

export module TestUtil {
  export function beforeEachCompiler(component: any, config: TestModuleMetadata): Promise<{ fixture: ComponentFixture<any>, instance: any, injector: TestBed }> {
    const injector = getTestBed();
    return TestUtil.configureTestingModule(config).compileComponents().then(() => {
      let fixture: ComponentFixture<any> = null;
      if (component) {
        fixture = TestBed.createComponent(component);
      }
      //this.originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      //jasmine.DEFAULT_TIMEOUT_INTERVAL = Math.pow(2, 31) - 1;
      return TestUtil.setSuite({
        fixture: fixture,
        instance: fixture && fixture.debugElement ? fixture.debugElement.componentInstance : null,
        injector: injector
      });
    }).catch(error => {
      console.error(error);
      return TestUtil.setSuite({
        fixture: null,
        instance: null,
        injector: injector
      })
    });
  }

  export function afterEachCompiler<T>(fixture: ComponentFixture<any>, done?: () => T): Promise<T> {
    if (fixture) {
      try {
        fixture.destroy();
      } catch (e) {
        console.error(e);
      }
      ObjectUtil.RemoveAllObjectReferences(fixture.componentInstance);
      fixture.componentInstance = null;
    }
    ObjectUtil.RemoveAllObjectReferences(TestUtilSuite);
    return Promise.resolve(done && done());
  }

  export function setSuite<T>(suite: ITestUtilSuite<T>): ITestUtilSuite<T> {
    TestUtilSuite.fixture = suite.fixture;
    TestUtilSuite.instance = suite.instance;
    TestUtilSuite.injector = suite.injector;
    return TestUtilSuite;
  }

  export function configureTestingModule(config: TestModuleMetadata): TestBed {
    const moduleDef: TestModuleMetadata = {
      declarations: [],
      providers: [],
      imports: []
    };
    if (!config) {
      return TestBed.configureTestingModule(moduleDef);
    }
    if (Array.isArray(config.imports)) {
      moduleDef.imports = moduleDef.imports.concat(config.imports);
      const routerModuleIndex = moduleDef.imports.findIndex(x => x === RouterModule || x.ngModule === RouterModule);
      if (routerModuleIndex !== -1) {
        moduleDef.imports[routerModuleIndex] = RouterTestingModule.withRoutes([]);
      }
    }
    if (Array.isArray(config.declarations)) {
      moduleDef.declarations = moduleDef.declarations.concat(config.declarations);
    }
    if (Array.isArray(config.providers)) {
      config.providers.forEach(cProvider => {
        if (cProvider instanceof Object) {
          const index = moduleDef.providers.findIndex((mProvider: any) => mProvider && mProvider.provide ? mProvider.provide === cProvider.provide : (<Function>mProvider).name === (<Function>cProvider).name);
          if (index === -1) {
            moduleDef.providers.push(cProvider);
          } else {
            moduleDef.providers[index] = cProvider;
          }
        }
      });
    }
    const injector = getTestBed();
    (<any>injector)._testModuleRef = null;
    return TestBed.configureTestingModule(moduleDef);
  }

  export type Spy<T extends (...args: any[]) => any = any, Y extends any[] = any> = jest.Mock<T, Y>;

  export function SpyOn<T extends {}, M extends jest.FunctionPropertyNames<Required<T>>>(object: T, method: M): Required<T>[M] extends (...args: any[]) => any ? Spy<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>> : never {
    return jest.spyOn(object, method) as any;
  }

  export function SpyOnProperty<T>(object: T, property: keyof T, accessType?: 'get' | 'set') {
    const get = jest.fn().mockName(property.toString());
    if (accessType == 'get') {
      Object.defineProperty(object, property, {
        get: get
      });
    } else if (accessType == 'set') {
      Object.defineProperty(object, property, {
        set: jest.fn().mockName(property.toString())
      });
    } else {
      Object.defineProperty(object, property, {
        get: get,
        set: jest.fn().mockName(property.toString())
      });
    }
    return get;
  }

  export function MostRecentCall<T extends (...args: any) => any>(method: T) {
    const spy: Spy<ReturnType<T>, jest.ArgsType<T>> = method as any;
    expect(spy).toHaveBeenCalled();
    return {
      args: spy.mock.calls[spy.mock.calls.length - 1],
      returnValue: spy.mock.results && spy.mock.results[spy.mock.calls.length - 1] && spy.mock.results[spy.mock.calls.length - 1].value,
    };
  }

  export type Mock<T> = jest.Mocked<T>;

}

export const configureTestSuite = () => {
  const testBedApi: any = getTestBed();
  // let originalTimeoutInterval = 0;
  beforeAll(() => {
    // originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = Math.pow(2, 31) - 1;
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
    testBedApi._testModuleRef = null;
  });
  afterEach(() => {
    testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => {
      try {
        fixture.destroy();
      } catch (e) {
        console.error(e);
      }
      if (fixture.componentInstance) {
        ObjectUtil.RemoveAllObjectReferences(fixture.componentInstance);
      }
    });
    testBedApi._instantiated = false;
  });
}


export const TestUtilSuite: ITestUtilSuite<any> = <any>{};

export interface ITestUtilSuite<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  injector: any;
}