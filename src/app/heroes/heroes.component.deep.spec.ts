import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent (deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let nativeElement: HTMLElement;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
    nativeElement = fixture.nativeElement;
  });

  it('Should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    let heroComponentsDE = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    for (let i = 0; i < heroComponentsDE.length; i++) {
      expect(heroComponentsDE[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`Should call heroSerive.delete when the Hero Component's delete button is clicked.`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    let heroComponentsDE = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponentsDE[0]
      .query(By.css('.delete'))
      .triggerEventHandler('click', { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`Should call heroSerive.delete when the Hero Component's onDeleteClick method is trigger.`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    let heroComponentsDE = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // (<HeroComponent>heroComponentsDE[0].componentInstance).delete.emit(
    //   undefined
    // );
    heroComponentsDE[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('Should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'SuperGirl';
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 72 } as Hero)
    );
    const inputDElement = fixture.debugElement.query(By.css('input'));
    const btnDElement = fixture.debugElement.queryAll(By.css('button'))[0];

    inputDElement.nativeElement.value = name;
    btnDElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    const newHeroComponent = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    )[3];

    expect(newHeroComponent.context.hero.name).toContain(name);
  });

  it('Should have the correct route for the first element', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    console.log(heroComponents[1].query(By.css('a')).nativeElement);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  });
});
