import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router'; // << aggiungi questo

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // << e questo
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private scriptEl?: HTMLScriptElement;

  ngAfterViewInit(): void {
    // Esegue gli script legacy dopo il render, per preservare funzionalità
    this.scriptEl = document.createElement('script');
    this.scriptEl.src = 'assets/legacy.js';
    this.scriptEl.defer = true;
    document.body.appendChild(this.scriptEl);

    // Se definita in legacy.js, chiama legacyInit()
    const tryInit = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && (window as any).legacyInit) {
        // @ts-ignore
        (window as any).legacyInit();
      }
    };
    setTimeout(tryInit, 0);
  }

  ngOnDestroy(): void {
    if (this.scriptEl) this.scriptEl.remove();
    // @ts-ignore
    if (typeof window !== 'undefined' && (window as any).legacyDestroy) {
      // @ts-ignore
      (window as any).legacyDestroy();
    }
  }
}
