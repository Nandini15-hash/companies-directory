export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  founded: number;
  description: string;
  website: string;
  email: string;
}

export interface FilterState {
  search: string;
  industry: string;
  location: string;
  size: string;
}

export interface SortState {
  field: keyof Company;
  direction: 'asc' | 'desc';
}

// Mock data for fallback
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    location: "San Francisco",
    size: "1000-5000",
    founded: 2010,
    description: "Leading provider of enterprise software solutions and cloud infrastructure services for global businesses.",
    website: "https://techcorp.com",
    email: "contact@techcorp.com"
  },
  {
    id: "2",
    name: "GreenEnergy Inc",
    industry: "Energy",
    location: "Austin",
    size: "500-1000",
    founded: 2015,
    description: "Renewable energy solutions provider focused on solar and wind power for sustainable future.",
    website: "https://greenenergy.com",
    email: "info@greenenergy.com"
  },
  {
    id: "3",
    name: "HealthPlus Medical",
    industry: "Healthcare",
    location: "Boston",
    size: "5000+",
    founded: 2005,
    description: "Comprehensive healthcare services and advanced medical technology solutions.",
    website: "https://healthplus.com",
    email: "support@healthplus.com"
  },
  {
    id: "4",
    name: "EduTech Innovations",
    industry: "Education",
    location: "New York",
    size: "100-500",
    founded: 2018,
    description: "Revolutionizing education through innovative technology platforms and learning solutions.",
    website: "https://edutech.com",
    email: "hello@edutech.com"
  },
  {
    id: "5",
    name: "FinSecure Bank",
    industry: "Finance",
    location: "Chicago",
    size: "5000+",
    founded: 1995,
    description: "Trusted financial services and secure banking solutions for individuals and businesses.",
    website: "https://finsecure.com",
    email: "service@finsecure.com"
  },
  {
    id: "6",
    name: "LogiMove Transport",
    industry: "Logistics",
    location: "Miami",
    size: "1000-5000",
    founded: 2012,
    description: "Efficient logistics and transportation services with global supply chain management.",
    website: "https://logimove.com",
    email: "shipping@logimove.com"
  }
];