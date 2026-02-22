import type { BusinessType } from "@/types";

interface SeedTask {
  title: string;
  description: string;
  detailedSteps: string[];
  state: string;
  business_type: BusinessType;
  cost_estimate: string;
  cost_details: string;
  timeline_estimate: string;
  timeline_details: string;
  required_documents: string[];
  official_link: string | null;
  category: string;
  order: number;
}

export const seedTasks: SeedTask[] = [
  // === GENERIC TASKS (For all businesses) ===
  {
    title: "Get an Employer Identification Number (EIN)",
    description: "Apply for a federal tax ID number from the IRS. This is like your business's Social Security number.",
    detailedSteps: [
      "Go to the IRS website (irs.gov/ein)",
      "Click on 'Apply Online Now'",
      "Fill out the application form - you'll need your personal SSN and business details",
      "The EIN is issued immediately for online applications",
      "Write down or print your EIN - you'll need it for bank accounts and taxes"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "Free",
    cost_details: "The IRS does not charge for EIN applications",
    timeline_estimate: "Immediate",
    timeline_details: "You get your EIN instantly when applying online",
    required_documents: ["Social Security Number (SSN)", "Business name", "Business address"],
    official_link: "https://www.irs.gov/ein",
    category: "tax",
    order: 1,
  },
  {
    title: "Choose a Business Structure",
    description: "Decide what type of business entity you want to form - Sole Proprietorship, LLC, Corporation, or Partnership.",
    detailedSteps: [
      "Sole Proprietorship: Simplest form, no registration needed, but you have personal liability",
      "LLC (Limited Liability Company): Protects your personal assets, popular for small businesses",
      "Corporation: More complex, required for larger businesses seeking investors",
      "Partnership: If starting with partners, requires a partnership agreement",
      "Consult with an attorney or accountant if unsure - this is an important decision"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "$50 - $800",
    cost_details: "Costs vary by state: Sole Prop is free, LLC filing fees are $50-$800 depending on state",
    timeline_estimate: "1-4 weeks",
    timeline_details: "Sole Prop is immediate, LLCs take 1-4 weeks to approve",
    required_documents: ["Business name", "Owner information", "Registered agent (for LLCs)"],
    official_link: null,
    category: "legal",
    order: 2,
  },
  {
    title: "Register Your Business Name",
    description: "Register your business name with your state to operate legally.",
    detailedSteps: [
      "If using your own name (John Smith), you may not need to register",
      "If using a fictional name (like 'Smith Consulting'), file a DBA (Doing Business As)",
      "Visit your county clerk's office or state Secretary of State website",
      "Fill out the Fictitious Business Name or DBA application",
      "Pay the filing fee (usually $10-$50)",
      "Publish a notice in a local newspaper (some states require this)"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "$25 - $100",
    cost_details: "County filing fees vary from $25-$100",
    timeline_estimate: "1-3 weeks",
    timeline_details: "Processing takes 1-2 weeks, plus time for newspaper publication if required",
    required_documents: ["Business name", "Owner name and address", "Nature of business"],
    official_link: null,
    category: "registration",
    order: 3,
  },
  {
    title: "Open a Business Bank Account",
    description: "Open a separate bank account for your business to keep personal and business finances separate.",
    detailedSteps: [
      "Bring your EIN confirmation letter to the bank",
      "Bring your business formation documents (LLC articles, etc.)",
      "Bring your driver's license or passport",
      "Some banks offer free business checking - shop around",
      "Consider getting a business debit card for expenses"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "$0 - $30",
    cost_details: "Many banks offer free business checking accounts",
    timeline_estimate: "1-2 days",
    timeline_details: "Can often open online in minutes, or visit a branch",
    required_documents: ["EIN letter", "Business formation documents", "ID (driver's license)"],
    official_link: null,
    category: "operations",
    order: 4,
  },
  {
    title: "Get Business Insurance",
    description: "Protect your business with the right insurance coverage.",
    detailedSteps: [
      "General Liability Insurance: Essential for most businesses, covers injuries and property damage",
      "Professional Liability: If you provide advice or services",
      "Workers Compensation: Required if you have employees in most states",
      "Get quotes from multiple insurance companies",
      "Consider starting with a Business Owner's Policy (BOP) which bundles coverage"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "$500 - $3,000/year",
    cost_details: "Varies by business type, size, and coverage needs",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Can get quotes same day, policies typically start within a week",
    required_documents: ["Business information", "Estimated revenue", "Number of employees"],
    official_link: null,
    category: "insurance",
    order: 5,
  },
  {
    title: "Set Up Accounting System",
    description: "Create a system to track your income, expenses, and taxes.",
    detailedSteps: [
      "Choose accounting software (QuickBooks, Xero, Wave - Wave is free)",
      "Set up your business in the software",
      "Connect your bank account for automatic transaction downloads",
      "Learn the basics: income, expenses, invoices",
      "Set aside money for taxes (typically 25-30% of profits)",
      "Consider hiring a bookkeeper if overwhelmed"
    ],
    state: "general",
    business_type: "general",
    cost_estimate: "$0 - $50/month",
    cost_details: "Wave is free, QuickBooks starts at $25/month",
    timeline_estimate: "1-3 days",
    timeline_details: "Can set up in a few hours, takes time to categorize past transactions",
    required_documents: ["Bank statements", "Receipts", "Previous tax returns"],
    official_link: null,
    category: "operations",
    order: 6,
  },

  // === RESTAURANT TASKS ===
  {
    title: "Apply for a Food Service Permit",
    description: "Get a health permit from your county to operate a restaurant.",
    detailedSteps: [
      "Contact your county Environmental Health Department",
      "Schedule a pre-inspection of your kitchen space",
      "Make any required changes (ventilation, sinks, refrigeration, etc.)",
      "Pass the health inspection",
      "Receive your permit and post it prominently"
    ],
    state: "general",
    business_type: "restaurant",
    cost_estimate: "$100 - $500",
    cost_details: "Varies by county, typically $100-$500 for the permit",
    timeline_estimate: "2-6 weeks",
    timeline_details: "Pre-inspection takes 1-2 weeks, permit issued after passing inspection",
    required_documents: ["Floor plan", "Equipment list", "Food handler certifications"],
    official_link: null,
    category: "permits",
    order: 10,
  },
  {
    title: "Get a Liquor License (if serving alcohol)",
    description: "Apply for a license to serve alcoholic beverages.",
    detailedSteps: [
      "Determine what type of license you need (beer & wine, or full liquor)",
      "Check if your location is in a restricted area",
      "Complete the application (this can be lengthy)",
      "Pay the application fee",
      "Attend a hearing (in some jurisdictions)",
      "The process can take 3-6 months, so apply early!"
    ],
    state: "general",
    business_type: "restaurant",
    cost_estimate: "$1,000 - $15,000",
    cost_details: "Varies enormously by state and license type",
    timeline_estimate: "3-6 months",
    timeline_details: "One of the longest permit processes - apply early!",
    required_documents: ["Application form", "Floor plan", "Background checks", "Proof of insurance"],
    official_link: null,
    category: "permits",
    order: 11,
  },
  {
    title: "Register for Sales Tax",
    description: "Register with your state to collect and remit sales tax on food sales.",
    detailedSteps: [
      "Visit your state Department of Revenue website",
      "Register for a sales tax permit/account",
      "Learn your state's sales tax rate",
      "Understand what items are taxable (prepared food vs. grocery items differ)",
      "Set up a system to track and remit sales tax"
    ],
    state: "general",
    business_type: "restaurant",
    cost_estimate: "Free",
    cost_details: "Registration is free",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Usually approved within a week",
    required_documents: ["Business information", "EIN", "Owner information"],
    official_link: null,
    category: "tax",
    order: 12,
  },
  {
    title: "Get a Food Handler's Permit",
    description: "Ensure your staff has proper food safety certification.",
    detailedSteps: [
      "Determine which employees need certification (varies by state)",
      "Complete an approved food safety course",
      "Pass the certification exam",
      "Display the certificate in your restaurant",
      "Renew as required (typically every 2-3 years)"
    ],
    state: "general",
    business_type: "restaurant",
    cost_estimate: "$50 - $150/person",
    cost_details: "Course costs $50-$150 per person",
    timeline_estimate: "1-2 days",
    timeline_details: "Most courses can be completed in a few hours",
    required_documents: ["Government-issued ID"],
    official_link: null,
    category: "compliance",
    order: 13,
  },

  // === RETAIL TASKS ===
  {
    title: "Register for Sales Tax (Retail)",
    description: "Register with your state to collect sales tax on retail goods.",
    detailedSteps: [
      "Visit your state Department of Revenue website",
      "Register for a sales tax permit",
      "Get your tax account number",
      "Learn the sales tax rate for your location",
      "Set up sales tax collection in your POS system"
    ],
    state: "general",
    business_type: "retail",
    cost_estimate: "Free",
    cost_details: "Registration is free",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Usually approved within a week",
    required_documents: ["Business information", "EIN", "Owner information"],
    official_link: null,
    category: "tax",
    order: 20,
  },
  {
    title: "Get a Reseller's Permit",
    description: "Register to buy goods for resale without paying sales tax.",
    detailedSteps: [
      "Apply through your state Department of Revenue",
      "Provide your sales tax permit information",
      "Receive your reseller's permit number",
      "Present this permit to wholesalers when purchasing",
      "Track items you buy for resale to report later"
    ],
    state: "general",
    business_type: "retail",
    cost_estimate: "Free",
    cost_details: "Usually free with your sales tax registration",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Often issued with your sales tax permit",
    required_documents: ["Sales tax permit", "Business license"],
    official_link: null,
    category: "tax",
    order: 21,
  },

  // === CONSTRUCTION TASKS ===
  {
    title: "Get a General Contractor License (if required)",
    description: "Obtain a contractor's license if doing work over a certain value.",
    detailedSteps: [
      "Check your state's licensing requirements (amounts vary by state)",
      "Complete required education or experience hours",
      "Pass the contractor exam",
      "Get liability insurance (required in most states)",
      "Provide a contractor bond (amounts vary)",
      "Renew your license annually"
    ],
    state: "general",
    business_type: "construction",
    cost_estimate: "$300 - $1,000",
    cost_details: "Exam fees, insurance, and bond costs vary widely",
    timeline_estimate: "4-8 weeks",
    timeline_details: "Process takes 1-2 months after passing exam",
    required_documents: ["Education transcripts", "Work experience proof", "Insurance certificate", "Bond"],
    official_link: null,
    category: "permits",
    order: 30,
  },
  {
    title: "Get Contractor Liability Insurance",
    description: "Protect your business with proper insurance coverage.",
    detailedSteps: [
      "General Liability: Covers property damage and injuries",
      "Workers Compensation: Required if you have employees",
      "Commercial Auto: For company vehicles",
      "Get quotes from multiple providers",
      "Keep certificates of insurance for your records"
    ],
    state: "general",
    business_type: "construction",
    cost_estimate: "$2,000 - $10,000/year",
    cost_details: "Varies by number of employees and work type",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Can get quotes same day",
    required_documents: ["Business information", "Estimated payroll", "List of services"],
    official_link: null,
    category: "insurance",
    order: 31,
  },

  // === TECHNOLOGY / CONSULTING TASKS ===
  {
    title: "Create a Professional Website",
    description: "Build a website to showcase your services and attract customers.",
    detailedSteps: [
      "Choose a domain name (yourbusiness.com)",
      "Use a website builder (Wix, Squarespace, WordPress)",
      "Choose a professional template",
      "Add essential pages: Home, About, Services, Contact",
      "Include clear calls to action",
      "Make it mobile-friendly",
      "Add customer testimonials if available"
    ],
    state: "general",
    business_type: "technology",
    cost_estimate: "$0 - $500",
    cost_details: "Wix/Squarespace: $16-45/month, WordPress is free but needs hosting ($5-25/month)",
    timeline_estimate: "1-4 weeks",
    timeline_details: "Can be done in a few days with a website builder",
    required_documents: ["Domain name", "Content (text, images)"],
    official_link: null,
    category: "operations",
    order: 40,
  },
  {
    title: "Create Service Contracts/Agreements",
    description: "Have legal agreements in place for your clients.",
    detailedSteps: [
      "Define your services clearly",
      "Outline payment terms (when, how much)",
      "Include cancellation/refund policies",
      "Add liability limitations",
      "Have an attorney review if possible",
      "Use contracts for every client"
    ],
    state: "general",
    business_type: "technology",
    cost_estimate: "$0 - $500",
    cost_details: "Can use templates for free, attorney review costs more",
    timeline_estimate: "1-2 weeks",
    timeline_details: "Create once, use repeatedly",
    required_documents: ["Service descriptions", "Business terms"],
    official_link: null,
    category: "legal",
    order: 41,
  },

  // === SPECIFIC STATE TASKS ===
  // California Restaurant
  {
    title: "Register with California CDTFA",
    description: "Register with California's tax agency to collect sales tax.",
    detailedSteps: [
      "Go to cdtfa.ca.gov",
      "Click 'Register a New Business Account'",
      "Create an account",
      "Follow the prompts to register for a seller's permit",
      "You'll receive a permit number and filing frequency",
      "File returns on time (monthly, quarterly, or annually)"
    ],
    state: "CA",
    business_type: "restaurant",
    cost_estimate: "Free",
    cost_details: "No charge for registration",
    timeline_estimate: "2-4 weeks",
    timeline_details: "Can take 2-4 weeks for paper applications, faster online",
    required_documents: ["Business info", "SSN or EIN", "Start date", "Estimated sales"],
    official_link: "https://www.cdtfa.ca.gov/",
    category: "tax",
    order: 100,
  },
  // Texas Restaurant
  {
    title: "Register with Texas Comptroller",
    description: "Register with Texas to collect sales tax.",
    detailedSteps: [
      "Go to comptroller.texas.gov",
      "Register for a sales tax permit",
      "Set up your account",
      "Learn the Texas sales tax rate (6.25% + local taxes)",
      "File returns as assigned (monthly, quarterly, or annually)"
    ],
    state: "TX",
    business_type: "restaurant",
    cost_estimate: "Free",
    cost_details: "No charge for registration",
    timeline_estimate: "2-4 weeks",
    timeline_details: "Usually approved within 2-4 weeks",
    required_documents: ["Business info", "EIN", "Owner information"],
    official_link: "https://comptroller.texas.gov/taxes/sales",
    category: "tax",
    order: 100,
  },
  // New York Restaurant
  {
    title: "Register with NY Tax Department",
    description: "Register with New York to collect sales tax.",
    detailedSteps: [
      "Go to tax.ny.gov",
      "Create an NY.gov account",
      "Register for sales tax",
      "Get your Certificate of Authority",
      "Post it in your restaurant",
      "File sales tax returns (monthly for most restaurants)"
    ],
    state: "NY",
    business_type: "restaurant",
    cost_estimate: "Free",
    cost_details: "No charge for registration",
    timeline_estimate: "3-6 weeks",
    timeline_details: "Can take several weeks in NY",
    required_documents: ["Business info", "EIN", "Owner SSN"],
    official_link: "https://www.tax.ny.gov/",
    category: "tax",
    order: 100,
  },
  // Florida Restaurant
  {
    title: "Register with Florida Department of Revenue",
    description: "Register with Florida to collect sales tax.",
    detailedSteps: [
      "Go to floridarevenue.com",
      "Register for a sales tax permit",
      "Complete the application",
      "Receive your certificate",
      "File returns (typically monthly for restaurants)"
    ],
    state: "FL",
    business_type: "restaurant",
    cost_estimate: "Free",
    cost_details: "No charge for registration",
    timeline_estimate: "2-4 weeks",
    timeline_details: "Usually approved within a month",
    required_documents: ["Business info", "EIN", "Owner information"],
    official_link: "https://floridarevenue.com/taxes/sales",
    category: "tax",
    order: 100,
  },
];
