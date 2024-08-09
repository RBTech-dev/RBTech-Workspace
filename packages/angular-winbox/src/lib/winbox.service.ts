import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  createComponent,
  Injectable,
  Type,
} from '@angular/core';
import 'winbox';

declare const WinBox: WinBox.WinBoxConstructor;

export type WinBoxOptions = WinBox.Params;

export interface WinBoxContainer<ComponentInstance> {
  winBox: WinBox;
  instance: ComponentInstance;
  changeDetectorRef?: ChangeDetectorRef;
}

@Injectable({ providedIn: 'root' })
export class WinboxService {
  private winBoxStack: WinBox[] = [];
  public isThereAWinBox = false;

  constructor(private appRef: ApplicationRef) {}
  get numberOfWinBoxes(): number {
    return this.winBoxStack.length;
  }

  /**
   * Opens a new WinBox with the specified options and component.
   *
   * This function creates a new WinBox using the provided `options` and attaches the specified `component` to it.
   * It also handles the `onclose` event to invoke the provided `options.onclose` function, if any, and destroys the component
   * and removes the WinBox from the stack when the WinBox is closed.
   *
   * @param options - The options for the WinBox.
   * @param component - The component type to be displayed in the WinBox.
   *
   * @returns An object containing the WinBox instance, the component instance, and the ChangeDetectorRef associated with the component.
   */
  openWinBox<ComponentInstance>(
    options: WinBoxOptions,
    component: Type<ComponentInstance>,
  ): WinBoxContainer<ComponentInstance> {
    const winBox = new WinBox(options);

    const componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      hostElement: winBox.body,
    });
    this.appRef.attachView(componentRef.hostView);

    // Extends the Winbox onclose method to pass a function to execute inside it.
    const optionsClose = options.onclose;
    winBox.onclose = (force) => {
      if (force) {
        return this.destroyComponent<ComponentInstance>(componentRef, winBox);
      }
      const isCloseConfirmed = optionsClose?.apply(winBox, [force]);
      if (isCloseConfirmed || !optionsClose) {
        return this.destroyComponent<ComponentInstance>(componentRef, winBox);
      }
      return true;
    };
    this.isThereAWinBox = true;
    this.winBoxStack.push(winBox);
    winBox.hide();
    return {
      winBox,
      instance: componentRef.instance,
      changeDetectorRef: componentRef.injector.get(ChangeDetectorRef),
    };
  }

  /**
   * Closes all currently open Winboxes.
   *
   * This method iterates through the `winBoxStack` array, closes each Winbox by invoking the `close` method with `true` as the argument,
   * and then clears the `winBoxStack` array. It also sets the `isThereAWinBox` flag to `false`.
   *
   * @returns {void} This method does not return any value.
   */
  public closeAllWinBoxes(): void {
    for (const winBox of this.winBoxStack) {
      winBox.close(true);
    }
    this.winBoxStack = [];
    this.isThereAWinBox = false;
  }

  /**
   * Shows the last Winbox in the stack.
   *
   * This method retrieves the last Winbox from the `winBoxStack` array and invokes the `show` method on it.
   * If the `winBoxStack` is empty, this method does nothing.
   *
   * @returns {void} This method does not return any value.
   */
  public showLastWinbox(): void {
    if (this.winBoxStack.length > 0) {
      this.winBoxStack[this.winBoxStack.length - 1].show();
    }
  }

  /** This method minimize a Winbox selected by id*/
  /**
   * This method minimizes or restores a Winbox identified by its id.
   *
   * @param id - The id of the Winbox to be minimized or restored. It can be either a string or a number.
   * @param state - A boolean value indicating whether to minimize or restore the Winbox.
   *   - If `true`, the Winbox will be minimized.
   *   - If `false`, the Winbox will be restored to its previous state.
   *
   * @returns {void} This method does not return any value.
   */
  public minimizeWinbox(id: string | number, state: boolean) {
    this.winBoxStack.find((winbox) => winbox.id === id)?.minimize(state);
  }

  /**
   * This method maximizes or restores a Winbox identified by its id.
   *
   * @param id - The id of the Winbox to be maximized or restored. It can be either a string or a number.
   * @param state - A boolean value indicating whether to maximize or restore the Winbox.
   *   - If `true`, the Winbox will be maximized.
   *   - If `false`, the Winbox will be restored to its previous state.
   *
   * @returns {void} This method does not return any value.
   */
  public maximizeWinbox(id: string | number, state: boolean) {
    this.winBoxStack.find((winbox) => winbox.id === id)?.maximize(state);
  }

  /**
   * This private method is responsible for destroying a component instance and removing the corresponding Winbox from the stack.
   *
   * @param componentRef - The reference to the component instance that needs to be destroyed.
   * @param winBox - The Winbox associated with the component instance that needs to be removed from the stack.
   *
   * @returns {boolean} This method always returns `false`. The return value is not used in the context of this method.
   *
   * @internal
   */
  private destroyComponent<ComponentInstance>(
    componentRef: ComponentRef<ComponentInstance>,
    winBox: WinBox,
  ): boolean {
    componentRef.destroy();
    this.winBoxStack = this.winBoxStack.filter((w) => w.id !== winBox.id);
    this.isThereAWinBox = this.winBoxStack.length !== 0;
    return false;
  }
}
