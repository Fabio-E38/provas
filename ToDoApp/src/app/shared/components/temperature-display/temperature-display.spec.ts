import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureDisplay } from './temperature-display';

describe('TemperatureDisplay', () => {
  let component: TemperatureDisplay;
  let fixture: ComponentFixture<TemperatureDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
