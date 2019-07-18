import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DunyanaWorkingProcessComponent } from './dunyana-working-process.component';

describe('DunyanaWorkingProcessComponent', () => {
  let component: DunyanaWorkingProcessComponent;
  let fixture: ComponentFixture<DunyanaWorkingProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DunyanaWorkingProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DunyanaWorkingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
