import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
      //   schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    nativeElement = fixture.nativeElement;
    mockHeroService.getHero.and.returnValue(
      of({ id: 5, name: 'Batman', strength: 56 } as Hero)
    );
  });

  it('Should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(nativeElement.querySelector('h2')?.textContent).toContain('BATMAN');
  });

  it('Should call updateHero whensave is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of(undefined));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
