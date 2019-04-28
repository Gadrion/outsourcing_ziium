import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import { Http } from 'util/lib';
import * as langActions from 'store/modules/base/langModule';
import languageList from 'util/static/constants/constantLang.js';

const url = '/kimey95/develop-uwa30/index.php/system/system_dtlh_data';
const langUrl = '/kimey95/develop-uwa30/index.php/lang/lang_data';

function* asyncGetCurrentLanguageSaga() {
  while (true) {
    yield take(langActions.GET_CURRENT_LANGUAGE);
    try {
      const result = yield Http.post({ url });
      const currentLanguage = languageList[result.data.lang];
      const lang = yield Http.get({
        url: langUrl,
        params: {
          language: currentLanguage.name,
        },
      });

      yield put(langActions.getCurrentLanguageSuccess({
        currentLanguage,
        lang,
      }));
    } catch (e) {
      yield put(langActions.getCurrentLanguageFailure());
    }
  }
}

function* asyncChangeLanguageSaga() {
  while (true) {
    const action = yield take(langActions.CHANGE_LANGUAGE);
    try {
      const currentLanguage = languageList[action.payload];
      // const lang = langs[currentLanguage.name];
      const lang = yield Http.get({
        url: langUrl,
        params: {
          language: currentLanguage.name,
        },
      });

      yield put(langActions.changeLanguageSuccess({
        currentLanguage,
        lang,
      }));
    } catch (e) {
      yield put(langActions.changeLanguageFailure());
    }
  }
}

export default function* rootLangSaga() {
  yield all([
    asyncGetCurrentLanguageSaga(),
    asyncChangeLanguageSaga(),
  ]);
}
