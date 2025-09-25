import { usePortfolio } from "../context/PortfolioContext";
import { urlFor } from "../lib/sanityClient";

export default function Test() {
  const { portfolio, loading, error } = usePortfolio();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!portfolio) return <p>No data</p>;

  return (
    <div className="w-full flex flex-1 h-screen bg-white text-black justify-center items-center">
      <h1>{portfolio.author.name}</h1>
      {portfolio.author.image && (
        <img
          src={urlFor(portfolio.author.image).width(150).url()}
          alt={portfolio.author.name}
        />
      )}

      <h2>Projects</h2>
      {portfolio.projects.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Languages: {p.languages.map((l) => l.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
