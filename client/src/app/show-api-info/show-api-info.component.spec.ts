import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowApiInfoComponent } from './show-api-info.component';

describe('ShowApiInfoComponent', () => {
  let component: ShowApiInfoComponent;
  let fixture: ComponentFixture<ShowApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowApiInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
