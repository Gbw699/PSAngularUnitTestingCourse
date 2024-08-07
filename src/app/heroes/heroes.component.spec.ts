import { of, subscribeOn } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe("HeroesComponent", () => {
  let HEROES;
  let mockHeroService;
  let component;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);

    component = new HeroesComponent(mockHeroService);
  });


  it("Get method should storage an array of heroes", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    component.getHeroes();

    expect(component.heroes.length).toBe(3);
  });

  it("Add methiod should push a hero to the array of heroes", () => {
    mockHeroService.addHero.and.returnValue(of({ id: 4, name: "Iron Man", strength: 35 } as Hero));
    component.heroes = HEROES;

    component.add("Iron Man");

    expect(component.heroes[3].name).toBe("Iron Man");
  });

  it("Delete method should remove a hero from the heroes list", () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    component.delete(component.heroes[1]);

    expect(component.heroes[1].id).toEqual(3);
  });

  it("Delete method should call delete from HeroService", () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    component.delete(HEROES[1]);

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
  });
});
