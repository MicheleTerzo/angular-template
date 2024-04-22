import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {LANGS} from './utils/enum';
import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MissingTranslationKeyHandler} from './utils/missing-translation-key.handler';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';

function HttpLoaderFactory(http: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: './assets/i18n/',
      suffix: '.json'
    }
  ]);
}

function translateFactory(translate: TranslateService) {
  return async (): Promise<unknown> => {
    translate.setDefaultLang(LANGS.IT);
    translate.use(LANGS.IT);
    return new Promise(resolve => {
      translate.onLangChange.subscribe(() => resolve(() => {}));
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      TranslateModule.forRoot({
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationKeyHandler
        },
        useDefaultLang: false,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend]
        }
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    DialogService,
    MessageService,
    ConfirmationService
  ]
};
