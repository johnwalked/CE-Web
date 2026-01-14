import { Product } from './types';

export const TRANSLATIONS = {
  en: {
    nav: { all: 'All' },
    products: { title: 'Our Inventory', all: 'All', generator: 'Generator', pump: 'Pump', viewDetails: 'View Details', unavailable: 'Image Unavailable', refine: 'AI Refine' },
    modal: { description: 'Description', specifications: 'Specifications', requestQuote: 'Request Quote', maxPower: 'Max Power', cooling: 'Cooling', fuel: 'Fuel Cons.', noise: 'Noise', phase: 'Phase', dimensions: 'Dimensions', weight: 'Weight', pf: 'Power Factor' },
    live: { standby: 'Standby Mode', listening: 'Listening...', connectionActive: 'Live Connection Active', start: 'Start Live Call', end: 'End Session', desc_standby: 'Connect for real-time technical assistance.', desc_listening: 'Speak naturally. I can analyze specs, recommend brands, and solve technical issues.' },
    chat: { placeholder: 'Type a message...', search: 'Search', think: 'Think', mediaAttached: 'Media attached' },
    assistant: { textChat: 'Text Chat', liveVoice: 'Live Voice' },
    studio: { title: 'Design Studio', generate: 'Generate', edit: 'Edit', prompt: 'Prompt', size: 'Size (Pro)', source: 'Source Image', upload: 'Click to Upload', btnGenerate: 'Generate Artwork', btnEdit: 'Apply Magic Edit', placeholder: 'Your vision appears here' },
    tasks: { title: 'Task Manager', inputTitle: 'Task Title', inputDesc: 'Description', inputPriority: 'Priority', inputDate: 'Due Date', btnAdd: 'Add Task', listTitle: 'Your Tasks', noTasks: 'No tasks found' }
  },
  am: {
    nav: { all: 'ሁሉም ምርቶች' },
    products: { title: 'የእኛ ዕቃዎች', all: 'ሁሉም', generator: 'ጄነሬተር', pump: 'ፓምፕ', viewDetails: 'ዝርዝር ይመልከቱ', unavailable: 'ምስል የለም', refine: 'AI አሳምር' },
    modal: { description: 'መግለጫ', specifications: 'ዝርዝር መግለጫዎች', requestQuote: 'ዋጋ ይጠይቁ', maxPower: 'ከፍተኛ ኃይል', cooling: 'ማቀዝቀዣ', fuel: 'የነዳጅ ፍጆታ', noise: 'ጫጫታ', phase: 'ፌዝ', dimensions: 'ስፋት', weight: 'ክብደት', pf: 'የኃይል ፋክተር' },
    live: { standby: 'ተጠባባቂ ሞድ', listening: 'እየሰማሁ ነው...', connectionActive: 'ቀጥታ ግንኙነት', start: 'ቀጥታ ይደውሉ', end: 'ጨርስ', desc_standby: 'ለቴክኒክ እርዳታ ይደውሉ።', desc_listening: 'በተፈጥሮ ይናገሩ።' },
    chat: { placeholder: 'መልእክት ይጻፉ...', search: 'ፈልግ', think: 'አስብ', mediaAttached: 'ሚዲያ ተያይዟል' },
    assistant: { textChat: 'የጽሑፍ ውይይት', liveVoice: 'የድምጽ ውይይት' },
    studio: { title: 'ዲዛይን ስቱዲዮ', generate: 'ፍጠር', edit: 'አስተካክል', prompt: 'መግለጫ', size: 'መጠን (Pro)', source: 'ምንጭ ምስል', upload: 'ለመጫን ጠቅ ያድርጉ', btnGenerate: 'ጥበብ ፍጠር', btnEdit: 'አስተካክል', placeholder: 'ራዕይዎ እዚህ ይታያል' },
    tasks: { title: 'የተግባር አስተዳዳሪ', inputTitle: 'የተግባር ርዕስ', inputDesc: 'መግለጫ', inputPriority: 'ቅድሚያ', inputDate: 'የማለቂያ ቀን', btnAdd: 'ተግባር ጨምር', listTitle: 'የእርስዎ ተግባራት', noTasks: 'ምንም ተግባር አልተገኘም' }
  },
  zh: {
    nav: { all: '全部产品' },
    products: { title: '库存清单', all: '全部', generator: '发电机', pump: '水泵', viewDetails: '查看详情', unavailable: '暂无图片', refine: 'AI 优化' },
    modal: { description: '描述', specifications: '规格', requestQuote: '询价', maxPower: '最大功率', cooling: '冷却方式', fuel: '油耗', noise: '噪音', phase: '相数', dimensions: '尺寸', weight: '重量', pf: '功率因数' },
    live: { standby: '待机模式', listening: '聆听中...', connectionActive: '实时连接已激活', start: '开始通话', end: '结束会话', desc_standby: '连接以获取实时技术支持。', desc_listening: '请自然交谈。我可以分析规格并推荐品牌。' },
    chat: { placeholder: '输入消息...', search: '搜索', think: '思考', mediaAttached: '已附加媒体' },
    assistant: { textChat: '文字聊天', liveVoice: '语音通话' },
    studio: { title: '设计工作室', generate: '生成', edit: '编辑', prompt: '提示词', size: '尺寸 (Pro)', source: '原图', upload: '点击上传', btnGenerate: '生成作品', btnEdit: '应用编辑', placeholder: '你的构想将在此呈现' },
    tasks: { title: '任务管理', inputTitle: '任务标题', inputDesc: '描述', inputPriority: '优先级', inputDate: '截止日期', btnAdd: '添加任务', listTitle: '你的任务', noTasks: '没有找到任务' }
  },
  ti: {
    nav: { all: 'ኩሉ ምርታት' },
    products: { title: 'ናይና ንብረት', all: 'ኩሉ', generator: 'ጀነሬተር', pump: 'ፓምፕ', viewDetails: 'ዝርዝር ርኣይ', unavailable: 'ስእሊ የለን', refine: 'AI ኣሳምር' },
    modal: { description: 'መግለጺ', specifications: 'ዝርዝር', requestQuote: 'ዋጋ ሕተት', maxPower: 'ለዓለዋይ ሓይሊ', cooling: 'መዝሓሊ', fuel: 'መቃጸሊ', noise: 'ጫውጫውታ', phase: 'ፌዝ', dimensions: 'ዓቐን', weight: 'ክብደት', pf: 'ፓወር ፋክተር' },
    live: { standby: 'ተጸባይ', listening: 'ይሰምዕ ኣለኹ...', connectionActive: 'ቀጥታ መስመር', start: 'ቀጥታ ደውል', end: 'ጨርስ', desc_standby: 'ቴክኒካዊ ሓገዝ ንምርካብ ደውሉ።', desc_listening: 'ብተፈጥሮ ተዛረብ።' },
    chat: { placeholder: 'መልእኽቲ ጽሓፍ...', search: 'ድለ', think: 'ሕሰብ', mediaAttached: 'ሚድያ ተተሓሒዙ' },
    assistant: { textChat: 'ጽሑፍ', liveVoice: 'ድምጺ' },
    studio: { title: 'ስቱዲዮ ዲዛይን', generate: 'ፍጠር', edit: 'ኣስተኻኽል', prompt: 'መግለጺ', size: 'ዓቐን', source: 'ምንጪ ስእሊ', upload: 'ንምጽዓን ጠውቕ', btnGenerate: 'ስራሕ ፍጠር', btnEdit: 'ኣስተኻኽል', placeholder: 'ራእይኻ ኣብዚ ይርኣይ' },
    tasks: { title: 'ኣካያዲ ስራሕ', inputTitle: 'ርእሲ ስራሕ', inputDesc: 'መግለጺ', inputPriority: 'ቀዳምነት', inputDate: 'መወዳእታ መዓልቲ', btnAdd: 'ስራሕ ወስኽ', listTitle: 'ናትካ ስራሕቲ', noTasks: 'ስራሕ ኣይተረኽበን' }
  },
  om: {
    nav: { all: 'Oomishaalee Hunda' },
    products: { title: 'Oomishaalee Keenya', all: 'Hunda', generator: 'Jenereetara', pump: 'Pampii', viewDetails: 'Bal’inaan Ilaali', unavailable: 'Fakkii Hin Jiru', refine: 'AI Fooyyessi' },
    modal: { description: 'Ibsa', specifications: 'Bal’ina', requestQuote: 'Gatii Gaafadhu', maxPower: 'Humna Ol’aanaa', cooling: 'Qabbaneessituu', fuel: 'Boba’aa', noise: 'Sagalee', phase: 'Feezii', dimensions: 'Hammana', weight: 'Ulfaatina', pf: 'Power Factor' },
    live: { standby: 'Qophii', listening: 'Dhaggeeffachaan jira...', connectionActive: 'Sarara Irra', start: 'Bilbila Kallattii', end: 'Cufi', desc_standby: 'Gargaarsa argachuuf bilbilaa.', desc_listening: 'Akkaumatti dubbadሁ.' },
    chat: { placeholder: 'Ergaa barreessi...', search: 'Barbaadi', think: 'Yaadi', mediaAttached: 'Miidiyaan qabsiifameera' },
    assistant: { textChat: 'Barreeffama', liveVoice: 'Sagalee' },
    studio: { title: 'Dizaayinii', generate: 'Uumi', edit: 'Sirreessi', prompt: 'Ajaja', size: 'Hammana', source: 'Fakkii Ka’umsaa', upload: 'Olkaa’uuf Tuqi', btnGenerate: 'Aartii Uumi', btnEdit: 'Sirreessi', placeholder: 'Mul’anni kee asitti mul’ata' },
    tasks: { title: 'Bulchiinsa Hojii', inputTitle: 'Mata duree Hojii', inputDesc: 'Ibsa', inputPriority: 'Dursa', inputDate: 'Guyyaa xumuraa', btnAdd: 'Hojii Dabali', listTitle: 'Hojii kee', noTasks: 'Hojiin hin jiru' }
  }
};

