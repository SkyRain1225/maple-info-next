import { exec } from 'child_process';
import fs from 'fs';
import { readdir } from 'fs/promises';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

const PAGE_DIR = './src/pages';
const PAGE_INDEX_DIR = './src/pages/index.ts';
const COMPONENT_DIR = './src/components';
const COMPONENT_INDEX_DIR = './src/components/index.ts';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const createIndexFileText = (name, type) => {
  const indexFileDir = type === 'component' ? COMPONENT_INDEX_DIR : PAGE_INDEX_DIR;

  if (fs.existsSync(indexFileDir)) {
    const importStatement = `export { default as ${name} } from './${name}/${name}';`;
    const indexFileContent = fs.readFileSync(indexFileDir, 'utf-8');

    if (!indexFileContent.includes(importStatement)) {
      fs.appendFileSync(indexFileDir, [`\n${importStatement}`].join('\n'));
    }
  }
};

const createComponentFileText = name => {
  return [
    `import React from 'react';`,
    ``,
    `import * as S from './${name}.styled';`,
    ``,
    `const ${name} = () => {`,
    `  return (`,
    `    <S.Container>`,
    `      `,
    `    </S.Container>`,
    `  );`,
    `};`,
    ``,
    `export default ${name};`,
    ``,
  ].join('\n');
};

const createStyledFileText = name => {
  return [
    `import styled from 'styled-components';`,
    ``,
    `export const Container = styled.div\``,
    `  `,
    `\`;`,
    ``,
  ].join('\n');
};

const createPageFileText = name => {
  return [
    `import React from 'react';`,
    ``,
    `import * as S from './${name}.styled';`,
    ``,
    `const ${capitalize(name)} = () => {`,
    `  return (`,
    `    <S.Container>`,
    `      `,
    `    </S.Container>`,
    `  );`,
    `};`,
    ``,
    `export default ${capitalize(name)};`,
    ``,
  ].join('\n');
};

const createPromptInput = options => {
  const { name = 'name', label } = options;

  return {
    type: 'input',
    name,
    message: `${label}:`,
    validate: input => {
      return String(input).trim().length > 0 || `${label} is required`;
    },
  };
};

const createComponentAndFileOpen = (dir, name, type) => {
  const invalidChars = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣~!@#$%^&*()_+|<>?:{}0-9\s]/;

  const isValidName = !invalidChars.test(name);

  if (!isValidName) {
    console.error(
      '❌ 유효하지 않은 이름입니다.\n[공백, 한글, 숫자, 특수문자는 사용 불가능합니다.]',
    );
    return;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/${name}.styled.ts`, createStyledFileText(name));
  fs.writeFileSync(`${dir}/${name}.tsx`, createComponentFileText(name));

  if (type === 'component') {
    createIndexFileText(name, type);
  }

  console.log(`🎉 ${name} ${type}를 성공적으로 생성했습니다.`);

  if (type === 'component') {
    exec(`code -g ${dir}/${name}.tsx:15:17`);
  } else {
    exec(`code -g ${dir}/${name}.tsx:6:7`);
  }
};

const start = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '생성할 파일의 종류를 선택해주세요.',
      choices: ['component', 'page'],
      default: 'component',
    },
  ]);

  switch (type) {
    case 'component': {
      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: '컴포넌트의 이름을 작성해주세요. (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${componentName}`;

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`❌ ${componentName} 은(는) 이미 존재하는 컴포넌트입니다.`);
        process.exit(0);
      }

      createComponentAndFileOpen(componentDir, componentName, type);

      break;
    }
    case 'page': {
      const { pageName } = await inquirer.prompt([
        createPromptInput({
          name: 'pageName',
          label: '페이지의 이름을 작성해주세요. (PascalCase)',
        }),
      ]);

      const pageDir = `${PAGE_DIR}/${pageName}`;

      // 페이지 디렉토리가 이미 존재하는지 확인
      if (fs.existsSync(pageDir)) {
        console.log(`❌ ${pageName}은 이미 존재하는 페이지입니다.`);
        process.exit(0);
      }

      fs.mkdirSync(pageDir, { recursive: true });
      fs.writeFileSync(`${pageDir}/${pageName}.styled.ts`, createStyledFileText(pageName));
      fs.writeFileSync(`${pageDir}/${pageName}.tsx`, createPageFileText(pageName));
      createIndexFileText(pageName);

      console.log(`🎉 ${pageName} 페이지를 성공적으로 생성했습니다.`);
      console.log(`📂 파일 열기 중...`);

      exec(`code -g ${pageDir}/${pageName}.tsx:6:7`);
      break;
    }
  }
};

start();
