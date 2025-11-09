#!/usr/bin/env node
 // 注意 : 此 JavaScript 用于进行发布动态，请使用终端 node 命令启动

const fs = require('fs/promises')
const input = (() => {
  const readline = require("readline");
  return async function(t = "") {
    const e = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise(i => {
      e.question(t, t => {
        e.close(), i(t)
      })
    })
  }
})()
// 引入必要的模块
const fs = require('fs').promises;  // 用于异步读取文件
const readline = require('readline');  // 用于终端交互输入

// 创建 readline 接口，用于终端输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * async 函数：提示用户输入内容，支持 [文件路径] 引用文件内容
 * @returns {Promise<string>} 用户输入的原始内容 或 文件内容
 */
async function getUserInputWithFileSupport() {
  try {
    // 提示用户输入（可以是普通文本，也可以是 [文件路径]）
    const userInput = (await new Promise((resolve) => {
      rl.question('请输入内容（可直接输入文本，或用 [文件路径] 引用文件内容，例如 [./test.txt]）: ', resolve);
    })).trim()
    if (userInput.startsWith('[') && userInput.endsWith(']')) {
      const filePath = userInput.slice(1, -1); 
      console.log(`📂 检测到文件引用，正在读取文件: ${filePath}`);
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log('文件读取成功，将使用文件内容作为输入。');
        return fileContent;
      } catch (fileErr) {
        console.error(`无法读取文件 "${filePath}"，错误: ${fileErr.message} 使用 ${userInput}`);
        return userInput;
      }
    }
    console.log('✅ 您输入的是普通文本，将直接使用。');
    return userInput;
  } finally {
    rl.close();
  }
}
async function main() {
  const manifest = JSON.parse( await fs.readFile('./content.json') )
  const id = Date.now()
  const title = await input('输入标题 : ')
  const content = await getUserInputWithFileSupport('输入内容 : (用 [文件路径] 引用文件)')
  const date = new Date()
  mamifest.push({
    title: title,
    date: `${date.getFullYear()} : ${date.getMonth()} : ${date.getDate()}`,
    id,
    level: 2
  });
  await fs.writeFile(`./${id}.json`, JSON.stringify({
    content,
    title
  }))
  await fs.writeFile('./content.json', JSON.stringify(manifest))
}
main();
