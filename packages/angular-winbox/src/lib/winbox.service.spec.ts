import { TestBed } from '@angular/core/testing';
import { WinboxService } from './winbox.service';
import { Component } from '@angular/core';

const winBoxMockInstance = {
  show: jest.fn(),
  hide: jest.fn(),
  close: jest.fn(),
  focus: jest.fn(),
  setTitle: jest.fn(),
  onclose: null as (() => void) | null,
};

winBoxMockInstance.close.mockImplementation(() => {
  if (winBoxMockInstance.onclose) {
    winBoxMockInstance.onclose();
  }
});

const WinBoxMock = jest.fn().mockImplementation(() => winBoxMockInstance);

@Component({ selector: 'rbtech-app-welcome', template: '' })
class SimpleComponent {}

describe('WinboxService', () => {
  let service: WinboxService;

  beforeEach(() => {
    (globalThis as any).WinBox = WinBoxMock;

    TestBed.configureTestingModule({
      declarations: [SimpleComponent],
      providers: [WinboxService],
    });

    service = TestBed.inject(WinboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isThereAWinBox should be equal to true', () => {
    service.openWinBox({}, SimpleComponent);
    expect(service.isThereAWinBox).toBe(true);
  });

  it('isThereAWinBox should be equal to false', () => {
    service.openWinBox({}, SimpleComponent);
    service.closeAllWinBoxes();
    expect(service.isThereAWinBox).toBe(false);
  });

  it('number of Winbox instances should be greater than 0', () => {
    service.openWinBox({}, SimpleComponent);
    expect(service.numberOfWinBoxes).toBeGreaterThan(0);
    expect(service.numberOfWinBoxes).toBe(1);
  });

  it('last winbox should be shown', () => {
    service.openWinBox({}, SimpleComponent);
    const secondWinBox = service.openWinBox({}, SimpleComponent);
    if (secondWinBox) {
      const spy = jest.spyOn(secondWinBox.winBox, 'show');
      service.showLastWinbox();
      expect(spy).toHaveBeenCalled();
    }
  });

  it('number of opened winbox should be decreased', () => {
    const winBoxWrapper = service.openWinBox({}, SimpleComponent);
    expect(service.numberOfWinBoxes).toBe(1);
    if (winBoxWrapper) winBoxWrapper.winBox.close();
    expect(service.numberOfWinBoxes).toBe(0);
  });
});
