// Import crop images
import riceImg from '@/assets/crops/rice.jpg';
import soybeanImg from '@/assets/crops/soybean.jpg';
import cottonImg from '@/assets/crops/cotton.jpg';
import wheatImg from '@/assets/crops/wheat.jpg';
import chickpeaImg from '@/assets/crops/chickpea.jpg';
import onionImg from '@/assets/crops/onion.jpg';
import groundnutImg from '@/assets/crops/groundnut.jpg';
import watermelonImg from '@/assets/crops/watermelon.jpg';
import sugarcaneImg from '@/assets/crops/sugarcane.jpg';
import tomatoImg from '@/assets/crops/tomato.jpg';
import grapesImg from '@/assets/crops/grapes.jpg';
import pomegranateImg from '@/assets/crops/pomegranate.jpg';

export type CropSeason = 'all' | 'kharif' | 'rabi' | 'summer';

export interface Fertilizer {
  name: string;
  timing: string;
  quantity: string;
  method: string;
}

export interface Pest {
  name: string;
  symptoms: string;
  control: string;
  prevention: string;
}

export interface IrrigationStage {
  stage: string;
  frequency: string;
  method: string;
  tips: string;
}

export interface PriceData {
  month: string;
  price: number;
  year: number;
}

export interface Crop {
  id: string;
  name: { en: string; mr: string; hi: string };
  season: 'kharif' | 'rabi' | 'summer';
  sowingPeriod: string;
  harvestPeriod: string;
  soilType: string;
  waterNeeds: 'Low' | 'Medium' | 'High';
  yield: string;
  image: string;
  description: { en: string; mr: string; hi: string };
  fertilizers: Fertilizer[];
  pests: Pest[];
  irrigation: IrrigationStage[];
  tips: string[];
  priceHistory: PriceData[];
  priceUnit: string;
}

