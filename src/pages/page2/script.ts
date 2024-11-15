import '../../shared/style.css';
import { sharedFunction } from '../../shared/utils';

sharedFunction();

const language = document.documentElement.lang;
if (language === 'zh') {
  console.log('这是中文页面');
} else if (language === 'en') {
  console.log('This is the English page');
}
