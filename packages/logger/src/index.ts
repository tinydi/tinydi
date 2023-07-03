import { template } from './utils';

const dataT = '我是出书${test}';
console.log(template.render(dataT, { test: '哈哈哈' }));
