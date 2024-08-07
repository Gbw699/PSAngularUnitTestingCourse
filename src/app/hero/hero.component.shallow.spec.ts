import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroComponent);
    nativeElement = fixture.nativeElement;
  });

  it('Should have the correct hero', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'Hulk',
      strength: 90,
    };

    expect(fixture.componentInstance.hero.name).toEqual('Hulk');
  });

  it('Should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'Hulk',
      strength: 90,
    };
    fixture.detectChanges();

    expect(nativeElement.querySelector('a')?.textContent).toContain('Hulk');
    expect(
      fixture.debugElement.query(By.css('a')).nativeElement.textContent
    ).toContain('Hulk');
  });
});
