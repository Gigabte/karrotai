'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Search, 
  ArrowRight, 
  Sparkles,
  Candy,
  FlaskConical,
  Dumbbell,
  Milk,
  Sandwich,
  GlassWater,
  Cookie,
  Droplets,
  Wheat,
  Leaf
} from 'lucide-react'

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  "Popular Snacks & Candy": Candy,
  "Additives & Preservatives": FlaskConical,
  "Protein & Supplements": Dumbbell,
  "Dairy & Alternatives": Milk,
  "Processed Foods": Sandwich,
  "Beverages": GlassWater,
  "Sweeteners & Sugar": Cookie,
  "Oils & Fats": Droplets,
  "Gluten & Allergens": Wheat,
  "Organic & Natural": Leaf,
}

// FAQ Data - 100 Questions organized by category
const faqCategories = [
  {
    name: "Popular Snacks & Candy",
    faqs: [
      {
        q: "Is Snickers good for health?",
        a: "Snickers contains high sugar (20g+), saturated fat, and processed ingredients. While it provides quick energy from nuts and nougat, regular consumption may contribute to weight gain, blood sugar spikes, and dental issues. Karrot AI can analyze Snickers and suggest healthier alternatives with similar taste profiles.",
      },
      {
        q: "Are Oreos bad for you?",
        a: "Oreos contain high fructose corn syrup, palm oil, and artificial flavors with minimal nutritional value. Three cookies have about 14g of sugar. They're best consumed occasionally. Use Karrot AI to find healthier cookie alternatives that satisfy your sweet tooth.",
      },
      {
        q: "Is Nutella healthy?",
        a: "Despite containing hazelnuts, Nutella is primarily sugar (21g per serving) and palm oil. It has limited nutritional benefits compared to natural nut butters. Karrot AI can help you find healthier chocolate hazelnut spreads with less sugar.",
      },
      {
        q: "Are Doritos unhealthy?",
        a: "Doritos contain MSG, artificial colors (Red 40, Yellow 6), and high sodium (210mg per serving). Regular consumption may contribute to inflammation and weight gain. Scan with Karrot AI to discover healthier chip alternatives.",
      },
      {
        q: "Is Coca-Cola bad for health?",
        a: "A can of Coca-Cola contains 39g of sugar, exceeding daily recommended limits. Regular consumption is linked to obesity, type 2 diabetes, and tooth decay. Karrot AI can suggest healthier beverage alternatives.",
      },
      {
        q: "Are Skittles harmful?",
        a: "Skittles contain titanium dioxide (banned in EU), artificial colors, and high sugar. They offer no nutritional value. Karrot AI can identify these ingredients and suggest natural candy alternatives.",
      },
      {
        q: "Is Red Bull bad for you?",
        a: "Red Bull contains 27g of sugar, 80mg caffeine, and artificial ingredients. Excessive consumption can cause heart palpitations, anxiety, and sleep issues. Use Karrot AI to find natural energy alternatives.",
      },
      {
        q: "Are Pringles healthy?",
        a: "Pringles are highly processed with added MSG, artificial flavors, and high sodium. They're made from dehydrated potatoes, not whole potatoes. Karrot AI can help find less processed snack options.",
      },
      {
        q: "Is Mountain Dew bad for health?",
        a: "Mountain Dew contains 46g of sugar, brominated vegetable oil (BVO), and Yellow 5. It's one of the most sugary sodas available. Scan with Karrot AI to understand all ingredients and find alternatives.",
      },
      {
        q: "Are Cheetos unhealthy?",
        a: "Cheetos contain MSG, artificial colors (Yellow 6), and high sodium. The 'cheese' flavor comes from processed ingredients. Karrot AI can identify healthier cheese snack alternatives.",
      },
    ]
  },
  {
    name: "Additives & Preservatives",
    faqs: [
      {
        q: "Is MSG bad for you?",
        a: "MSG (monosodium glutamate) is generally recognized as safe by FDA, but some people experience sensitivity symptoms like headaches. It's found in many processed foods. Karrot AI detects MSG in products and tracks your sensitivity.",
      },
      {
        q: "Is aspartame safe?",
        a: "Aspartame is FDA-approved but controversial. WHO classified it as 'possibly carcinogenic' in 2023. It's 200x sweeter than sugar. Use Karrot AI to identify products containing aspartame and find alternatives.",
      },
      {
        q: "Is high fructose corn syrup bad?",
        a: "HFCS is linked to obesity, fatty liver disease, and metabolic syndrome when consumed excessively. It's cheaper than sugar, making it common in processed foods. Karrot AI flags HFCS in products.",
      },
      {
        q: "Are artificial colors safe?",
        a: "Some artificial colors (Red 40, Yellow 5, Yellow 6) are linked to hyperactivity in children. They're banned or require warnings in EU. Karrot AI identifies all artificial colors in products.",
      },
      {
        q: "Is sodium nitrite dangerous?",
        a: "Sodium nitrite, used in processed meats, can form carcinogenic compounds when heated. WHO classifies processed meats as Group 1 carcinogens. Karrot AI warns about nitrite-containing products.",
      },
      {
        q: "Is BHA and BHT safe?",
        a: "BHA and BHT are preservatives classified as possible carcinogens. They're banned in some countries but allowed in the US. Karrot AI identifies these preservatives in your food.",
      },
      {
        q: "Is carrageenan harmful?",
        a: "Carrageenan, derived from seaweed, may cause digestive inflammation in some people. It's common in dairy alternatives. Karrot AI can help you find carrageenan-free products.",
      },
      {
        q: "Are sulfites dangerous?",
        a: "Sulfites can trigger asthma attacks and allergic reactions in sensitive individuals. They're common in wine, dried fruits, and processed foods. Karrot AI detects sulfites for sensitive users.",
      },
      {
        q: "Is potassium bromate banned?",
        a: "Potassium bromate is banned in EU, UK, Canada, and China due to cancer links, but still allowed in US bread products. Karrot AI identifies bromate in baked goods.",
      },
      {
        q: "Is titanium dioxide safe in food?",
        a: "Titanium dioxide (E171) was banned in EU in 2022 over genotoxicity concerns. It's still used in US foods like Skittles. Karrot AI flags products containing titanium dioxide.",
      },
    ]
  },
  {
    name: "Protein & Supplements",
    faqs: [
      {
        q: "Is whey protein safe?",
        a: "Whey protein is generally safe for most people. However, some products contain heavy metals, artificial sweeteners, or fillers. Karrot AI analyzes protein supplements for quality and purity.",
      },
      {
        q: "Is ESP pre-workout banned?",
        a: "Some ESP pre-workout versions contained DMAA, which was banned by FDA. Current formulas vary by country. Use Karrot AI to scan pre-workouts for banned or questionable ingredients.",
      },
      {
        q: "Is creatine safe to take?",
        a: "Creatine is one of the most researched supplements and is considered safe for healthy adults. Quality varies between brands. Karrot AI can help verify supplement quality.",
      },
      {
        q: "Are BCAAs worth taking?",
        a: "BCAAs may help with muscle recovery, but whole protein sources are often more effective. Many BCAA products contain artificial additives. Scan with Karrot AI before buying.",
      },
      {
        q: "Is plant protein as good as whey?",
        a: "Plant proteins can match whey when properly combined for complete amino acid profiles. Quality varies significantly. Karrot AI compares protein quality across products.",
      },
      {
        q: "Are fat burners safe?",
        a: "Many fat burners contain stimulants, banned substances, or ineffective ingredients. Some have caused liver damage. Always scan supplements with Karrot AI before use.",
      },
      {
        q: "Is collagen supplement effective?",
        a: "Collagen supplements may support skin and joint health, but absorption varies. Many contain additives. Karrot AI helps identify clean collagen products.",
      },
      {
        q: "Are testosterone boosters safe?",
        a: "Most OTC testosterone boosters lack scientific evidence and may contain undisclosed ingredients. Karrot AI can help identify what's actually in these products.",
      },
      {
        q: "Is mass gainer healthy?",
        a: "Mass gainers often contain excessive sugar, maltodextrin, and artificial ingredients. They can cause digestive issues. Use Karrot AI to find cleaner mass gainers.",
      },
      {
        q: "Are amino acid supplements necessary?",
        a: "Most people get sufficient amino acids from diet. Supplements may help athletes or those with dietary restrictions. Karrot AI analyzes amino acid supplement quality.",
      },
    ]
  },
  {
    name: "Dairy & Alternatives",
    faqs: [
      {
        q: "Is oat milk healthy?",
        a: "Oat milk is nutritious but often contains added oils, gums, and sugars. Some brands have more additives than others. Karrot AI compares oat milk brands for cleanest ingredients.",
      },
      {
        q: "Is almond milk good for you?",
        a: "Almond milk is low calorie but often contains carrageenan, gums, and minimal almonds (2%). Karrot AI helps find brands with higher almond content and fewer additives.",
      },
      {
        q: "Is Greek yogurt healthy?",
        a: "Plain Greek yogurt is protein-rich and contains probiotics. Flavored varieties often have high sugar. Karrot AI identifies added sugars in yogurt products.",
      },
      {
        q: "Is cheese bad for health?",
        a: "Cheese provides calcium and protein but is high in saturated fat and sodium. Processed cheese contains additional additives. Karrot AI distinguishes natural from processed cheese.",
      },
      {
        q: "Is lactose-free milk healthier?",
        a: "Lactose-free milk has the same nutrition as regular milk, just with lactase enzyme added. It's not inherently healthier unless you're lactose intolerant. Scan with Karrot AI.",
      },
      {
        q: "Is coconut milk healthy?",
        a: "Coconut milk is high in saturated fat but may have health benefits. Canned versions often contain guar gum and sulfites. Karrot AI identifies additives in coconut milk.",
      },
      {
        q: "Are probiotic drinks effective?",
        a: "Probiotic drinks can support gut health, but many contain high sugar that may negate benefits. Karrot AI helps find low-sugar probiotic options.",
      },
      {
        q: "Is soy milk safe to drink?",
        a: "Soy milk is nutritious and safe for most people. Concerns about estrogen are largely unfounded. Watch for added sugars and carrageenan with Karrot AI.",
      },
      {
        q: "Is butter healthier than margarine?",
        a: "Modern science suggests butter may be healthier than margarine with trans fats. However, some margarines are now trans-fat free. Karrot AI compares fat content.",
      },
      {
        q: "Is kefir good for gut health?",
        a: "Kefir contains more probiotic strains than yogurt and may benefit gut health. Watch for added sugars in flavored versions. Scan with Karrot AI.",
      },
    ]
  },
  {
    name: "Processed Foods",
    faqs: [
      {
        q: "Is bacon a carcinogen?",
        a: "WHO classified processed meats including bacon as Group 1 carcinogens due to nitrite content. Regular consumption increases colorectal cancer risk. Karrot AI identifies processed meat ingredients.",
      },
      {
        q: "Are hot dogs bad for you?",
        a: "Hot dogs contain sodium nitrite, high sodium, and processed meat linked to cancer. Some brands are cleaner than others. Use Karrot AI to find better options.",
      },
      {
        q: "Is instant ramen unhealthy?",
        a: "Instant ramen is high in sodium (over 1000mg), contains MSG and TBHQ preservative. Regular consumption is linked to metabolic syndrome. Karrot AI suggests healthier alternatives.",
      },
      {
        q: "Are frozen dinners healthy?",
        a: "Most frozen dinners are high in sodium, preservatives, and low in nutrients. Some brands offer cleaner options. Karrot AI helps identify healthier frozen meals.",
      },
      {
        q: "Is deli meat bad for health?",
        a: "Deli meats contain sodium nitrite, high sodium, and preservatives. They're classified as processed meat carcinogens. Scan deli meats with Karrot AI for ingredient analysis.",
      },
      {
        q: "Are microwave meals safe?",
        a: "Microwave meals themselves are safe, but many contain high sodium, preservatives, and plastic packaging concerns. Karrot AI evaluates frozen meal ingredients.",
      },
      {
        q: "Is canned soup healthy?",
        a: "Canned soup often contains excessive sodium (up to 890mg per serving), MSG, and preservatives. BPA in can linings is another concern. Karrot AI finds cleaner options.",
      },
      {
        q: "Are protein bars healthy?",
        a: "Many protein bars contain as much sugar as candy bars, plus sugar alcohols and artificial ingredients. Karrot AI helps identify truly healthy protein bars.",
      },
      {
        q: "Is white bread bad for you?",
        a: "White bread is highly processed, spikes blood sugar, and often contains potassium bromate. Whole grain options are healthier. Karrot AI identifies hidden additives in bread.",
      },
      {
        q: "Are breakfast cereals healthy?",
        a: "Most breakfast cereals are high in sugar, artificial colors, and refined grains. Even 'healthy' brands may have hidden sugars. Scan with Karrot AI before buying.",
      },
    ]
  },
  {
    name: "Beverages",
    faqs: [
      {
        q: "Is diet soda bad for you?",
        a: "Diet soda contains artificial sweeteners linked to metabolic issues and may increase sweet cravings. Some contain controversial additives. Karrot AI analyzes diet drink ingredients.",
      },
      {
        q: "Is orange juice healthy?",
        a: "Even 100% orange juice is high in sugar (22g per cup) without the fiber of whole oranges. 'From concentrate' versions lose nutrients. Karrot AI compares juice quality.",
      },
      {
        q: "Are energy drinks dangerous?",
        a: "Energy drinks contain high caffeine, sugar, and stimulants that can cause heart issues, especially in young people. Karrot AI identifies dangerous ingredients.",
      },
      {
        q: "Is sparkling water healthy?",
        a: "Plain sparkling water is healthy, but flavored versions may contain artificial sweeteners, citric acid, or natural flavors from unknown sources. Scan with Karrot AI.",
      },
      {
        q: "Is coconut water good for you?",
        a: "Pure coconut water is hydrating with natural electrolytes, but many brands add sugar and flavors. Karrot AI helps find pure coconut water.",
      },
      {
        q: "Are smoothies healthy?",
        a: "Store-bought smoothies often contain more sugar than soda, plus fruit juice concentrates and additives. Karrot AI reveals hidden sugars in smoothies.",
      },
      {
        q: "Is green tea healthy?",
        a: "Green tea has antioxidant benefits, but bottled versions often contain added sugar and minimal actual tea. Karrot AI compares green tea drink quality.",
      },
      {
        q: "Is aloe vera juice safe?",
        a: "Aloe juice may have digestive benefits but some products contain aloin (a laxative) and added sugars. Karrot AI checks aloe juice purity.",
      },
      {
        q: "Are sports drinks necessary?",
        a: "Sports drinks contain electrolytes but also high sugar and artificial colors. They're only beneficial during intense exercise. Karrot AI suggests when they're appropriate.",
      },
      {
        q: "Is kombucha healthy?",
        a: "Kombucha contains probiotics but also sugar and may have alcohol traces. Quality varies widely between brands. Use Karrot AI to compare kombucha products.",
      },
    ]
  },
  {
    name: "Sweeteners & Sugar",
    faqs: [
      {
        q: "Is stevia safe?",
        a: "Stevia is generally considered safe and is a natural zero-calorie sweetener. Some products blend it with sugar alcohols. Karrot AI identifies what's in your stevia product.",
      },
      {
        q: "Is honey healthier than sugar?",
        a: "Honey has antioxidants and antimicrobial properties but is still high in sugar. Raw honey is better than processed. Karrot AI identifies real vs. adulterated honey.",
      },
      {
        q: "Are sugar alcohols safe?",
        a: "Sugar alcohols (xylitol, erythritol, sorbitol) can cause digestive issues in some people. They're lower calorie than sugar. Karrot AI tracks sugar alcohols in products.",
      },
      {
        q: "Is agave healthier than sugar?",
        a: "Agave is higher in fructose than high fructose corn syrup, which may strain the liver. It's not a healthy sugar alternative. Karrot AI compares sweetener impacts.",
      },
      {
        q: "Is monk fruit safe?",
        a: "Monk fruit is a natural zero-calorie sweetener with no known side effects. Many products mix it with other sweeteners. Karrot AI identifies pure monk fruit products.",
      },
      {
        q: "Is brown sugar healthier than white?",
        a: "Brown sugar is white sugar with molasses added, offering minimal nutritional difference. It's a marketing distinction. Karrot AI reveals sugar content in products.",
      },
      {
        q: "Is sucralose bad for you?",
        a: "Sucralose (Splenda) may affect gut bacteria and insulin response. It's 600x sweeter than sugar. Karrot AI detects sucralose in food products.",
      },
      {
        q: "Is coconut sugar healthier?",
        a: "Coconut sugar has slightly more nutrients than white sugar but similar caloric and glycemic impact. It's still sugar. Karrot AI compares sugar types.",
      },
      {
        q: "Are artificial sweeteners bad for gut health?",
        a: "Studies suggest artificial sweeteners may negatively impact gut microbiome. Effects vary by sweetener type. Karrot AI helps track sweetener intake.",
      },
      {
        q: "Is maple syrup healthy?",
        a: "Pure maple syrup contains antioxidants and minerals, but is still high in sugar. Many products are fake with corn syrup. Karrot AI verifies maple syrup authenticity.",
      },
    ]
  },
  {
    name: "Oils & Fats",
    faqs: [
      {
        q: "Is vegetable oil unhealthy?",
        a: "Refined vegetable oils are high in omega-6, which may promote inflammation when consumed excessively. They're often highly processed. Karrot AI compares cooking oil quality.",
      },
      {
        q: "Is palm oil bad for you?",
        a: "Palm oil is high in saturated fat and may raise cholesterol. It's also linked to environmental destruction. Karrot AI identifies palm oil in products.",
      },
      {
        q: "Is olive oil healthy?",
        a: "Extra virgin olive oil is considered one of the healthiest oils due to polyphenols and monounsaturated fats. Many products are adulterated. Karrot AI verifies olive oil quality.",
      },
      {
        q: "Is coconut oil healthy or not?",
        a: "Coconut oil is high in saturated fat, making it controversial. It may have benefits but shouldn't be a primary cooking oil. Karrot AI provides balanced analysis.",
      },
      {
        q: "Are seed oils bad for you?",
        a: "Seed oils (canola, soybean, sunflower) are debated. They're high in omega-6 and often heavily processed. Karrot AI helps you choose healthier oils.",
      },
      {
        q: "Is avocado oil healthy?",
        a: "Avocado oil is rich in monounsaturated fats and has a high smoke point. However, studies show 82% of products are rancid or fake. Scan with Karrot AI.",
      },
      {
        q: "Is canola oil safe?",
        a: "Canola oil is low in saturated fat but highly processed and often from GMO crops. Cold-pressed versions are better. Karrot AI identifies oil processing methods.",
      },
      {
        q: "Is MCT oil beneficial?",
        a: "MCT oil may boost energy and support ketosis, but benefits are modest for most people. Quality varies. Karrot AI evaluates MCT oil products.",
      },
      {
        q: "Is lard healthier than vegetable oil?",
        a: "Lard has become controversial again - it's more stable for cooking than some seed oils. Traditional lard may be preferable. Karrot AI compares fat profiles.",
      },
      {
        q: "Is ghee good for health?",
        a: "Ghee has a high smoke point and is lactose-free, making it good for cooking. It's high in saturated fat. Karrot AI helps choose quality ghee.",
      },
    ]
  },
  {
    name: "Gluten & Allergens",
    faqs: [
      {
        q: "Is gluten bad for everyone?",
        a: "Gluten is only harmful for those with celiac disease or gluten sensitivity (about 6% of population). For others, whole grains are beneficial. Karrot AI detects gluten in products.",
      },
      {
        q: "Is soy bad for hormones?",
        a: "Phytoestrogens in soy have minimal effect on human hormones. Moderate soy consumption is safe for most people. Karrot AI identifies soy in products.",
      },
      {
        q: "Are peanuts healthy?",
        a: "Peanuts are nutritious with healthy fats and protein, but allergies affect 2% of children. Aflatoxin contamination is a concern. Karrot AI flags allergens.",
      },
      {
        q: "Is dairy inflammatory?",
        a: "Dairy causes inflammation in lactose intolerant individuals but not in others. A2 milk may be easier to digest. Karrot AI tracks dairy and alternatives.",
      },
      {
        q: "Are eggs bad for cholesterol?",
        a: "Dietary cholesterol from eggs has less impact on blood cholesterol than once thought. Most healthy adults can eat eggs daily. Karrot AI provides personalized guidance.",
      },
      {
        q: "Is shellfish healthy?",
        a: "Shellfish is nutrient-dense with protein and omega-3s, but it's a major allergen. Quality and sourcing matter. Karrot AI identifies shellfish in products.",
      },
      {
        q: "Are tree nuts healthy?",
        a: "Tree nuts provide healthy fats, protein, and nutrients, but allergies can be severe. Cross-contamination is common. Karrot AI detects tree nut traces.",
      },
      {
        q: "Is wheat bad for digestion?",
        a: "Modern wheat may be harder to digest than ancient grains. Some react to fructans, not gluten. Karrot AI helps identify digestive triggers.",
      },
      {
        q: "Is sesame a common allergen?",
        a: "Sesame became the 9th major allergen in US labeling (2023). It's common in tahini, hummus, and Asian foods. Karrot AI detects sesame in products.",
      },
      {
        q: "Are sulfites dangerous for asthmatics?",
        a: "Sulfites can trigger severe asthma attacks in sensitive individuals (5-10% of asthmatics). They're in wine, dried fruits, and processed foods. Karrot AI warns about sulfites.",
      },
    ]
  },
  {
    name: "Organic & Natural",
    faqs: [
      {
        q: "Is organic food healthier?",
        a: "Organic food has fewer pesticides but similar nutritional content. 'Organic' processed foods can still be unhealthy. Karrot AI evaluates products beyond organic labels.",
      },
      {
        q: "Does natural flavoring mean healthy?",
        a: "'Natural flavors' can include hundreds of chemicals - the term is loosely regulated. They're not necessarily healthier than artificial. Karrot AI reveals flavor sources.",
      },
      {
        q: "Is non-GMO important?",
        a: "GMOs are considered safe by scientific consensus. Non-GMO is a personal choice, not a health necessity. Karrot AI identifies GMO ingredients.",
      },
      {
        q: "Are pesticides in food dangerous?",
        a: "Pesticide residues on conventional produce are usually within safe limits, but long-term effects are debated. Karrot AI tracks the 'Dirty Dozen' produce.",
      },
      {
        q: "Is grass-fed beef healthier?",
        a: "Grass-fed beef has more omega-3s and CLA than grain-fed, plus no antibiotics or hormones. It's a healthier choice. Karrot AI compares meat quality.",
      },
      {
        q: "Does cage-free mean healthy eggs?",
        a: "'Cage-free' refers to living conditions, not nutrition. Pasture-raised eggs may have more nutrients. Karrot AI explains egg labeling.",
      },
      {
        q: "Is wild-caught fish better?",
        a: "Wild-caught fish often has fewer contaminants and more omega-3s than farmed, but varies by species and source. Karrot AI compares fish quality.",
      },
      {
        q: "Are superfoods really super?",
        a: "'Superfood' is a marketing term, not scientific. These foods are nutritious but not magical. Karrot AI provides balanced nutritional analysis.",
      },
      {
        q: "Is raw food healthier than cooked?",
        a: "Some nutrients are lost in cooking, but cooking also increases bioavailability of others. Both have benefits. Karrot AI analyzes food preparation impacts.",
      },
      {
        q: "Does expiration date mean unsafe?",
        a: "'Best by' dates indicate quality, not safety. Many foods are safe after these dates. Karrot AI helps understand food labeling.",
      },
    ]
  },
];

