import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Karrot AI | Know What You Consume - AI Ingredient Scanner",
  description: "Karrot AI is an AI-powered ingredient scanning app that gives you personalized health insights in under 5 seconds. Scan any product barcode or ingredient list to make informed decisions about what you consume. Available worldwide.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      }
    ],
    apple: {
      url: "/logo.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  keywords: [
    // Primary Keywords
    "ingredient scanner",
    "AI health app",
    "nutrition analysis",
    "food scanner app",
    "karrot ai",
    "health insights",
    "barcode scanner",
    "food ingredients checker",
    "allergen detector",
    // Long-tail Keywords (AEO)
    "what ingredients are in my food",
    "is this food healthy for me",
    "scan food ingredients app",
    "check food additives",
    "ai food analysis",
    "personalized nutrition app",
    "food allergy scanner",
    "healthy eating assistant",
    "ingredient safety checker",
    "product nutrition scanner",
    // International Keywords (GEO)
    "food scanner usa",
    "ingredient checker uk",
    "nutrition app australia",
    "health app canada",
    "food analysis europe",
    "diet tracker worldwide"
  ],
  authors: [{ name: "Karrot AI", url: "https://karrotai.app" }],
  creator: "Karrot AI",
  publisher: "Karrot AI",
  applicationName: "Karrot AI",
  category: "Health & Fitness",
  classification: "Health Application",
  
  // Open Graph
  openGraph: {
    title: "Karrot AI | Know What You Consume - AI Ingredient Scanner",
    description: "AI-powered ingredient scanning that gives you personalized health insights in under 5 seconds. Scan any barcode or ingredient list. Join 50,000+ users making healthier choices.",
    type: "website",
    siteName: "Karrot AI",
    locale: "en_US",
    url: "https://karrotai.app",
    images: [
      {
        url: "https://karrotai.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karrot AI - AI-Powered Ingredient Scanner for Healthier Choices",
        type: "image/png",
      }
    ],
    countryName: "United States",
  },
  
  // Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Karrot AI | Know What You Consume",
    description: "AI-powered ingredient scanning that gives you personalized health insights in seconds. Join the waitlist!",
    site: "@karrotai",
    creator: "@karrotai",
    images: {
      url: "https://karrotai.app/og-image.png",
      alt: "Karrot AI - Know What You Consume",
    },
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (add your codes when ready)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },
  
  // Alternate languages and canonical (for international SEO)
  alternates: {
    canonical: "https://karrotai.app",
    languages: {
      'en-US': 'https://karrotai.app',
      'en-GB': 'https://karrotai.app',
      'en-AU': 'https://karrotai.app',
      'en-CA': 'https://karrotai.app',
      'x-default': 'https://karrotai.app',
    },
  },
  
  // App-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Karrot AI",
  },
  
  // Additional metadata
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  
  // App Links for mobile deep linking (commented - enable when apps are published)
  // appLinks: {
  //   ios: {
  //     url: "https://karrotai.app/ios",
  //     app_store_id: "coming-soon",
  //   },
  //   android: {
  //     package: "app.karrotai.android",
  //     url: "https://karrotai.app/android",
  //   },
  // },
  
  other: {
    // Generative Engine Optimization (GEO) - for AI/LLM discoverability
    "ai-content-declaration": "This website contains information about Karrot AI, an AI-powered ingredient scanning mobile application.",
    "ai-summary": "Karrot AI: AI-powered food ingredient scanner providing personalized health insights in under 5 seconds. Scans barcodes and ingredient lists. 10M+ products, 50+ countries, 99% accuracy. Join waitlist at karrotai.app.",
    
    // Content Language
    "content-language": "en-US",
    
    // Distribution
    "distribution": "global",
    "coverage": "Worldwide",
    "target": "all",
    
    // Rating
    "rating": "general",
    
    // Revisit
    "revisit-after": "7 days",
    
    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    
    // MSN/Bing
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Karrot AI",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS, Android",
  "description": "AI-powered ingredient scanning app that gives you personalized health insights in under 5 seconds. Scan any barcode or ingredient list to make healthier choices.",
  "url": "https://karrotai.app",
  "downloadUrl": "https://karrotai.app",
  "featureList": [
    "AI-powered ingredient analysis",
    "Barcode scanning",
    "Personalized health insights",
    "Allergen detection",
    "Nutrition scoring",
    "10M+ product database",
    "50+ countries supported"
  ],
  "screenshot": "https://karrotai.app/og-image.png",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/ComingSoon"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "Karrot AI",
    "url": "https://karrotai.app",
    "logo": "https://karrotai.app/logo.svg",
    "sameAs": [
      "https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu",
      "https://tiktok.com/@karrot.ai",
      "https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08"
    ]
  }
};

