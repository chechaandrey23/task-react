import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en_Profile from './locale/en/components/Profile.json';
import en_TopNavBar from './locale/en/components/TopNavBar.json';
import en_NewsMore from './locale/en/components/NewsMore.json';
import en_NewsItem from './locale/en/components/NewsItem.json';
import en_NewsDeleteModal from './locale/en/components/NewsDeleteModal.json';
import en_NewsCreateModal from './locale/en/components/NewsCreateModal.json';
import en_News from './locale/en/components/News.json';
import en_LogoutModal from './locale/en/components/LogoutModal.json';
import en_Home from './locale/en/components/Home.json';
import en_Error from './locale/en/components/Error.json';
import en_Auth from './locale/en/components/Auth.json';

import ua_Profile from './locale/ua/components/Profile.json';
import ua_TopNavBar from './locale/ua/components/TopNavBar.json';
import ua_NewsMore from './locale/ua/components/NewsMore.json';
import ua_NewsItem from './locale/ua/components/NewsItem.json';
import ua_NewsDeleteModal from './locale/ua/components/NewsDeleteModal.json';
import ua_NewsCreateModal from './locale/ua/components/NewsCreateModal.json';
import ua_News from './locale/ua/components/News.json';
import ua_LogoutModal from './locale/ua/components/LogoutModal.json';
import ua_Home from './locale/ua/components/Home.json';
import ua_Error from './locale/ua/components/Error.json';
import ua_Auth from './locale/ua/components/Auth.json';

i18n
	//.use(Backend)
	//.use()
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				"components/Profile": en_Profile,
        "components/TopNavBar": en_TopNavBar,
        "components/NewsMore": en_NewsMore,
        "components/NewsItem": en_NewsItem,
        "components/NewsDeleteModal": en_NewsDeleteModal,
        "components/NewsCreateModal": en_NewsCreateModal,
        "components/News": en_News,
        "components/LogoutModal": en_LogoutModal,
        "components/Home": en_Home,
        "components/Error": en_Error,
        "components/Auth": en_Auth,
			},
			ua: {
				"components/Profile": ua_Profile,
        "components/TopNavBar": ua_TopNavBar,
        "components/NewsMore": ua_NewsMore,
        "components/NewsItem": ua_NewsItem,
        "components/NewsDeleteModal": ua_NewsDeleteModal,
        "components/NewsCreateModal": ua_NewsCreateModal,
        "components/News": ua_News,
        "components/LogoutModal": ua_LogoutModal,
        "components/Home": ua_Home,
        "components/Error": ua_Error,
        "components/Auth": ua_Auth,
			}
		},
		lng: JSON.parse(localStorage.getItem('locale')),
		fallbackLng: 'en',
		//debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		}
	});

export default i18n;