// Flatten FAQs for search
const allFaqs = faqCategories.flatMap((cat, catIndex) => 
  cat.faqs.map((faq, faqIndex) => ({
    ...faq,
    category: cat.name,
    id: `${catIndex}-${faqIndex}`
  }))
);

// Single FAQ Item Component
function FAQItem({ faq, isOpen, onToggle }: { 
  faq: typeof allFaqs[0], 
  isOpen: boolean, 
  onToggle: () => void 
}) {
  return (
    <div className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-start justify-between text-left"
      >
        <span className="text-sm sm:text-base text-white/90 font-light tracking-wide pr-4">
          {faq.q}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                {faq.a}
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-white/40">
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                    <span className="text-xs tracking-wide">Get instant ingredient analysis with Karrot AI</span>
                  </div>
                  <Link
                    href="/#waitlist"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs tracking-widest uppercase font-light hover:bg-white/90 transition-all duration-300"
                  >
                    Join Waitlist
                    <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set())

  // Filter FAQs based on search
  const filteredFaqs = searchQuery
    ? allFaqs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory
      ? allFaqs.filter(faq => faq.category === activeCategory)
      : allFaqs

  const toggleFaq = (id: string) => {
    const newOpen = new Set(openFaqs)
    if (newOpen.has(id)) {
      newOpen.delete(id)
    } else {
      newOpen.add(id)
    }
    setOpenFaqs(newOpen)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/80">Karrot AI</span>
            </Link>
            <Link
              href="/#waitlist"
              className="px-4 py-2 bg-white text-black text-xs tracking-widest uppercase font-light hover:bg-white/90 transition-all duration-300"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pb-16 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-white mb-4">
              Food & Health FAQ
            </h1>
            <p className="text-base sm:text-lg text-white/50 font-light tracking-wide max-w-2xl mx-auto mb-8">
              100 most common questions about ingredients, additives, and food health — answered with science and powered by Karrot AI.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search questions (e.g., 'is MSG bad', 'Snickers')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-none border border-white/10 bg-white/[0.02] px-12 py-4 text-base text-white placeholder-white/30 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none tracking-wide"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  ✕
                </button>
              )}
            </div>
            
            {searchQuery && (
              <p className="mt-4 text-sm text-white/40">
                Found {filteredFaqs.length} results for "{searchQuery}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Pills */}
      {!searchQuery && (
        <section className="py-6 border-b border-white/5 overflow-x-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 min-w-max pb-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-xs tracking-wide uppercase transition-all duration-300 ${
                  !activeCategory 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
                }`}
              >
                All ({allFaqs.length})
              </button>
              {faqCategories.map((cat) => {
                const IconComponent = categoryIcons[cat.name]
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 text-xs tracking-wide transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === cat.name 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
                    }`}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" strokeWidth={1.5} />}
                    <span className="hidden sm:inline">{cat.name}</span>
                    <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-60">({cat.faqs.length})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqs.has(faq.id)}
                onToggle={() => toggleFaq(faq.id)}
              />
            ))}
          </div>
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 mb-4">No questions found matching your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-white/60 hover:text-white underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-white mb-4">
              Get Instant Answers with Karrot AI
            </h2>
            <p className="text-white/50 font-light tracking-wide max-w-xl mx-auto mb-8">
              Stop guessing what's in your food. Scan any product and get personalized health insights in under 5 seconds.
            </p>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-3 bg-white px-8 py-4 text-black text-sm tracking-widest uppercase font-light hover:bg-white/90 transition-all duration-300"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-xs tracking-[0.15em] uppercase text-white/60">Karrot AI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Terms of Service
              </Link>
            </div>
            <span className="text-xs text-white/40">
              © {new Date().getFullYear()} Karrot AI
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