export const cropsData: Crop[] = [
  {
    id: '1',
    name: { en: 'Rice (Paddy)', mr: 'भात (धान)', hi: 'चावल (धान)' },
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'October - November',
    soilType: 'Clay Loam, Alluvial',
    waterNeeds: 'High',
    yield: '35-45 quintals/hectare',
    image: riceImg,
    description: {
      en: 'Rice is the staple food crop of Maharashtra and India. It thrives in warm, humid conditions with adequate water supply. Proper field preparation and water management are crucial for high yields.',
      mr: 'भात हे महाराष्ट्र आणि भारतातील मुख्य अन्नधान्य पीक आहे. उबदार, दमट परिस्थितीत आणि पुरेशा पाण्याच्या पुरवठ्यासह ते वाढते.',
      hi: 'चावल महाराष्ट्र और भारत की मुख्य खाद्य फसल है। यह पर्याप्त पानी की आपूर्ति के साथ गर्म, नम परिस्थितियों में पनपता है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Basal + 2 splits', quantity: '100-120 kg/hectare', method: 'Broadcast and incorporate' },
      { name: 'DAP', timing: 'At transplanting', quantity: '50 kg/hectare', method: 'Apply in rows' },
      { name: 'MOP', timing: 'Basal application', quantity: '40 kg/hectare', method: 'Broadcast before transplanting' },
      { name: 'Zinc Sulphate', timing: '10-15 days after transplanting', quantity: '25 kg/hectare', method: 'Foliar spray or broadcast' }
    ],
    pests: [
      { name: 'Stem Borer', symptoms: 'Dead hearts, white ears', control: 'Carbofuran 3G granules', prevention: 'Use pheromone traps, timely planting' },
      { name: 'Brown Plant Hopper', symptoms: 'Hopper burn, yellowing', control: 'Imidacloprid spray', prevention: 'Avoid excess nitrogen, maintain water level' },
      { name: 'Blast', symptoms: 'Diamond-shaped lesions on leaves', control: 'Tricyclazole fungicide', prevention: 'Use resistant varieties, balanced fertilization' }
    ],
    irrigation: [
      { stage: 'Nursery', frequency: 'Daily', method: 'Flood irrigation', tips: 'Maintain 2-3 cm water level' },
      { stage: 'Transplanting', frequency: 'Continuous', method: 'Flooded', tips: 'Keep 5 cm standing water' },
      { stage: 'Tillering', frequency: 'Every 3-4 days', method: 'Alternate wetting/drying', tips: 'Critical stage for water' },
      { stage: 'Flowering', frequency: 'Continuous', method: 'Flooded', tips: 'Never stress during flowering' }
    ],
    tips: ['Use certified seeds from reliable sources', 'Maintain proper plant spacing of 20x15 cm', 'Apply weedicide 3-5 days after transplanting', 'Harvest when 80% grains are golden'],
    priceHistory: [
      { month: 'Jan', price: 2100, year: 2024 },
      { month: 'Feb', price: 2150, year: 2024 },
      { month: 'Mar', price: 2200, year: 2024 },
      { month: 'Apr', price: 2180, year: 2024 },
      { month: 'May', price: 2250, year: 2024 },
      { month: 'Jun', price: 2300, year: 2024 },
      { month: 'Jul', price: 2280, year: 2024 },
      { month: 'Aug', price: 2350, year: 2024 },
      { month: 'Sep', price: 2400, year: 2024 },
      { month: 'Oct', price: 2450, year: 2024 },
      { month: 'Nov', price: 2380, year: 2024 },
      { month: 'Dec', price: 2420, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '2',
    name: { en: 'Soybean', mr: 'सोयाबीन', hi: 'सोयाबीन' },
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'September - October',
    soilType: 'Black, Sandy Loam',
    waterNeeds: 'Medium',
    yield: '20-25 quintals/hectare',
    image: soybeanImg,
    description: {
      en: 'Soybean is a major oilseed crop in Maharashtra, particularly in Vidarbha region. It is rich in protein and oil, making it valuable for both food and industrial use.',
      mr: 'सोयाबीन हे महाराष्ट्रातील, विशेषतः विदर्भ प्रदेशातील प्रमुख तेलबिया पीक आहे. प्रथिने आणि तेलाने समृद्ध असल्याने ते अन्न आणि औद्योगिक वापरासाठी मौल्यवान आहे.',
      hi: 'सोयाबीन महाराष्ट्र में, विशेष रूप से विदर्भ क्षेत्र में एक प्रमुख तिलहनी फसल है। यह प्रोटीन और तेल से भरपूर है।'
    },
    fertilizers: [
      { name: 'DAP', timing: 'At sowing', quantity: '100 kg/hectare', method: 'Row application' },
      { name: 'SSP', timing: 'Basal', quantity: '250 kg/hectare', method: 'Broadcast and incorporate' },
      { name: 'Rhizobium Culture', timing: 'Seed treatment', quantity: '250g/10kg seed', method: 'Seed coating before sowing' }
    ],
    pests: [
      { name: 'Girdle Beetle', symptoms: 'Girdling of stem, plant breaks', control: 'Quinalphos spray', prevention: 'Deep plowing, crop rotation' },
      { name: 'Semilooper', symptoms: 'Leaves eaten, defoliation', control: 'Profenophos spray', prevention: 'Use light traps' },
      { name: 'Yellow Mosaic Virus', symptoms: 'Yellow patches on leaves', control: 'Remove infected plants', prevention: 'Use resistant varieties, control whitefly' }
    ],
    irrigation: [
      { stage: 'Germination', frequency: 'As needed', method: 'Sprinkler/Furrow', tips: 'Ensure soil moisture for germination' },
      { stage: 'Flowering', frequency: 'Every 10-12 days', method: 'Furrow irrigation', tips: 'Critical stage - avoid water stress' },
      { stage: 'Pod filling', frequency: 'Every 12-15 days', method: 'Furrow irrigation', tips: 'Moderate irrigation needed' }
    ],
    tips: ['Treat seeds with Thiram before sowing', 'Maintain row spacing of 45 cm', 'Intercropping with pigeon pea is beneficial', 'Harvest when leaves turn yellow and fall'],
    priceHistory: [
      { month: 'Jan', price: 4500, year: 2024 },
      { month: 'Feb', price: 4650, year: 2024 },
      { month: 'Mar', price: 4800, year: 2024 },
      { month: 'Apr', price: 4750, year: 2024 },
      { month: 'May', price: 4600, year: 2024 },
      { month: 'Jun', price: 4400, year: 2024 },
      { month: 'Jul', price: 4300, year: 2024 },
      { month: 'Aug', price: 4550, year: 2024 },
      { month: 'Sep', price: 4700, year: 2024 },
      { month: 'Oct', price: 4900, year: 2024 },
      { month: 'Nov', price: 5100, year: 2024 },
      { month: 'Dec', price: 5250, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '3',
    name: { en: 'Cotton', mr: 'कापूस', hi: 'कपास' },
    season: 'kharif',
    sowingPeriod: 'May - June',
    harvestPeriod: 'October - December',
    soilType: 'Black Cotton Soil',
    waterNeeds: 'Medium',
    yield: '15-20 quintals/hectare',
    image: cottonImg,
    description: {
      en: 'Cotton is the most important fiber crop in Maharashtra. The state is one of the largest cotton producers in India. Black soil (regur) is ideal for cotton cultivation.',
      mr: 'कापूस हे महाराष्ट्रातील सर्वात महत्त्वाचे तंतू पीक आहे. राज्य भारतातील सर्वात मोठ्या कापूस उत्पादकांपैकी एक आहे.',
      hi: 'कपास महाराष्ट्र में सबसे महत्वपूर्ण रेशेदार फसल है। राज्य भारत में सबसे बड़े कपास उत्पादकों में से एक है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split doses at 30, 60, 90 days', quantity: '150 kg/hectare', method: 'Side dressing' },
      { name: 'DAP', timing: 'At sowing', quantity: '125 kg/hectare', method: 'Row application' },
      { name: 'MOP', timing: 'Basal + flowering', quantity: '50 kg/hectare', method: 'Broadcast/side dress' },
      { name: 'Magnesium Sulphate', timing: 'At flowering', quantity: '25 kg/hectare', method: 'Foliar spray' }
    ],
    pests: [
      { name: 'Bollworm', symptoms: 'Holes in bolls, damaged lint', control: 'Spinosad/Emamectin spray', prevention: 'Use Bt cotton, pheromone traps' },
      { name: 'Whitefly', symptoms: 'Honeydew on leaves, sooty mold', control: 'Neem oil/Acetamiprid', prevention: 'Yellow sticky traps, avoid excess nitrogen' },
      { name: 'Pink Bollworm', symptoms: 'Rosetted flowers, damaged bolls', control: 'Pheromone mass trapping', prevention: 'Destroy crop residue, timely sowing' }
    ],
    irrigation: [
      { stage: 'Vegetative', frequency: 'Every 15-20 days', method: 'Furrow/Drip', tips: 'Light irrigation for root development' },
      { stage: 'Flowering', frequency: 'Every 10-12 days', method: 'Furrow/Drip', tips: 'Critical stage - maintain moisture' },
      { stage: 'Boll development', frequency: 'Every 12-15 days', method: 'Drip preferred', tips: 'Reduce frequency near harvest' }
    ],
    tips: ['Use high-density planting system for better yields', 'Remove and destroy affected plant parts regularly', 'Apply growth regulators for compact plant architecture', 'Pick cotton at regular intervals when bolls burst'],
    priceHistory: [
      { month: 'Jan', price: 6500, year: 2024 },
      { month: 'Feb', price: 6800, year: 2024 },
      { month: 'Mar', price: 7100, year: 2024 },
      { month: 'Apr', price: 7300, year: 2024 },
      { month: 'May', price: 7000, year: 2024 },
      { month: 'Jun', price: 6700, year: 2024 },
      { month: 'Jul', price: 6400, year: 2024 },
      { month: 'Aug', price: 6600, year: 2024 },
      { month: 'Sep', price: 6900, year: 2024 },
      { month: 'Oct', price: 7200, year: 2024 },
      { month: 'Nov', price: 7500, year: 2024 },
      { month: 'Dec', price: 7350, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '4',
    name: { en: 'Wheat', mr: 'गहू', hi: 'गेहूं' },
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'March - April',
    soilType: 'Loamy, Clay Loam',
    waterNeeds: 'Medium',
    yield: '40-50 quintals/hectare',
    image: wheatImg,
    description: {
      en: 'Wheat is an important rabi cereal crop grown in the cooler months. It requires well-drained fertile soil and moderate temperatures for optimal growth.',
      mr: 'गहू हे थंड महिन्यांत घेतले जाणारे महत्त्वाचे रब्बी तृणधान्य पीक आहे. उत्तम निचरा होणारी सुपीक जमीन आणि मध्यम तापमान आवश्यक आहे.',
      hi: 'गेहूं ठंडे महीनों में उगाई जाने वाली एक महत्वपूर्ण रबी अनाज की फसल है। इसके लिए अच्छी जल निकासी वाली उपजाऊ मिट्टी आवश्यक है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Basal + 2 splits', quantity: '130 kg/hectare', method: 'Broadcast before irrigation' },
      { name: 'DAP', timing: 'At sowing', quantity: '130 kg/hectare', method: 'Drill application' },
      { name: 'MOP', timing: 'Basal', quantity: '40 kg/hectare', method: 'Broadcast and incorporate' }
    ],
    pests: [
      { name: 'Aphids', symptoms: 'Curling leaves, honeydew', control: 'Dimethoate spray', prevention: 'Early sowing, balanced nutrition' },
      { name: 'Rust', symptoms: 'Orange-brown pustules', control: 'Propiconazole fungicide', prevention: 'Use resistant varieties' },
      { name: 'Termites', symptoms: 'Wilting, dead plants in patches', control: 'Chlorpyrifos drench', prevention: 'Treat seed with Thiamethoxam' }
    ],
    irrigation: [
      { stage: 'Crown root initiation', frequency: '20-25 DAS', method: 'Flood', tips: 'First critical irrigation' },
      { stage: 'Tillering', frequency: '40-45 DAS', method: 'Flood', tips: 'Essential for tiller development' },
      { stage: 'Flowering', frequency: '60-65 DAS', method: 'Flood', tips: 'Do not skip this irrigation' },
      { stage: 'Grain filling', frequency: '80-85 DAS', method: 'Light irrigation', tips: 'Avoid water logging' }
    ],
    tips: ['Sow within optimum date for best yields', 'Use seed rate of 100-125 kg/hectare', 'Apply first irrigation 20-25 days after sowing', 'Harvest when grain moisture is 12-14%'],
    priceHistory: [
      { month: 'Jan', price: 2200, year: 2024 },
      { month: 'Feb', price: 2280, year: 2024 },
      { month: 'Mar', price: 2350, year: 2024 },
      { month: 'Apr', price: 2400, year: 2024 },
      { month: 'May', price: 2380, year: 2024 },
      { month: 'Jun', price: 2300, year: 2024 },
      { month: 'Jul', price: 2250, year: 2024 },
      { month: 'Aug', price: 2320, year: 2024 },
      { month: 'Sep', price: 2380, year: 2024 },
      { month: 'Oct', price: 2450, year: 2024 },
      { month: 'Nov', price: 2500, year: 2024 },
      { month: 'Dec', price: 2550, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '5',
    name: { en: 'Gram (Chickpea)', mr: 'हरभरा', hi: 'चना' },
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'February - March',
    soilType: 'Sandy Loam, Clay',
    waterNeeds: 'Low',
    yield: '15-20 quintals/hectare',
    image: chickpeaImg,
    description: {
      en: 'Chickpea is a major pulse crop that requires minimal irrigation. It fixes atmospheric nitrogen and improves soil fertility. Widely used for dal and flour.',
      mr: 'हरभरा हे कमी पाण्यात येणारे प्रमुख कडधान्य पीक आहे. ते वातावरणातील नत्र स्थिर करते आणि जमिनीची सुपीकता वाढवते.',
      hi: 'चना एक प्रमुख दलहनी फसल है जिसे न्यूनतम सिंचाई की आवश्यकता होती है। यह वायुमंडलीय नाइट्रोजन को स्थिर करता है।'
    },
    fertilizers: [
      { name: 'DAP', timing: 'At sowing', quantity: '100 kg/hectare', method: 'Drill application' },
      { name: 'Rhizobium Culture', timing: 'Seed treatment', quantity: '250g/10kg seed', method: 'Seed coating' },
      { name: 'Sulphur', timing: 'Basal', quantity: '20 kg/hectare', method: 'Broadcast' }
    ],
    pests: [
      { name: 'Pod Borer', symptoms: 'Holes in pods, larvae inside', control: 'NPV + Neem spray', prevention: 'Bird perches, HDPE traps' },
      { name: 'Wilt', symptoms: 'Yellowing, drooping, death', control: 'No cure - remove plants', prevention: 'Use resistant varieties, seed treatment' },
      { name: 'Collar Rot', symptoms: 'Stem girdling at base', control: 'Carbendazim drench', prevention: 'Avoid waterlogging, seed treatment' }
    ],
    irrigation: [
      { stage: 'Pre-sowing', frequency: 'Once', method: 'Flood', tips: 'Ensure good soil moisture for germination' },
      { stage: 'Branching', frequency: 'If needed', method: 'Light irrigation', tips: 'Usually rainfed crop' },
      { stage: 'Pod formation', frequency: 'Critical', method: 'Sprinkler preferred', tips: 'One irrigation if dry spell' }
    ],
    tips: ['Gram is mostly grown rainfed', 'Avoid excessive watering - causes disease', 'Use wilt-resistant varieties in endemic areas', 'Harvest when 80% pods turn brown'],
    priceHistory: [
      { month: 'Jan', price: 5200, year: 2024 },
      { month: 'Feb', price: 5400, year: 2024 },
      { month: 'Mar', price: 5600, year: 2024 },
      { month: 'Apr', price: 5800, year: 2024 },
      { month: 'May', price: 5700, year: 2024 },
      { month: 'Jun', price: 5500, year: 2024 },
      { month: 'Jul', price: 5300, year: 2024 },
      { month: 'Aug', price: 5400, year: 2024 },
      { month: 'Sep', price: 5550, year: 2024 },
      { month: 'Oct', price: 5700, year: 2024 },
      { month: 'Nov', price: 5850, year: 2024 },
      { month: 'Dec', price: 5950, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '6',
    name: { en: 'Onion', mr: 'कांदा', hi: 'प्याज' },
    season: 'rabi',
    sowingPeriod: 'November - December',
    harvestPeriod: 'April - May',
    soilType: 'Sandy Loam',
    waterNeeds: 'Medium',
    yield: '250-300 quintals/hectare',
    image: onionImg,
    description: {
      en: 'Onion is a major commercial vegetable crop in Maharashtra, particularly famous in Nashik region. It is grown for its bulb which is used as vegetable and spice.',
      mr: 'कांदा हे महाराष्ट्रातील, विशेषतः नाशिक प्रदेशातील प्रमुख व्यापारी भाजीपाला पीक आहे. त्याचा बल्ब भाजी आणि मसाल्यात वापरला जातो.',
      hi: 'प्याज महाराष्ट्र में, विशेष रूप से नासिक क्षेत्र में एक प्रमुख व्यावसायिक सब्जी की फसल है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split at 30 and 45 DAT', quantity: '110 kg/hectare', method: 'Side dressing' },
      { name: 'SSP', timing: 'Basal', quantity: '375 kg/hectare', method: 'Broadcast and incorporate' },
      { name: 'MOP', timing: 'Basal', quantity: '65 kg/hectare', method: 'Broadcast' },
      { name: 'Sulphur', timing: 'Basal', quantity: '30 kg/hectare', method: 'Mix with FYM' }
    ],
    pests: [
      { name: 'Thrips', symptoms: 'Silvery streaks, curling leaves', control: 'Fipronil/Spinosad spray', prevention: 'Overhead irrigation, blue sticky traps' },
      { name: 'Purple Blotch', symptoms: 'Purple spots with yellow halo', control: 'Mancozeb + Carbendazim', prevention: 'Crop rotation, remove debris' },
      { name: 'Stemphylium Blight', symptoms: 'Small yellow spots expanding', control: 'Iprodione spray', prevention: 'Use healthy seeds, avoid overhead irrigation' }
    ],
    irrigation: [
      { stage: 'After transplanting', frequency: 'Every 2-3 days', method: 'Drip/Furrow', tips: 'Light irrigation for establishment' },
      { stage: 'Vegetative', frequency: 'Every 7-8 days', method: 'Drip preferred', tips: 'Maintain uniform moisture' },
      { stage: 'Bulb development', frequency: 'Every 10 days', method: 'Drip', tips: 'Critical for bulb size' },
      { stage: 'Before harvest', frequency: 'Stop 10-15 days before', method: '-', tips: 'Improves storage quality' }
    ],
    tips: ['Use raised beds for better drainage', 'Maintain 15x10 cm spacing for large bulbs', 'Stop irrigation 15 days before harvest', 'Cure bulbs properly before storage'],
    priceHistory: [
      { month: 'Jan', price: 1800, year: 2024 },
      { month: 'Feb', price: 2200, year: 2024 },
      { month: 'Mar', price: 2800, year: 2024 },
      { month: 'Apr', price: 3200, year: 2024 },
      { month: 'May', price: 2500, year: 2024 },
      { month: 'Jun', price: 2100, year: 2024 },
      { month: 'Jul', price: 2400, year: 2024 },
      { month: 'Aug', price: 3000, year: 2024 },
      { month: 'Sep', price: 3500, year: 2024 },
      { month: 'Oct', price: 2800, year: 2024 },
      { month: 'Nov', price: 2200, year: 2024 },
      { month: 'Dec', price: 1900, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '7',
    name: { en: 'Groundnut', mr: 'भुईमूग', hi: 'मूंगफली' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'April - May',
    soilType: 'Sandy Loam, Red',
    waterNeeds: 'Medium',
    yield: '20-25 quintals/hectare',
    image: groundnutImg,
    description: {
      en: 'Groundnut is an important oilseed and cash crop. Summer groundnut gives higher yields due to adequate sunlight and controlled irrigation.',
      mr: 'भुईमूग हे महत्त्वाचे तेलबिया आणि नगदी पीक आहे. उन्हाळी भुईमूगाला पुरेसा सूर्यप्रकाश आणि नियंत्रित सिंचनामुळे जास्त उत्पादन मिळते.',
      hi: 'मूंगफली एक महत्वपूर्ण तिलहनी और नकदी फसल है। ग्रीष्मकालीन मूंगफली अधिक उपज देती है।'
    },
    fertilizers: [
      { name: 'DAP', timing: 'At sowing', quantity: '125 kg/hectare', method: 'Row application' },
      { name: 'Gypsum', timing: 'At flowering', quantity: '200 kg/hectare', method: 'Around plant base' },
      { name: 'SSP', timing: 'Basal', quantity: '250 kg/hectare', method: 'Broadcast' }
    ],
    pests: [
      { name: 'Leaf Miner', symptoms: 'Mines/tunnels in leaves', control: 'Profenophos spray', prevention: 'Destroy crop residue' },
      { name: 'Tikka Disease', symptoms: 'Circular dark spots', control: 'Carbendazim spray', prevention: 'Use resistant varieties' },
      { name: 'White Grub', symptoms: 'Wilting, root damage', control: 'Phorate granules', prevention: 'Deep summer plowing' }
    ],
    irrigation: [
      { stage: 'Sowing', frequency: 'Immediately after', method: 'Furrow', tips: 'Light irrigation' },
      { stage: 'Flowering', frequency: 'Every 8-10 days', method: 'Furrow/Sprinkler', tips: 'Critical stage' },
      { stage: 'Pegging', frequency: 'Every 10-12 days', method: 'Light irrigation', tips: 'Keep soil loose' },
      { stage: 'Pod development', frequency: 'Every 10 days', method: 'Reduce gradually', tips: 'Stop 15 days before harvest' }
    ],
    tips: ['Apply gypsum at flowering for better pod filling', 'Earthing up promotes peg penetration', 'Maintain loose soil for easy pegging', 'Harvest when 75% pods are mature'],
    priceHistory: [
      { month: 'Jan', price: 5800, year: 2024 },
      { month: 'Feb', price: 5950, year: 2024 },
      { month: 'Mar', price: 6100, year: 2024 },
      { month: 'Apr', price: 6300, year: 2024 },
      { month: 'May', price: 6500, year: 2024 },
      { month: 'Jun', price: 6200, year: 2024 },
      { month: 'Jul', price: 5900, year: 2024 },
      { month: 'Aug', price: 5750, year: 2024 },
      { month: 'Sep', price: 5850, year: 2024 },
      { month: 'Oct', price: 6000, year: 2024 },
      { month: 'Nov', price: 6150, year: 2024 },
      { month: 'Dec', price: 6250, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '8',
    name: { en: 'Watermelon', mr: 'कलिंगड', hi: 'तरबूज' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'April - May',
    soilType: 'Sandy, Well-drained',
    waterNeeds: 'High',
    yield: '300-400 quintals/hectare',
    image: watermelonImg,
    description: {
      en: 'Watermelon is a popular summer fruit crop grown on riverbeds and sandy soils. It requires warm temperatures and plenty of water for sweet, juicy fruits.',
      mr: 'कलिंगड हे नदीपात्र आणि वाळूमिश्रित जमिनीत घेतले जाणारे लोकप्रिय उन्हाळी फळ पीक आहे. गोड, रसाळ फळांसाठी उबदार तापमान आवश्यक आहे.',
      hi: 'तरबूज नदी के किनारों और रेतीली मिट्टी पर उगाई जाने वाली एक लोकप्रिय ग्रीष्मकालीन फल की फसल है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split at 20, 40, 60 DAS', quantity: '200 kg/hectare', method: 'Fertigation/Side dress' },
      { name: 'DAP', timing: 'Basal', quantity: '150 kg/hectare', method: 'Pit application' },
      { name: 'MOP', timing: 'Basal + fruit development', quantity: '100 kg/hectare', method: 'Fertigation preferred' }
    ],
    pests: [
      { name: 'Fruit Fly', symptoms: 'Maggots in fruit, rotting', control: 'Protein bait spray', prevention: 'Pheromone traps, field sanitation' },
      { name: 'Aphids', symptoms: 'Curled leaves, honeydew', control: 'Imidacloprid spray', prevention: 'Remove weeds' },
      { name: 'Powdery Mildew', symptoms: 'White powder on leaves', control: 'Sulphur/Hexaconazole', prevention: 'Avoid excess nitrogen' }
    ],
    irrigation: [
      { stage: 'Germination', frequency: 'Every 2-3 days', method: 'Drip/Furrow', tips: 'Keep soil moist' },
      { stage: 'Vine growth', frequency: 'Every 3-4 days', method: 'Drip preferred', tips: 'Increase frequency in hot weather' },
      { stage: 'Fruit development', frequency: 'Every 2-3 days', method: 'Drip', tips: 'Consistent water for even fruit' },
      { stage: 'Ripening', frequency: 'Reduce frequency', method: 'Light irrigation', tips: 'Less water increases sweetness' }
    ],
    tips: ['Use black plastic mulch for weed control', 'Train vines in one direction', 'Place straw under fruits to prevent soil contact', 'Thump test - ripe fruits sound hollow'],
    priceHistory: [
      { month: 'Jan', price: 800, year: 2024 },
      { month: 'Feb', price: 1000, year: 2024 },
      { month: 'Mar', price: 1400, year: 2024 },
      { month: 'Apr', price: 1800, year: 2024 },
      { month: 'May', price: 1200, year: 2024 },
      { month: 'Jun', price: 900, year: 2024 },
      { month: 'Jul', price: 700, year: 2024 },
      { month: 'Aug', price: 750, year: 2024 },
      { month: 'Sep', price: 800, year: 2024 },
      { month: 'Oct', price: 850, year: 2024 },
      { month: 'Nov', price: 900, year: 2024 },
      { month: 'Dec', price: 950, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '9',
    name: { en: 'Sugarcane', mr: 'ऊस', hi: 'गन्ना' },
    season: 'kharif',
    sowingPeriod: 'February - March',
    harvestPeriod: 'December - March',
    soilType: 'Deep Loam, Clay Loam',
    waterNeeds: 'High',
    yield: '800-1000 quintals/hectare',
    image: sugarcaneImg,
    description: {
      en: 'Sugarcane is a major cash crop in Maharashtra with significant contribution to the sugar industry. It requires well-drained, fertile soil and consistent irrigation throughout its long growing season.',
      mr: 'ऊस हे महाराष्ट्रातील प्रमुख नगदी पीक असून साखर उद्योगात त्याचे महत्त्वाचे योगदान आहे. दीर्घ वाढीच्या काळात सतत सिंचन आवश्यक आहे.',
      hi: 'गन्ना महाराष्ट्र में एक प्रमुख नकदी फसल है जिसका चीनी उद्योग में महत्वपूर्ण योगदान है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split doses at 30, 60, 90, 120 days', quantity: '350 kg/hectare', method: 'Side dressing with earthing' },
      { name: 'SSP', timing: 'Basal', quantity: '500 kg/hectare', method: 'Furrow application' },
      { name: 'MOP', timing: 'Basal + at earthing', quantity: '120 kg/hectare', method: 'Side dressing' },
      { name: 'Press Mud', timing: 'Before planting', quantity: '10 tonnes/hectare', method: 'Broadcast and incorporate' }
    ],
    pests: [
      { name: 'Early Shoot Borer', symptoms: 'Dead hearts in young crop', control: 'Carbofuran granules', prevention: 'Timely planting, detrashing' },
      { name: 'Top Borer', symptoms: 'Bunchy top, dead hearts', control: 'Release Trichogramma', prevention: 'Remove water shoots' },
      { name: 'Red Rot', symptoms: 'Red internal color, alcohol smell', control: 'No cure - remove canes', prevention: 'Use disease-free setts, resistant varieties' },
      { name: 'Woolly Aphid', symptoms: 'White woolly masses on leaves', control: 'Release Dipha aphidivora', prevention: 'Avoid water stress' }
    ],
    irrigation: [
      { stage: 'Germination', frequency: 'Every 7-8 days', method: 'Furrow', tips: 'Light irrigation' },
      { stage: 'Tillering', frequency: 'Every 10-12 days', method: 'Furrow/Drip', tips: 'Critical for tiller production' },
      { stage: 'Grand growth', frequency: 'Every 7-10 days', method: 'Furrow', tips: 'Maximum water requirement' },
      { stage: 'Maturity', frequency: 'Every 15-20 days', method: 'Reduce irrigation', tips: 'Withhold water before harvest' }
    ],
    tips: ['Use sett treatment with fungicide before planting', 'Maintain recommended spacing for air circulation', 'Practice trash mulching for moisture retention', 'Harvest at peak maturity for maximum sugar recovery'],
    priceHistory: [
      { month: 'Jan', price: 3100, year: 2024 },
      { month: 'Feb', price: 3200, year: 2024 },
      { month: 'Mar', price: 3300, year: 2024 },
      { month: 'Apr', price: 3250, year: 2024 },
      { month: 'May', price: 3150, year: 2024 },
      { month: 'Jun', price: 3050, year: 2024 },
      { month: 'Jul', price: 2950, year: 2024 },
      { month: 'Aug', price: 3000, year: 2024 },
      { month: 'Sep', price: 3100, year: 2024 },
      { month: 'Oct', price: 3200, year: 2024 },
      { month: 'Nov', price: 3350, year: 2024 },
      { month: 'Dec', price: 3400, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '10',
    name: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    season: 'rabi',
    sowingPeriod: 'September - October',
    harvestPeriod: 'January - March',
    soilType: 'Sandy Loam, Red',
    waterNeeds: 'Medium',
    yield: '250-350 quintals/hectare',
    image: tomatoImg,
    description: {
      en: 'Tomato is one of the most important vegetable crops grown throughout the year. Rabi season gives the best quality fruits with higher shelf life.',
      mr: 'टोमॅटो हे वर्षभर घेतले जाणारे सर्वात महत्त्वाचे भाजीपाला पीक आहे. रब्बी हंगामात उत्तम दर्जाची फळे मिळतात.',
      hi: 'टमाटर पूरे वर्ष उगाई जाने वाली सबसे महत्वपूर्ण सब्जी की फसलों में से एक है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split at 30, 45, 60 DAT', quantity: '200 kg/hectare', method: 'Fertigation/Side dress' },
      { name: 'DAP', timing: 'Basal', quantity: '150 kg/hectare', method: 'Pit application' },
      { name: 'MOP', timing: 'Basal + fruiting', quantity: '100 kg/hectare', method: 'Fertigation' },
      { name: 'Calcium Nitrate', timing: 'At fruiting', quantity: '25 kg/hectare', method: 'Foliar spray' }
    ],
    pests: [
      { name: 'Fruit Borer', symptoms: 'Holes in fruits, larvae inside', control: 'Spinosad/NPV spray', prevention: 'Pheromone traps, neem spray' },
      { name: 'Leaf Curl Virus', symptoms: 'Upward curling, stunting', control: 'Control whitefly vector', prevention: 'Use resistant varieties, reflective mulch' },
      { name: 'Early Blight', symptoms: 'Concentric ring spots', control: 'Mancozeb + Carbendazim', prevention: 'Crop rotation, stake plants' },
      { name: 'Late Blight', symptoms: 'Water-soaked lesions, rapid death', control: 'Metalaxyl + Mancozeb', prevention: 'Avoid overhead irrigation' }
    ],
    irrigation: [
      { stage: 'After transplanting', frequency: 'Daily for 7 days', method: 'Drip/Furrow', tips: 'Light irrigation for establishment' },
      { stage: 'Vegetative', frequency: 'Every 3-4 days', method: 'Drip preferred', tips: 'Maintain uniform moisture' },
      { stage: 'Flowering', frequency: 'Every 2-3 days', method: 'Drip', tips: 'Avoid water stress' },
      { stage: 'Fruiting', frequency: 'Every 2-3 days', method: 'Drip with fertigation', tips: 'Consistent moisture prevents cracking' }
    ],
    tips: ['Use staking or trellis system for support', 'Prune suckers for determinate varieties', 'Apply calcium to prevent blossom end rot', 'Harvest at color-break stage for distant markets'],
    priceHistory: [
      { month: 'Jan', price: 2500, year: 2024 },
      { month: 'Feb', price: 3000, year: 2024 },
      { month: 'Mar', price: 2200, year: 2024 },
      { month: 'Apr', price: 1800, year: 2024 },
      { month: 'May', price: 2000, year: 2024 },
      { month: 'Jun', price: 2500, year: 2024 },
      { month: 'Jul', price: 3200, year: 2024 },
      { month: 'Aug', price: 3800, year: 2024 },
      { month: 'Sep', price: 3500, year: 2024 },
      { month: 'Oct', price: 2800, year: 2024 },
      { month: 'Nov', price: 2200, year: 2024 },
      { month: 'Dec', price: 2400, year: 2024 },
    ],
    priceUnit: 'per quintal',
  },
  {
    id: '11',
    name: { en: 'Grapes', mr: 'द्राक्षे', hi: 'अंगूर' },
    season: 'summer',
    sowingPeriod: 'January - February',
    harvestPeriod: 'March - May',
    soilType: 'Well-drained Sandy Loam',
    waterNeeds: 'Medium',
    yield: '200-300 quintals/hectare',
    image: grapesImg,
    description: {
      en: 'Grapes are a major export fruit crop of Maharashtra, particularly from Nashik and Sangli regions. They require specific training systems and careful management for quality production.',
      mr: 'द्राक्षे हे महाराष्ट्राचे प्रमुख निर्यात फळ पीक आहे, विशेषतः नाशिक आणि सांगली प्रदेशातून. दर्जेदार उत्पादनासाठी विशिष्ट प्रशिक्षण पद्धती आवश्यक आहे.',
      hi: 'अंगूर महाराष्ट्र की एक प्रमुख निर्यात फल फसल है, विशेष रूप से नासिक और सांगली क्षेत्रों से।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split doses post-pruning', quantity: '500 kg/hectare', method: 'Fertigation' },
      { name: '19:19:19', timing: 'Fruit development', quantity: '300 kg/hectare', method: 'Fertigation' },
      { name: 'Potassium Sulphate', timing: 'Berry softening', quantity: '200 kg/hectare', method: 'Fertigation' },
      { name: 'Micronutrients', timing: 'Multiple sprays', quantity: 'As needed', method: 'Foliar application' }
    ],
    pests: [
      { name: 'Powdery Mildew', symptoms: 'White powder on leaves/berries', control: 'Sulphur/Hexaconazole', prevention: 'Avoid excess nitrogen, good canopy management' },
      { name: 'Downy Mildew', symptoms: 'Oil spots, white growth', control: 'Metalaxyl + Mancozeb', prevention: 'Proper drainage, prophylactic sprays' },
      { name: 'Anthracnose', symptoms: 'Bird-eye spots on berries', control: 'Carbendazim + Mancozeb', prevention: 'Remove infected parts, dormant spray' },
      { name: 'Thrips', symptoms: 'Scarring on berries', control: 'Spinosad spray', prevention: 'Blue sticky traps' }
    ],
    irrigation: [
      { stage: 'Post-pruning', frequency: 'Every 2-3 days', method: 'Drip only', tips: 'Increase frequency for bud break' },
      { stage: 'Flowering', frequency: 'Every 2 days', method: 'Drip', tips: 'Maintain soil moisture' },
      { stage: 'Berry development', frequency: 'Daily', method: 'Drip with mulch', tips: 'Critical for size' },
      { stage: 'Ripening', frequency: 'Reduce by 30%', method: 'Drip', tips: 'Improves sugar content' }
    ],
    tips: ['Follow proper pruning schedule for your region', 'Use GA3 and CPPU for berry sizing', 'Maintain proper canopy management', 'Pre-cooling is essential for export quality'],
    priceHistory: [
      { month: 'Jan', price: 4500, year: 2024 },
      { month: 'Feb', price: 5000, year: 2024 },
      { month: 'Mar', price: 6500, year: 2024 },
      { month: 'Apr', price: 7500, year: 2024 },
      { month: 'May', price: 5500, year: 2024 },
      { month: 'Jun', price: 4000, year: 2024 },
      { month: 'Jul', price: 3500, year: 2024 },
      { month: 'Aug', price: 3800, year: 2024 },
      { month: 'Sep', price: 4200, year: 2024 },
      { month: 'Oct', price: 4800, year: 2024 },
      { month: 'Nov', price: 5200, year: 2024 },
      { month: 'Dec', price: 4800, year: 2024 },
    ],
    priceUnit: 'per kg',
  },
  {
    id: '12',
    name: { en: 'Pomegranate', mr: 'डाळिंब', hi: 'अनार' },
    season: 'summer',
    sowingPeriod: 'June - July',
    harvestPeriod: 'January - February',
    soilType: 'Sandy Loam, Black',
    waterNeeds: 'Low',
    yield: '100-150 quintals/hectare',
    image: pomegranateImg,
    description: {
      en: 'Pomegranate is a drought-tolerant fruit crop that thrives in semi-arid conditions. Maharashtra is the largest producer in India, with Solapur being the hub.',
      mr: 'डाळिंब हे दुष्काळ सहन करणारे फळ पीक आहे जे अर्ध-शुष्क परिस्थितीत वाढते. महाराष्ट्र भारतातील सर्वात मोठा उत्पादक आहे, सोलापूर हे केंद्र आहे.',
      hi: 'अनार एक सूखा-सहिष्णु फल फसल है जो अर्ध-शुष्क परिस्थितियों में पनपती है। महाराष्ट्र भारत में सबसे बड़ा उत्पादक है।'
    },
    fertilizers: [
      { name: 'Urea', timing: 'Split doses with irrigation', quantity: '625 g/plant/year', method: 'Ring application' },
      { name: 'SSP', timing: 'At bahar treatment', quantity: '500 g/plant/year', method: 'Ring application' },
      { name: 'MOP', timing: 'Fruit development', quantity: '250 g/plant/year', method: 'Fertigation' },
      { name: 'FYM', timing: 'Annually', quantity: '25 kg/plant', method: 'Basin application' }
    ],
    pests: [
      { name: 'Bacterial Blight', symptoms: 'Oily spots, cracking', control: 'Streptocycline + Copper', prevention: 'Prune infected parts, avoid wounds' },
      { name: 'Fruit Borer', symptoms: 'Holes in fruit, rotting', control: 'Spinosad spray', prevention: 'Bag fruits, pheromone traps' },
      { name: 'Wilt', symptoms: 'Yellowing, drooping, death', control: 'No cure - uproot', prevention: 'Use disease-free saplings, improve drainage' },
      { name: 'Mites', symptoms: 'Russeting on fruits', control: 'Wettable sulphur', prevention: 'Avoid water stress' }
    ],
    irrigation: [
      { stage: 'Rest period', frequency: 'Withhold completely', method: '-', tips: 'Stress for bahar induction' },
      { stage: 'After bahar', frequency: 'Every 7-8 days', method: 'Drip', tips: 'Resume gradually' },
      { stage: 'Flowering', frequency: 'Every 4-5 days', method: 'Drip', tips: 'Maintain moisture' },
      { stage: 'Fruit development', frequency: 'Every 3-4 days', method: 'Drip', tips: 'Consistent for fruit size' }
    ],
    tips: ['Follow Mrig/Hasta bahar based on water availability', 'Fruit bagging prevents sunburn and pest damage', 'Proper stress management for quality bahar', 'Grade fruits for better market price'],
    priceHistory: [
      { month: 'Jan', price: 8500, year: 2024 },
      { month: 'Feb', price: 9200, year: 2024 },
      { month: 'Mar', price: 8800, year: 2024 },
      { month: 'Apr', price: 7500, year: 2024 },
      { month: 'May', price: 6800, year: 2024 },
      { month: 'Jun', price: 6200, year: 2024 },
      { month: 'Jul', price: 5800, year: 2024 },
      { month: 'Aug', price: 6500, year: 2024 },
      { month: 'Sep', price: 7200, year: 2024 },
      { month: 'Oct', price: 8000, year: 2024 },
      { month: 'Nov', price: 8800, year: 2024 },
      { month: 'Dec', price: 9000, year: 2024 },
    ],
    priceUnit: 'per quintal',
  }
];
