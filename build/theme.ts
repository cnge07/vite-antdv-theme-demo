import less from 'less';
import fs from 'fs';
import path from 'path';
import lessToJs from 'less-vars-to-js';

const stylePath = path.join(__dirname, '../node_modules/ant-design-vue/es', 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const darkLess = fs.readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

const defaultVars = lessToJs(`${colorLess}${defaultLess}`, {
  stripPrefix: true,
  resolveVariables: false,
});;

const darkVars = lessToJs(darkLess, {
  stripPrefix: true,
  resolveVariables: false,
});

const hack = `true;@import "${require.resolve('ant-design-vue/es/style/color/colorPalette.less')}";`

const themeConfig = [
  {
    theme: 'dark',
    htmlThemeAttr: 'dark',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      ...darkVars,
      'text-color': 'fade(@white, 65%)',
      'gray-8': '@text-color',
      'background-color-base': '#555',
      'skeleton-color': 'rgba(0,0,0,0.8)',
    },
  },
  {
    theme: 'purple',
    htmlThemeAttr: 'purple',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@purple-base'
    },
  },
  {
    theme: 'cyan',
    htmlThemeAttr: 'cyan',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@cyan-base'
    },
  },
  {
    theme: 'green',
    htmlThemeAttr: 'green',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@green-base'
    },
  },
  {
    theme: 'magenta',
    htmlThemeAttr: 'magenta',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@magenta-base'
    },
  },
  {
    theme: 'pink',
    htmlThemeAttr: 'pink',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@pink-base'
    },
  },
  {
    theme: 'red',
    htmlThemeAttr: 'red',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@red-base'
    },
  },
  {
    theme: 'orange',
    htmlThemeAttr: 'orange',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@orange-base'
    },
  },
  {
    theme: 'yellow',
    htmlThemeAttr: 'yellow',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@yellow-base'
    },
  },
  {
    theme: 'volcano',
    htmlThemeAttr: 'volcano',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@volcano-base'
    },
  },
  {
    theme: 'geekblue',
    htmlThemeAttr: 'geekblue',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@geekblue-base'
    },
  },
  {
    theme: 'lime',
    htmlThemeAttr: 'lime',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@lime-base'
    },
  },
  {
    theme: 'gold',
    htmlThemeAttr: 'gold',
    modifyVars: {
      hack: hack,
      ...defaultVars,
      'primary-color': '@gold-base'
    },
  },
];

const additionalData = async (content: string, filename: string): Promise<string> => {
  const themePromises = themeConfig.map(async theme => {
    const { htmlThemeAttr, modifyVars = {} } = theme;
    const options = {
      javascriptEnabled: true,
      modifyVars,
      relativeUrls: true,
      filename,
    };
    try {
      const { css } = await less.render(content, options);
      let res = '';
      if (htmlThemeAttr && css) {
        res = `
        [data-theme=${htmlThemeAttr}] {
          ${css}
        }
        `;
      }
      if (htmlThemeAttr === 'dark') {
        return Promise.resolve(res);
      } else {
        let r = await less.render(res)
        let dir = path.join(__dirname, '../public', 'themes')
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        fs.writeFileSync(path.join(__dirname, '../public', 'themes', `${htmlThemeAttr}.css`), r.css)
        return Promise.resolve('');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return Promise.reject(content);
    }
  });
  let res = content;
  for (let themePromise of themePromises) {
    const theme = await themePromise;
    res += theme;
  }
  return res;
};

export default themeConfig;
export { themeConfig, additionalData };