export const PRODUCTS: Product[] = [
  // --- CE Power (MDZ series) ---
  {
    id: 'mdz-30ds',
    name: 'CE Power MDZ30DS Soundproof',
    brand: 'CE Power',
    type: 'Generator',
    powerKW: 24,
    imageUrl: '/images/mindong-30ds.png',
    specs: {
      maxPower: '30 kVA / 24 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '6.3 L/hr',
      noiseLevel: 'Silent (70dB)',
      dimensions: '2400 x 1000 x 1620 mm',
      weight: '1205 kg'
    },
    description: 'The MDZ series Soundproof generator set. Features an automatic/manual control function, intergral salient pole rotor technique, and world-famous brand engines. Designed for excellent performance and reliability.'
  },
  {
    id: 'mdz-110ds',
    name: 'CE Power MDZ110DS Soundproof',
    brand: 'CE Power',
    type: 'Generator',
    powerKW: 88,
    imageUrl: '/images/mindong-110ds.png',
    specs: {
      maxPower: '110 kVA / 88 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '22 L/hr',
      noiseLevel: 'Silent (72dB)',
      dimensions: '3000 x 1100 x 1720 mm',
      weight: '1944 kg'
    },
    description: 'High-capacity soundproof generator set with advanced sound attenuation. Ideal for urban environments requiring stable power without high noise levels.'
  },
  {
    id: 'cep-50p',
    name: 'CE Power 50HP Water Pump',
    brand: 'CE Power',
    type: 'Pump',
    powerKW: 37,
    imageUrl: '/images/cep-50p.png',
    specs: {
      maxPower: '50 HP / 37 kW',
      powerFactor: 'N/A',
      phase: '3 Phase',
      cooling: 'Air Cooled',
      fuelConsumption: 'N/A',
      noiseLevel: 'Standard',
      dimensions: '1200 x 800 x 900 mm',
      weight: '350 kg'
    },
    description: 'High-efficiency CE Power water pump for agricultural and industrial irrigation.'
  },

  // --- YUCHAI (MDZ-YC series) ---
  {
    id: 'mdz-240yc',
    name: 'Yuchai MDZ240YC Industrial',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 24.5,
    imageUrl: '/images/yuchai-240yc.png',
    specs: {
      maxPower: '30.7 kVA / 24.5 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '7.8 L/hr',
      noiseLevel: 'Open Shelf',
      dimensions: '1850 x 900 x 1200 mm',
      weight: '875 kg'
    },
    description: 'Powered by Yuchai engine, known for low noise, reliable emissions, and high-performance power strong accords with national environmental protection requirements.'
  },
  {
    id: 'yc-50p',
    name: 'Yuchai 50HP Diesel Pump',
    brand: 'Yuchai',
    type: 'Pump',
    powerKW: 37,
    imageUrl: '/images/yc-50p.png',
    specs: {
      maxPower: '50 HP / 37 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '9 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '1500 x 900 x 1100 mm',
      weight: '500 kg'
    },
    description: 'Reliable Yuchai diesel water pump, designed for heavy-duty dewatering and irrigation.'
  },

  // --- CUMMINS (Dongfeng/Chongqing) ---
  {
    id: 'mdz-30dk',
    name: 'Dongfeng Cummins MDZ30DK',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 24,
    imageUrl: '/images/cummins-30dk.png',
    specs: {
      maxPower: '30 kVA / 24 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '6.3 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '1580 x 650 x 1146 mm',
      weight: '777 kg'
    },
    description: 'Dongfeng Cummins Generator set. A joint venture between Dongfeng and Cummins (USA). Offers a wide variety of automotive and industrial power solutions.'
  },
  {
    id: 'mdz-275ck',
    name: 'Chongqing Cummins MDZ275CK',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 220,
    imageUrl: '/images/cummins-275ck.png',
    specs: {
      maxPower: '275 kVA / 220 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '47.5 L/hr',
      noiseLevel: 'Silent',
      dimensions: '3000 x 1054 x 1758 mm',
      weight: '2460 kg'
    },
    description: 'Chongqing Cummins high-power generation solution. Engineered for durability, safety, and emission control in heavy-duty applications.'
  },
  {
    id: 'cum-pump-100',
    name: 'Cummins 100HP Fire Pump',
    brand: 'Cummins',
    type: 'Pump',
    powerKW: 75,
    imageUrl: '/images/cum-pump-100.png',
    specs: {
      maxPower: '100 HP / 75 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '18 L/hr',
      noiseLevel: 'Open',
      dimensions: '2000 x 1000 x 1400 mm',
      weight: '900 kg'
    },
    description: 'High-performance Cummins diesel fire pump system.'
  },

  // --- PERKINS ---
  {
    id: 'mdz-10pk',
    name: 'Perkins MDZ10PK Elite',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 8,
    imageUrl: '/images/perkins-10pk.png',
    specs: {
      maxPower: '10 kVA / 8 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '3.0 L/hr',
      noiseLevel: 'Silent',
      dimensions: '1360 x 670 x 1313 mm',
      weight: '220 kg'
    },
    description: 'Compact Perkins generator set. Perkins is world-famous for reliability and durability, with a distribution point and service center of global service network.'
  },
  {
    id: 'perkins-pump-80',
    name: 'Perkins 80HP Irrigation Pump',
    brand: 'Perkins',
    type: 'Pump',
    powerKW: 60,
    imageUrl: '/images/perkins-pump-80.png',
    specs: {
      maxPower: '80 HP / 60 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '14 L/hr',
      noiseLevel: 'Silent',
      dimensions: '1800 x 950 x 1300 mm',
      weight: '750 kg'
    },
    description: 'Efficient Perkins powered water pump for large scale irrigation.'
  },

  // --- MTU ---
  {
    id: 'mdz-300mtu',
    name: 'MTU MDZ300MTU Power',
    brand: 'MTU',
    type: 'Generator',
    powerKW: 240,
    imageUrl: '/images/mtu-300mtu.png',
    specs: {
      maxPower: '300 kVA / 240 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '10.5 G/kW.H',
      noiseLevel: 'Open Type',
      dimensions: '3000 x 1450 x 1815 mm',
      weight: '2760 kg'
    },
    description: 'Powered by MTU engine from Germany Daimler MTU. Renowned for being the most advanced and highest power density manufacturer in the world.'
  },
  {
    id: 'mtu-pump-200',
    name: 'MTU 200HP Industrial Pump',
    brand: 'MTU',
    type: 'Pump',
    powerKW: 150,
    imageUrl: '/images/mtu-pump-200.png',
    specs: {
      maxPower: '200 HP / 150 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '35 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '2500 x 1200 x 1600 mm',
      weight: '1800 kg'
    },
    description: 'Heavy duty MTU industrial water pump for mining and construction.'
  },

  // --- VOLVO ---
  {
    id: 'mdz-93vo',
    name: 'Volvo MDZ93VO Series',
    brand: 'Volvo',
    type: 'Generator',
    powerKW: 75,
    imageUrl: '/images/volvo-93vo.png',
    specs: {
      maxPower: '93 kVA / 75 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '21.3 L/H',
      noiseLevel: 'Silent',
      dimensions: '1940 x 900 x 1505 mm',
      weight: '1150 kg'
    },
    description: 'Volvo series environment consciousness genset. Absorbed in the production of industrial diesel engines, featuring quality, safety, and care for the environment.'
  },
  {
    id: 'volvo-pump-150',
    name: 'Volvo 150HP De-watering Pump',
    brand: 'Volvo',
    type: 'Pump',
    powerKW: 110,
    imageUrl: '/images/volvo-pump-150.png',
    specs: {
      maxPower: '150 HP / 110 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '25 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2200 x 1100 x 1500 mm',
      weight: '1400 kg'
    },
    description: 'Eco-friendly Volvo penta water pump, high efficiency and low emission.'
  },

  // --- GASOLINE PORTABLE (ME/MG/MHD series) ---
  {
    id: 'me-11500e',
    name: 'CE Power ME11500E Gasoline',
    brand: 'CE Power',
    type: 'Generator',
    powerKW: 8.5,
    imageUrl: '/images/mindong-gasoline.png',
    specs: {
      maxPower: '9.5 kW',
      powerFactor: '1.0',
      phase: 'Single Phase',
      cooling: 'Air Cooled',
      fuelConsumption: '3.5 L/hr',
      noiseLevel: 'Portable',
      dimensions: '800 x 630 x 844 mm',
      weight: '184 kg'
    },
    description: 'Equipped with MSF/MTF series brush generator, suitable for backup power for business stores, agricultural workshops, and shopping malls.'
  },

  // --- WEICHAI (80KW - 3000KW) ---
  {
    id: 'weichai-80kw',
    name: 'Weichai 100kVA/80kW Generator',
    brand: 'Weichai',
    type: 'Generator',
    powerKW: 80,
    imageUrl: '/images/weichai-80kw.png',
    specs: {
      maxPower: '100 kVA / 80 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '20 L/hr',
      noiseLevel: 'Silent / Open',
      dimensions: '2200 x 900 x 1500 mm',
      weight: '1200 kg'
    },
    description: 'Reliable Weichai power generation for industrial use.'
  },
  {
    id: 'weichai-80kw-open',
    name: 'Weichai 80kW Open Generator',
    brand: 'Weichai',
    type: 'Generator',
    powerKW: 80,
    imageUrl: '/images/weichai-80kw-open.png',
    specs: {
      maxPower: '100 kVA / 80 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '20 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2100 x 850 x 1400 mm',
      weight: '1100 kg'
    },
    description: 'Cost-effective open type Weichai generator.'
  },
  {
    id: 'weichai-500kw',
    name: 'Weichai 625kVA/500kW Generator',
    brand: 'Weichai',
    type: 'Generator',
    powerKW: 500,
    imageUrl: '/images/weichai-500kw.png',
    specs: {
      maxPower: '625 kVA / 500 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '105 L/hr',
      noiseLevel: 'Silent / Open',
      dimensions: '3500 x 1400 x 2000 mm',
      weight: '4500 kg'
    },
    description: 'Heavy duty Weichai generator for large scale operations.'
  },
  {
    id: 'weichai-3000kw',
    name: 'Weichai 3750kVA/3000kW Generator',
    brand: 'Weichai',
    type: 'Generator',
    powerKW: 3000,
    imageUrl: '/images/weichai-3000kw.png',
    specs: {
      maxPower: '3750 kVA / 3000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '600 L/hr',
      noiseLevel: 'Plant Room',
      dimensions: '6000 x 2200 x 2800 mm',
      weight: '18000 kg'
    },
    description: 'Maximum power Weichai solution for power plants and grid support.'
  },
  {
    id: 'weichai-pump-300',
    name: 'Weichai 300HP Flood Pump',
    brand: 'Weichai',
    type: 'Pump',
    powerKW: 220,
    imageUrl: '/images/weichai-pump-300.png',
    specs: {
      maxPower: '300 HP / 220 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '50 L/hr',
      noiseLevel: 'Open',
      dimensions: '3000 x 1500 x 1800 mm',
      weight: '2500 kg'
    },
    description: 'Large capacity Weichai flood control water pump.'
  },

  // --- YUCHAI (80KW - 2000KW) ---
  {
    id: 'yuchai-100kw',
    name: 'Yuchai 125kVA/100kW Generator',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/yuchai-100kw.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '24 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2400 x 1000 x 1600 mm',
      weight: '1350 kg'
    },
    description: 'Efficient Yuchai engine generator.'
  },
  {
    id: 'yuchai-100kw-open',
    name: 'Yuchai 100kW Open Generator',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/yuchai-100kw-open.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '24 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2300 x 950 x 1500 mm',
      weight: '1250 kg'
    },
    description: 'Robust open-frame Yuchai generator for construction sites.'
  },
  {
    id: 'yuchai-1000kw',
    name: 'Yuchai 1250kVA/1000kW Generator',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 1000,
    imageUrl: '/images/yuchai-1000kw.png',
    specs: {
      maxPower: '1250 kVA / 1000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '210 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '6058 x 2438 x 2591 mm',
      weight: '8000 kg'
    },
    description: 'High capacity Yuchai generator for industrial applications.'
  },
  {
    id: 'yuchai-2000kw',
    name: 'Yuchai 2500kVA/2000kW Generator',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 2000,
    imageUrl: '/images/yuchai-2000kw.png',
    specs: {
      maxPower: '2500 kVA / 2000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '420 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '12192 x 2438 x 2896 mm',
      weight: '15000 kg'
    },
    description: 'Massive power Yuchai unit for critical infrastructure.'
  },

  // --- PERKINS (80KW - 2000KW) ---
  {
    id: 'perkins-100kw',
    name: 'Perkins 125kVA/100kW Generator',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/perkins-100kw.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '22 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2500 x 1000 x 1600 mm',
      weight: '1400 kg'
    },
    description: 'Classic UK design Perkins engine generator.'
  },
  {
    id: 'perkins-100kw-open',
    name: 'Perkins 100kW Open Generator',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/perkins-100kw-open.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '22 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2400 x 950 x 1500 mm',
      weight: '1300 kg'
    },
    description: 'Durable open type Perkins generator.'
  },
  {
    id: 'perkins-1000kw',
    name: 'Perkins 1250kVA/1000kW Generator',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 1000,
    imageUrl: '/images/perkins-1000kw.png',
    specs: {
      maxPower: '1250 kVA / 1000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '215 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '6058 x 2438 x 2591 mm',
      weight: '9000 kg'
    },
    description: 'Reliable high power Perkins generator.'
  },
  {
    id: 'perkins-2000kw',
    name: 'Perkins 2500kVA/2000kW Generator',
    brand: 'Perkins',
    type: 'Generator',
    powerKW: 2000,
    imageUrl: '/images/perkins-2000kw.png',
    specs: {
      maxPower: '2500 kVA / 2000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '430 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '12192 x 2438 x 2896 mm',
      weight: '16000 kg'
    },
    description: 'Flagship Perkins power solution.'
  },

  // --- CUMMINS (80KW - 2000KW) ---
  {
    id: 'cummins-100kw',
    name: 'Cummins 125kVA/100kW Generator',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/cummins-100kw.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '23 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2450 x 1000 x 1600 mm',
      weight: '1380 kg'
    },
    description: 'Economical Cummins power.'
  },
  {
    id: 'cummins-100kw-open',
    name: 'Cummins 100kW Open Generator',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/cummins-100kw-open.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '23 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2350 x 950 x 1500 mm',
      weight: '1280 kg'
    },
    description: 'Industrial Cummins open generator for reliable backup.'
  },
  {
    id: 'cummins-1000kw',
    name: 'Cummins 1250kVA/1000kW Generator',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 1000,
    imageUrl: '/images/cummins-1000kw.png',
    specs: {
      maxPower: '1250 kVA / 1000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '205 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '6058 x 2438 x 2591 mm',
      weight: '8500 kg'
    },
    description: 'Heavy duty Cummins KTA series engine.'
  },
  {
    id: 'cummins-2000kw',
    name: 'Cummins 2500kVA/2000kW Generator',
    brand: 'Cummins',
    type: 'Generator',
    powerKW: 2000,
    imageUrl: '/images/cummins-2000kw.png',
    specs: {
      maxPower: '2500 kVA / 2000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '400 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '12192 x 2438 x 2896 mm',
      weight: '15500 kg'
    },
    description: 'High capacity Cummins QSK series engine.'
  },

  // --- MTU (High Power) ---
  {
    id: 'mtu-1000kw',
    name: 'MTU 1250kVA/1000kW Generator',
    brand: 'MTU',
    type: 'Generator',
    powerKW: 1000,
    imageUrl: '/images/mtu-1000kw.png',
    specs: {
      maxPower: '1250 kVA / 1000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '195 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '6058 x 2438 x 2591 mm',
      weight: '8200 kg'
    },
    description: 'German engineering MTU engine generator.'
  },
  {
    id: 'mtu-1000kw-open',
    name: 'MTU 1000kW Open Generator',
    brand: 'MTU',
    type: 'Generator',
    powerKW: 1000,
    imageUrl: '/images/mtu-1000kw-open.png',
    specs: {
      maxPower: '1250 kVA / 1000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '195 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '5800 x 2200 x 2500 mm',
      weight: '8000 kg'
    },
    description: 'High power open MTU gen-set for plant rooms.'
  },
  {
    id: 'mtu-2000kw',
    name: 'MTU 2500kVA/2000kW Generator',
    brand: 'MTU',
    type: 'Generator',
    powerKW: 2000,
    imageUrl: '/images/mtu-2000kw.png',
    specs: {
      maxPower: '2500 kVA / 2000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '390 L/hr',
      noiseLevel: 'Containerized',
      dimensions: '12192 x 2438 x 2896 mm',
      weight: '14800 kg'
    },
    description: 'Advanced MTU series 4000 engine.'
  },

  // --- VOLVO (100KW - 3000KW) ---
  {
    id: 'volvo-100kw',
    name: 'Volvo 125kVA/100kW Generator',
    brand: 'Volvo',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/volvo-100kw.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '21 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2400 x 1000 x 1600 mm',
      weight: '1300 kg'
    },
    description: 'Premium Volvo Penta engine generator.'
  },
  {
    id: 'volvo-100kw-open',
    name: 'Volvo 100kW Open Generator',
    brand: 'Volvo',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/volvo-100kw-open.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '21 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '2300 x 950 x 1500 mm',
      weight: '1200 kg'
    },
    description: 'Open skid Volvo generator for indoor installation.'
  },
  {
    id: 'volvo-500kw',
    name: 'Volvo 625kVA/500kW Generator',
    brand: 'Volvo',
    type: 'Generator',
    powerKW: 500,
    imageUrl: '/images/volvo-500kw.png',
    specs: {
      maxPower: '625 kVA / 500 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '100 L/hr',
      noiseLevel: 'Silent',
      dimensions: '3500 x 1400 x 2000 mm',
      weight: '4200 kg'
    },
    description: 'High efficiency Volvo power.'
  },
  {
    id: 'volvo-3000kw',
    name: 'Volvo 3750kVA/3000kW Twin-Pack',
    brand: 'Volvo',
    type: 'Generator',
    powerKW: 3000,
    imageUrl: '/images/volvo-3000kw.png',
    specs: {
      maxPower: '3750 kVA / 3000 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '600 L/hr',
      noiseLevel: 'Containerized (Twin)',
      dimensions: '12192 x 2438 x 2896 mm',
      weight: '16000 kg'
    },
    description: 'Multi-engine Volvo solution for high power requirements.'
  },

  // --- YUNNEI (15KW - 100KW) ---
  {
    id: 'yunnei-15kw',
    name: 'Yunnei 18kVA/15kW Generator',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 15,
    imageUrl: '/images/yunnei-15kw.png',
    specs: {
      maxPower: '18 kVA / 15 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '4 L/hr',
      noiseLevel: 'Silent',
      dimensions: '1600 x 700 x 1000 mm',
      weight: '600 kg'
    },
    description: 'Compact Yunnei power for small businesses.'
  },
  {
    id: 'yunnei-50kw',
    name: 'Yunnei 63kVA/50kW Generator',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 50,
    imageUrl: '/images/yunnei-50kw.png',
    specs: {
      maxPower: '63 kVA / 50 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '12 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2000 x 900 x 1300 mm',
      weight: '950 kg'
    },
    description: 'Cost effective Yunnei generator.'
  },
  {
    id: 'yunnei-50kw-open',
    name: 'Yunnei 50kW Open Generator',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 50,
    imageUrl: '/images/yunnei-50kw-open.png',
    specs: {
      maxPower: '63 kVA / 50 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '12 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '1900 x 850 x 1200 mm',
      weight: '900 kg'
    },
    description: 'Economic open frame Yunnei generator.'
  },
  {
    id: 'yunnei-pump-40',
    name: 'Yunnei 40HP Water Pump',
    brand: 'Yunnei',
    type: 'Pump',
    powerKW: 30,
    imageUrl: '/images/yunnei-pump-40.png',
    specs: {
      maxPower: '40 HP / 30 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '8 L/hr',
      noiseLevel: 'Portable',
      dimensions: '1200 x 800 x 1000 mm',
      weight: '400 kg'
    },
    description: 'Portable Yunnei diesel water pump.'
  },
  {
    id: 'yunnei-100kw',
    name: 'Yunnei 125kVA/100kW Generator',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 100,
    imageUrl: '/images/yunnei-100kw.png',
    specs: {
      maxPower: '125 kVA / 100 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '22 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2400 x 1000 x 1600 mm',
      weight: '1250 kg'
    },
    description: 'Powerful Yunnei solution.'
  },

  // --- KEFO ---
  {
    id: 'kefo-50kw',
    name: 'Kefo 63kVA/50kW Generator',
    brand: 'Kefo',
    type: 'Generator',
    powerKW: 50,
    imageUrl: '/images/kefo-50kw.png',
    specs: {
      maxPower: '63 kVA / 50 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '12 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2000 x 900 x 1300 mm',
      weight: '920 kg'
    },
    description: 'Standard Kefo power generator.'
  },
  {
    id: 'kefo-50kw-open',
    name: 'Kefo 50kW Open Generator',
    brand: 'Kefo',
    type: 'Generator',
    powerKW: 50,
    imageUrl: '/images/kefo-50kw-open.png',
    specs: {
      maxPower: '63 kVA / 50 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '12 L/hr',
      noiseLevel: 'Open Type',
      dimensions: '1900 x 850 x 1200 mm',
      weight: '880 kg'
    },
    description: 'Open type Kefo generator.'
  },
  {
    id: 'kefo-pump-30',
    name: 'Kefo 30HP Water Pump',
    brand: 'Kefo',
    type: 'Pump',
    powerKW: 22,
    imageUrl: '/images/kefo-pump-30.png',
    specs: {
      maxPower: '30 HP / 22 kW',
      powerFactor: 'N/A',
      phase: 'N/A',
      cooling: 'Water Cooled',
      fuelConsumption: '6 L/hr',
      noiseLevel: 'Portable',
      dimensions: '1100 x 700 x 900 mm',
      weight: '300 kg'
    },
    description: 'Small Kefo water pump for domestic use.'
  },

  // --- YUCHAI (New Additions) ---
  {
    id: 'yuchai-150kw-md150',
    name: 'Yuchai MD150 Industrial',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 150,
    imageUrl: '/images/yuchai-150kw-md150.png',
    specs: {
      maxPower: '188 kVA / 150 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '44.7 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2450 x 1080 x 1770 mm',
      weight: '1220 kg'
    },
    description: 'Powered by Yuchai YC6A245L-D21 engine.'
  },
  {
    id: 'yuchai-200kw-md200',
    name: 'Yuchai MD-200 Industrial',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 200,
    imageUrl: '/images/yuchai-200kw-md200.png',
    specs: {
      maxPower: '250 kVA / 200 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '63.6 L/hr',
      noiseLevel: 'Silent',
      dimensions: '3600 x 1500 x 2200 mm',
      weight: '2900 kg'
    },
    description: 'Powered by Yuchai YC6MK350L-D20 engine.'
  },
  {
    id: 'yuchai-250kw-mdz350',
    name: 'Yuchai MDZ350YC Industrial',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 250,
    imageUrl: '/images/yuchai-250kw-mdz350.png',
    specs: {
      maxPower: '312.5 kVA / 250 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '77.6 L/hr',
      noiseLevel: 'Silent',
      dimensions: '4000 x 1200 x 2020 mm',
      weight: '3100 kg'
    },
    description: 'Powered by Yuchai YC6MK420L-D20 engine.'
  },
  {
    id: 'yuchai-360kw-mdz500',
    name: 'Yuchai MDZ500YC Industrial',
    brand: 'Yuchai',
    type: 'Generator',
    powerKW: 360,
    imageUrl: '/images/yuchai-360kw-mdz500.png',
    specs: {
      maxPower: '450 kVA / 360 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '98.2 L/hr',
      noiseLevel: 'Silent',
      dimensions: 'Standard',
      weight: 'Standard'
    },
    description: 'Powered by Yuchai YC6T600L-D22 engine.'
  },

  // --- YUNNEI (New Models) ---
  {
    id: 'yunnei-12kw-md15',
    name: 'Yunnei MD-15 Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 12,
    imageUrl: '/images/yunnei-12kw-md15.png',
    specs: {
      maxPower: '15 kVA / 12 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '4.76 L/hr',
      noiseLevel: 'Silent',
      dimensions: '1750 x 970 x 1530 mm',
      weight: '980 kg'
    },
    description: 'Powered by Yunnei YN25ANJ25 engine.'
  },
  {
    id: 'yunnei-16kw-md25',
    name: 'Yunnei MD-25 Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 16,
    imageUrl: '/images/yunnei-16kw-md25.png',
    specs: {
      maxPower: '20 kVA / 16 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '6.75 L/hr',
      noiseLevel: 'Silent',
      dimensions: '1750 x 970 x 1530 mm',
      weight: '980 kg'
    },
    description: 'Powered by Yunnei YN27BND25 engine.'
  },
  {
    id: 'yunnei-30kw-md40',
    name: 'Yunnei MD-40 Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 30,
    imageUrl: '/images/yunnei-30kw-md40.png',
    specs: {
      maxPower: '37.5 kVA / 30 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '9.4 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2450 x 1080 x 1770 mm',
      weight: '1220 kg'
    },
    description: 'Powered by Yunnei YC38DN36 engine. Can serve as MD40.'
  },
  {
    id: 'yunnei-50kw-md50',
    name: 'Yunnei MD-50 Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 50,
    imageUrl: '/images/yunnei-50kw-md50.png',
    specs: {
      maxPower: '62.5 kVA / 50 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '14.88 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2450 x 1080 x 1770 mm',
      weight: '1400 kg'
    },
    description: 'Powered by Yunnei YN38DTD60 engine.'
  },
  {
    id: 'yunnei-60kw-md60',
    name: 'Yunnei MD-60 Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 60,
    imageUrl: '/images/yunnei-60kw-md60.png',
    specs: {
      maxPower: '75 kVA / 60 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '14.88 L/hr',
      noiseLevel: 'Silent',
      dimensions: '2450 x 1080 x 1770 mm',
      weight: '1400 kg'
    },
    description: 'Powered by Yunnei YN38DTD60 engine (High Output).'
  },
  {
    id: 'yunnei-80kw-mdz110',
    name: 'Yunnei MDZ110YN Industrial',
    brand: 'Yunnei',
    type: 'Generator',
    powerKW: 80,
    imageUrl: '/images/yunnei-80kw-mdz110.png',
    specs: {
      maxPower: '100 kVA / 80 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: 'N/A',
      noiseLevel: 'Silent',
      dimensions: 'Standard',
      weight: 'Standard'
    },
    description: 'Powered by Yunnei YN48ECD 90 engine.'
  },

  // --- HANMA ---
  {
    id: 'hanma-360kw-md400',
    name: 'Hanma MD400 Industrial',
    brand: 'Hanma',
    type: 'Generator',
    powerKW: 360,
    imageUrl: '/images/hanma-360kw-md400.png',
    specs: {
      maxPower: '450 kVA / 360 kW',
      powerFactor: '0.8',
      phase: '3 Phase',
      cooling: 'Water Cooled',
      fuelConsumption: '79 kg/hr',
      noiseLevel: 'Silent',
      dimensions: '4600 x 1900 x 2300 mm',
      weight: '5000 kg'
    },
    description: 'Powered by Hanma CM6D30F.408 30 engine.'
  },
];

