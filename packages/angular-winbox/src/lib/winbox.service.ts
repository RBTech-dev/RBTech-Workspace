import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import 'winbox';
import WinBox from 'winbox';

export type WinBoxOptions = WinBox.Params;

export interface WinBoxContainer<ComponentInstance> {
  winBox: WinBox;
  instance: ComponentInstance;
}

@Injectable({ providedIn: 'root' })
export class WinboxService {
  public isThereAWinBox = false;

  get numberOfWinboxes(): number {
    return this.winBoxStack.length;
  }

  private winBoxStack: WinBox[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  openWinBox<ComponentInstance>(
    options: WinBoxOptions,
    component: Type<ComponentInstance>
  ): WinBoxContainer<ComponentInstance> {
    const winBox = new WinBox({
      ...options,
    });

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(
      this.injector,
      [],
      winBox.body
    );
    componentRef.changeDetectorRef.detectChanges();

    // estensione del metodo per permettere all'utente di passare
    // una funzione da invocare alla chiusura della winBox
    const optionsClose = options.onclose;
    winBox.onclose = (force) => {
      this.winBoxStack = this.winBoxStack.filter((w) => w.id !== winBox.id);
      this.isThereAWinBox = this.winBoxStack.length !== 0;
      optionsClose?.apply(winBox, [force]);
      componentRef.destroy();
      return false;
    };
    this.isThereAWinBox = true;
    this.winBoxStack.push(winBox);
    winBox.hide();
    return { winBox, instance: componentRef.instance };
  }

  public closeAllWinBoxes() {
    for (const winBox of this.winBoxStack) {
      winBox.close();
    }
    this.winBoxStack = [];
    this.isThereAWinBox = false;
  }

  public showLastWinbox() {
    if (this.winBoxStack.length > 0)
      this.winBoxStack[this.winBoxStack.length - 1].show();
  }

  public test() {
    console.log('HELLo');
  }
}
