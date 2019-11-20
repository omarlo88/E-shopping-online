import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTolbarComponent } from './my-tolbar.component';

describe('MyTolbarComponent', () => {
  let component: MyTolbarComponent;
  let fixture: ComponentFixture<MyTolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
