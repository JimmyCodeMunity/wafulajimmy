import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { client } from "../lib/sanityClient";

// Types (you can expand these later)
export interface Skill {
  _id: string;
  name: string;
  percentage: number;
  category?: { _id: string; name: string };
}

interface Project {
  _id: string;
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  image?: any;
  languages: Skill[];
  featured: boolean;
}

interface Experience {
  _id: string;
  companywebsite: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: Skill[];
}

interface PortfolioData {
  author: any;
  details: any;
  skills: Skill[];
  categories: any[];
  projects: Project[];
  experiences: Experience[];
  uploads: any[];
}

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

const query = `{
  "author": *[_type == "author"][0]{
    _id, name, email,phone, image
  },
  "details": *[_type == "details"][0]{
    _id, mainrole, subrole, landinginfo, aboutheading, journey,
    author->{_id, name, email, image},
    skills[]->{_id, name, percentage, category->{_id, name}}
  },
  "skills": *[_type == "skill"]{
    _id, name, percentage, category->{_id, name}
  },
  "categories": *[_type == "skillCategory"]{
    _id, name, description,
    "skills": *[_type == "skill" && references(^._id)]{_id, name, percentage}
  },
  "projects": *[_type == "project"]{
    _id, title, description, liveLink, githubLink, image,featured,
    languages[]->{_id, name, category->{_id, name}}
  },
  
  "experiences": *[_type == "professionalExperience"]{
    _id, role, company, location,companywebsite, startDate, endDate, description, achievements,
    technologies[]->{_id, name, category->{_id, name}}
  },
  "uploads": *[_type == "cvUpload"]{
    _id,
    title,
    "fileUrl": file.asset->url
  }
}`;

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(query)
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