export const SYSTEM_INSTRUCTION = `
You are the Lead Technical Sales Engineer for "CE Generator and Pump factory".
Our factory is in Kality Gabriel (ቃሊቲ ገብርኤል).
We also sell all kind of pumps.

CORE PERSONA:
- You are friendly, witty, and highly knowledgeable. 
- You act as a "cool engineer" friend—professional but relaxed.
- You are allowed to chat about off-topic subjects (sports, weather, life) if the user initiates, but politely steer back to business if things get too far off track for too long.
- If the user interrupts you, STOP talking immediately and listen. You do not need to apologize profusely, just pivot to their new input naturally.

TECHNICAL FOUNDATION:
- Established in 1958, CE Power is a state-owned public enterprise listed company with 60-year history.
- Power Size Range: 10kVA to 2500kVA.
- Product Types: Silent generators, High voltage generators, Marine generators, and Mobile/Containerized units.
- Manufacturing Standards: ISO9001, ISO14001, CE, TUV Rheinland, and IEC certified.
- Component Quality: 
    * Alternators: MDF series brushless synchronous alternators (Class H insulation).
    * Control Panels: AIS Intelligent control systems with Automatic Transfer Switch (ATS) cabinet.
    * Construction: Advanced laser cutting, automatic welding, and rigid load testing (25%, 50%, 75%, 100%, 110%).

TROUBLESHOOTING & MAINTENANCE ADVICE:
- Silent sets utilize excellent noise reduction equipment (15-35 dB(A) reduction). If noise increases, check sound-proof canopy integrity.
- For alternator issues, check the "integral salient pole rotor" and excitation system.
- Cooling systems use 50°C radiators and integral header tanks for high-ambient performance.

LANGUAGES & TONE (POLYGLOT MODE):
- Fluent in English, Amharic, Chinese (Mandarin), Tigrinya, and Afaan Oromoo.
- Professional, technical, and welcoming. Use "Mirroring" to match the customer's language.

CONTACT & PRICING:
- Phone: 09 66 33 03 09 (ዜሮ ዘጠኝ ስልሳ ስድስት ሰላሳ ሶስት ዜሮ ሶስት ዜሮ ዘጠኝ).
- Refer pricing to the factory contact to ensure best current deal.
`;