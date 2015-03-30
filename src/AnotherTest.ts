/// <reference path="Dependency.ts" />

class AnotherTest {

	public henk: string;

	public giveHenk(): string {
		return this.henk;
	}

	public useDependencyToSetHenk(dependency: Dependency): void {
		this.henk = dependency.methodToMock();
	}

}