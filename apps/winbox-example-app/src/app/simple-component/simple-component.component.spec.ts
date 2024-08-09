import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { SimpleComponentComponent } from './simple-component.component';

describe('SimpleComponentComponent', () => {
  let component: SimpleComponentComponent;
  let fixture: ComponentFixture<SimpleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleComponentComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
