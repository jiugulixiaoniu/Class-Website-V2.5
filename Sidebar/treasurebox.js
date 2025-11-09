// 导航栏滚动效果
const $ = (id) => document.getElementById(id)
const navbar = $('navbar');
const backToTop = $('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
    navbar.classList.remove('shadow-sm');
  } else {
    navbar.classList.remove('shadow-md');
    navbar.classList.add('shadow-sm');
  }

  if (window.scrollY > 300) {
    backToTop.classList.remove('opacity-0', 'invisible');
    backToTop.classList.add('opacity-100', 'visible');
  } else {
    backToTop.classList.add('opacity-0', 'invisible');
    backToTop.classList.remove('opacity-100', 'visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
}));

// 移动端菜单
const mobileMenuButton = $('mobile-menu-button');
const mobileMenu = $('mobile-menu');
mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// 工具弹窗
const toolModal = $('toolModal');
const toolTitle = $('toolTitle');
const toolContent = $('toolContent');

function closeToolModal() {
  toolModal.classList.add('hidden');
}

// 计算器工具
function openCalculator() {
  toolTitle.textContent = '计算器';
  toolContent.innerHTML = `
                <div class="calculator">
                    <input type="text" id="calcDisplay" class="w-full p-3 mb-4 text-right text-xl border border-gray-300 rounded-lg" readonly>
                    <div class="grid grid-cols-4 gap-2">
                        <button onclick="clearCalc()" class="col-span-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium">C</button>
                        <button onclick="appendToCalc('/')" class="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium">÷</button>
                        <button onclick="appendToCalc('*')" class="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium">×</button>
                        
                        <button onclick="appendToCalc('7')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">7</button>
                        <button onclick="appendToCalc('8')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">8</button>
                        <button onclick="appendToCalc('9')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">9</button>
                        <button onclick="appendToCalc('-')" class="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium">-</button>
                        
                        <button onclick="appendToCalc('4')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">4</button>
                        <button onclick="appendToCalc('5')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">5</button>
                        <button onclick="appendToCalc('6')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">6</button>
                        <button onclick="appendToCalc('+')" class="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium">+</button>
                        
                        <button onclick="appendToCalc('1')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">1</button>
                        <button onclick="appendToCalc('2')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">2</button>
                        <button onclick="appendToCalc('3')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">3</button>
                        <button onclick="calculate()" class="row-span-2 p-3 bg-primary text-white hover:bg-primary/90 rounded-lg font-medium">=</button>
                        
                        <button onclick="appendToCalc('0')" class="col-span-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">0</button>
                        <button onclick="appendToCalc('.')" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">.</button>
                    </div>
                </div>
            `;
  toolModal.classList.remove('hidden');
}

function appendToCalc(value) {
  $('calcDisplay').value += value;
}

function clearCalc() {
  $('calcDisplay').value = '';
}

function calculate() {
  try {
    const result = eval($('calcDisplay').value);
    $('calcDisplay').value = result;
  } catch (e) {
    $('calcDisplay').value = 'Error';
  }
}

