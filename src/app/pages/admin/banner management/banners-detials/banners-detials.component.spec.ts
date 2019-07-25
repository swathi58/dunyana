import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersDetialsComponent } from './banners-detials.component';

describe('BannersDetialsComponent', () => {
  let component: BannersDetialsComponent;
  let fixture: ComponentFixture<BannersDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
