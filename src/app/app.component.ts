import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LANGS, MESSAGE_KEYS} from './utils/enum';
import {PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';
import {PRIMENG_GLOBAL_TRANSLATIONS} from './utils/constants';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly MESSAGE_KEYS = MESSAGE_KEYS;
  private readonly _primeNgConfig = inject(PrimeNGConfig);
  private readonly _translateService = inject(TranslateService);

  constructor() {
    this._translateService.setDefaultLang(LANGS.IT);
    this._translateService.use(LANGS.IT);
  }

  ngOnInit(): void {
    this.initConfig().then();
  }

  private async initConfig(): Promise<void> {
    this._primeNgConfig.ripple = true;
    const get$ = this._translateService.get(PRIMENG_GLOBAL_TRANSLATIONS);
    const translation = await firstValueFrom(get$);
    this._primeNgConfig.setTranslation(translation);
  }
}