// 单位转换工具
function openConverter() {
  toolTitle.textContent = '单位转换';
  toolContent.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">转换类型</label>
                        <select id="conversionType" onchange="updateConversionUnits()" class="w-full p-2 border border-gray-300 rounded-lg">
                            <option value="length">长度</option>
                            <option value="weight">重量</option>
                            <option value="temperature">温度</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">从</label>
                        <div class="flex gap-2">
                            <input type="number" id="fromValue" class="flex-1 p-2 border border-gray-300 rounded-lg" placeholder="输入数值">
                            <select id="fromUnit" class="p-2 border border-gray-300 rounded-lg">
                                <option value="m">米</option>
                                <option value="cm">厘米</option>
                                <option value="km">千米</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">到</label>
                        <div class="flex gap-2">
                            <input type="text" id="toValue" class="flex-1 p-2 border border-gray-300 rounded-lg" readonly placeholder="转换结果">
                            <select id="toUnit" class="p-2 border border-gray-300 rounded-lg">
                                <option value="cm">厘米</option>
                                <option value="m">米</option>
                                <option value="km">千米</option>
                            </select>
                        </div>
                    </div>
                    
                    <button onclick="convert()" class="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">转换</button>
                </div>
            `;
  toolModal.classList.remove('hidden');
}

function updateConversionUnits() {
  const type = $('conversionType').value;
  const fromUnit = $('fromUnit');
  const toUnit = $('toUnit');

  if (type === 'length') {
    fromUnit.innerHTML = '<option value="m">米</option><option value="cm">厘米</option><option value="km">千米</option>';
    toUnit.innerHTML = '<option value="cm">厘米</option><option value="m">米</option><option value="km">千米</option>';
  } else if (type === 'weight') {
    fromUnit.innerHTML = '<option value="kg">千克</option><option value="g">克</option><option value="t">吨</option>';
    toUnit.innerHTML = '<option value="g">克</option><option value="kg">千克</option><option value="t">吨</option>';
  } else if (type === 'temperature') {
    fromUnit.innerHTML = '<option value="c">摄氏度</option><option value="f">华氏度</option><option value="k">开尔文</option>';
    toUnit.innerHTML = '<option value="f">华氏度</option><option value="c">摄氏度</option><option value="k">开尔文</option>';
  }
}

function convert() {
  const fromValue = parseFloat($('fromValue').value);
  const fromUnit = $('fromUnit').value;
  const toUnit = $('toUnit').value;

  if (isNaN(fromValue)) {
    $('toValue').value = '请输入有效数值';
    return;
  }

  let result;

  // 长度转换
  if (fromUnit === 'm' && toUnit === 'cm') result = fromValue * 100;
  else if (fromUnit === 'm' && toUnit === 'km') result = fromValue / 1000;
  else if (fromUnit === 'cm' && toUnit === 'm') result = fromValue / 100;
  else if (fromUnit === 'cm' && toUnit === 'km') result = fromValue / 100000;
  else if (fromUnit === 'km' && toUnit === 'm') result = fromValue * 1000;
  else if (fromUnit === 'km' && toUnit === 'cm') result = fromValue * 100000;

  // 重量转换
  else if (fromUnit === 'kg' && toUnit === 'g') result = fromValue * 1000;
  else if (fromUnit === 'kg' && toUnit === 't') result = fromValue / 1000;
  else if (fromUnit === 'g' && toUnit === 'kg') result = fromValue / 1000;
  else if (fromUnit === 'g' && toUnit === 't') result = fromValue / 1000000;
  else if (fromUnit === 't' && toUnit === 'kg') result = fromValue * 1000;
  else if (fromUnit === 't' && toUnit === 'g') result = fromValue * 1000000;

  // 温度转换
  else if (fromUnit === 'c' && toUnit === 'f') result = fromValue * 9 / 5 + 32;
  else if (fromUnit === 'c' && toUnit === 'k') result = fromValue + 273.15;
  else if (fromUnit === 'f' && toUnit === 'c') result = (fromValue - 32) * 5 / 9;
  else if (fromUnit === 'f' && toUnit === 'k') result = (fromValue - 32) * 5 / 9 + 273.15;
  else if (fromUnit === 'k' && toUnit === 'c') result = fromValue - 273.15;
  else if (fromUnit === 'k' && toUnit === 'f') result = (fromValue - 273.15) * 9 / 5 + 32;

  else result = fromValue; // 相同单位

  $('toValue').value = result.toFixed(4);
}

// 计时器工具
let timerInterval;
let timerSeconds = 0;
let isTimerRunning = false;

function openTimer() {
  toolTitle.textContent = '计时器';
  toolContent.innerHTML = `
                <div class="space-y-4">
                    <div class="text-center">
                        <div id="timerDisplay" class="text-4xl font-mono font-bold text-primary mb-4">00:00:00</div>
                    </div>
                    
                    <div class="flex justify-center gap-2">
                        <button id="timerStartBtn" onclick="startTimer()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            <i class="fas fa-play mr-2"></i>开始
                        </button>
                        <button id="timerPauseBtn" onclick="pauseTimer()" class="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors" disabled>
                            <i class="fas fa-pause mr-2"></i>暂停
                        </button>
                        <button onclick="resetTimer()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                            <i class="fas fa-redo mr-2"></i>重置
                        </button>
                    </div>
                    
                    <hr class="my-4">
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">倒计时（秒）</label>
                        <div class="flex gap-2">
                            <input type="number" id="countdownInput" class="flex-1 p-2 border border-gray-300 rounded-lg" placeholder="输入秒数">
                            <button onclick="startCountdown()" class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
                                开始倒计时
                            </button>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div id="countdownDisplay" class="text-2xl font-mono font-bold text-secondary">00:00</div>
                    </div>
                </div>
            `;
  toolModal.classList.remove('hidden');
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    $('timerStartBtn').disabled = true;
    $('timerPauseBtn').disabled = false;

    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  if (isTimerRunning) {
    isTimerRunning = false;
    $('timerStartBtn').disabled = false;
    $('timerPauseBtn').disabled = true;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;

  const display =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

  $('timerDisplay').textContent = display;
}

let countdownInterval;
let countdownSeconds = 0;

function startCountdown() {
  const input = $('countdownInput');
  countdownSeconds = parseInt(input.value);

  if (isNaN(countdownSeconds) || countdownSeconds <= 0) {
    input.value = '';
    return;
  }

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    countdownSeconds--;
    updateCountdownDisplay();

    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      $('countdownDisplay').textContent = '时间到！';
      $('countdownDisplay').classList.add('text-danger');
    }
  }, 1000);

  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;

  const display =
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

  $('countdownDisplay').textContent = display;
  $('countdownDisplay').classList.remove('text-danger');
}

// 随机数生成器工具
function openRandomGenerator() {
  toolTitle.textContent = '随机数生成器';
  toolContent.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">最小值</label>
                        <input type="number" id="minValue" class="w-full p-2 border border-gray-300 rounded-lg" value="1">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">最大值</label>
                        <input type="number" id="maxValue" class="w-full p-2 border border-gray-300 rounded-lg" value="100">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">生成数量</label>
                        <input type="number" id="countValue" class="w-full p-2 border border-gray-300 rounded-lg" value="1" min="1" max="10">
                    </div>
                    
                    <button onclick="generateRandom()" class="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">生成随机数</button>
                    
                    <div id="randomResult" class="p-4 bg-gray-50 rounded-lg min-h-[60px] flex items-center justify-center">
                        <span class="text-gray-400">点击生成随机数</span>
                    </div>
                </div>
            `;
  toolModal.classList.remove('hidden');
}

function generateRandom() {
  const min = parseInt($('minValue').value);
  const max = parseInt($('maxValue').value);
  const count = parseInt($('countValue').value);

  if (isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count < 1 || count > 10) {
    $('randomResult').innerHTML = '<span class="text-danger">请输入有效的参数</span>';
    return;
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  ('randomResult').innerHTML = `<div class="text-center"><div class="text-2xl font-bold text-primary">${results.join(', ')}</div><div class="text-sm text-gray-500 mt-2">范围: ${min}-${max}</div></div>`;
}