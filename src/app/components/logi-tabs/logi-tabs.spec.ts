import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { GlobalProvider } from "../../utils/testing/global-provider.util.spec";
import { ITestUtilSuite, TestUtil, TestUtilSuite, configureTestSuite } from "../../utils/testing/test.util.spec";
import { ITab, LogiTabs } from "./logi-tabs";
import { CompanyLocationView } from "../../pages/location/overview/company-location/company-location";
import { EstablishmentLocationView } from "../../pages/location/overview/establishment-location/establishment-location";

describe('LogiTabs', () => {
    configureTestSuite();
    let suite: TestSuite<LogiTabs> = null;

    beforeEach(async () => {
        suite = TestUtilSuite as any;
        await TestUtil.beforeEachCompiler(LogiTabs, GlobalProvider.getGlobalProviders({
            declarations: [LogiTabs],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: []
        }));

        suite.instance.tabs = suite.tabs = [
            {
                name: 'Company',
                route: 'company',
                component: CompanyLocationView
            },
            {
                name: 'Establishments',
                route: 'establishments',
                component: EstablishmentLocationView
            },
        ];

        suite.init = (): void => {
            suite.instance.ngOnInit();
        }

        suite.navigateSpy = TestUtil.SpyOn(suite.instance['_router'] as any, 'navigate').mockImplementation();
    });

    afterEach((done) => {
        TestUtil.afterEachCompiler(suite.fixture, () => {
            suite = null;
            done();
        });
    });

    it('should create', () => {
        suite.init();
        expect(suite.instance).toBeTruthy();
    });

    it('should call navigate when tab is not selected on initialize', () => {
        TestUtil.SpyOnProperty(suite.instance['_router'] as any, 'url').mockReturnValue('locations/');
        suite.init();
        expect(TestUtil.MostRecentCall(suite.navigateSpy).args[0]).toEqual(['locations', { 'outlets': { 'view': ['company'] } }]);
    });

    it('should do not call navigate deep link to tab on initialize', () => {
        TestUtil.SpyOnProperty(suite.instance['_router'] as any, 'url').mockReturnValue('locations/(view:establishments)');
        suite.init();
        expect(suite.navigateSpy).toBeCalledTimes(0);
    });

    it('should call navigate on click tab', () => {
        TestUtil.SpyOnProperty(suite.instance['_router'] as any, 'url').mockReturnValue('locations/');
        suite.init();
        suite.instance.onClickTab('establishments');
        expect(TestUtil.MostRecentCall(suite.navigateSpy).args[0]).toEqual(['locations', { 'outlets': { 'view': ['establishments'] } }]);
    });

    it('should add selected class to selected tab', async () => {
        TestUtil.SpyOnProperty(suite.instance['_router'] as any, 'url').mockReturnValue('locations/(view:establishments)');
        TestUtil.SpyOn(suite.instance, '_getSelectedTabIndex' as any).mockReturnValue(1);

        suite.init();
        suite.instance.onActivateRoute(null);

        suite.fixture.detectChanges();
        await suite.fixture.whenStable();

        const tabs = suite.fixture.nativeElement.querySelector('.tabs');
        expect(tabs.children.length).toEqual(2);
        expect(tabs.children[1].classList.toString()).toEqual('selected');
    });
});

interface TestSuite<T> extends ITestUtilSuite<T> {
    init: () => void;
    router: TestUtil.Mock<Router>;
    navigateSpy: TestUtil.Spy;
    tabs: ITab[];
}
