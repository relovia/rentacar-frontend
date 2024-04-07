import { importProvidersFrom } from '@angular/core';
import { ApiModule } from '../api.module';
import { Configuration, ConfigurationParameters } from '../configuration';
import { environment } from '../../../../../environments/environment';

function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.apiUrl,
  };

  return new Configuration(params);
}

<<<<<<< HEAD
=======
// app.config.ts dosyasinda kullaniyor olacagiz.
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
export function provideApiServices() {
  return importProvidersFrom(ApiModule.forRoot(apiConfigFactory));
}