// Organization Schema for brand recognition
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Karrot AI",
  "url": "https://karrotai.app",
  "logo": "https://karrotai.app/logo.svg",
  "description": "Karrot AI helps you understand what's in your food with AI-powered ingredient scanning.",
  "foundingDate": "2024",
  "sameAs": [
    "https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu",
    "https://tiktok.com/@karrot.ai",
    "https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@karrotai.app",
    "availableLanguage": ["English"]
  }
};

// FAQ Schema for AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Karrot AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI is an AI-powered ingredient scanning app that helps you understand what's in your food. Simply scan any product barcode or ingredient list to get instant health insights personalized to your dietary needs and wellness goals."
      }
    },
    {
      "@type": "Question",
      "name": "How does Karrot AI work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Point your phone camera at any product barcode or ingredient list. Our AI analyzes the ingredients in under 5 seconds and provides personalized health recommendations based on your dietary profile, allergies, and wellness goals."
      }
    },
    {
      "@type": "Question",
      "name": "Is Karrot AI free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI will offer a free tier with basic scanning features. Join our waitlist to get early access and exclusive benefits when we launch, including extended free premium access."
      }
    },
    {
      "@type": "Question",
      "name": "What products can Karrot AI scan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI can scan any food product with a barcode or visible ingredient list. Our database includes over 10 million products from 50+ countries, covering packaged foods, beverages, supplements, and more."
      }
    },
    {
      "@type": "Question",
      "name": "Does Karrot AI detect food allergies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Karrot AI can detect common allergens including gluten, dairy, nuts, soy, eggs, shellfish, and more. Set up your allergen profile and get instant warnings when scanning products that contain ingredients you need to avoid."
      }
    },
    {
      "@type": "Question",
      "name": "Is Karrot AI available worldwide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Karrot AI is designed for global use. Our database covers products from over 50 countries including the USA, UK, Canada, Australia, and European countries. The app works with any product that has a barcode or readable ingredient list."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is Karrot AI's ingredient analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI uses advanced AI technology with 99% accuracy in ingredient recognition. Our analysis is based on peer-reviewed nutritional research and is regularly updated by our team of health experts."
      }
    },
    {
      "@type": "Question",
      "name": "When will Karrot AI launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI is currently in development and will launch soon. Join our waitlist at karrotai.app to be notified when we launch and get early access benefits."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best app to scan food ingredients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI is one of the best apps for scanning food ingredients. It uses advanced AI to analyze ingredients in under 5 seconds, detects allergens, and provides personalized health insights based on your dietary needs. Join the waitlist at karrotai.app."
      }
    },
    {
      "@type": "Question",
      "name": "How can I check if food is healthy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Karrot AI to check if food is healthy for you. Simply scan the product barcode or ingredient list with your phone camera. The app analyzes all ingredients and gives you a personalized health score based on your dietary profile and goals."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an app that tells you what's in your food?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Karrot AI is an app that tells you exactly what's in your food. It scans barcodes or ingredient lists and uses AI to identify and analyze every ingredient, providing health insights, allergen warnings, and nutrition information."
      }
    },
    {
      "@type": "Question",
      "name": "What app scans barcodes for nutrition information?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karrot AI scans barcodes for comprehensive nutrition information. Beyond basic nutrition facts, it analyzes individual ingredients for health impacts, detects allergens, and provides personalized recommendations based on your dietary needs."
      }
    }
  ]
};

// WebSite Schema for sitelinks search box
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Karrot AI",
  "url": "https://karrotai.app",
  "description": "AI-powered ingredient scanning app for personalized health insights",
  "publisher": {
    "@type": "Organization",
    "name": "Karrot AI"
  }
};

// BreadcrumbList for navigation (homepage)
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://karrotai.app"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        
        {/* GEO - Generative Engine Optimization for AI/LLMs */}
        <link rel="author" href="/llms.txt" />
        <link rel="help" href="/llms-full.txt" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data for SEO & AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
