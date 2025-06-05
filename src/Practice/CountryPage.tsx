import { useEffect, useState } from "react";

type Country = {
  name: { common: string };
  flags: { png: string; svg: string };
  population: number;
  area: number;
  region: string;
  independent?: boolean;
  unMember?: boolean;
};

export const CountryPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUNMembersOnly, setShowUNMembersOnly] = useState(false);
  const [showIndependentsOnly, setShowIndependentsOnly] = useState(false);

  const [sortKey, setSortKey] = useState<
    "name" | "population" | "area" | "region"
  >("name");

  const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "Americas",
    "Africa",
    "Asia",
    "Europe",
  ]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      });
  }, []);

  const filteredCountries = [...countries]
    .filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const inSelectedRegion = selectedRegions.includes(country.region);

      const matchesUN = !showUNMembersOnly || country.unMember === true;

      const matchesIndependence =
        !showIndependentsOnly || country.independent === true;

      return (
        matchesSearch && inSelectedRegion && matchesUN && matchesIndependence
      );
    })
    .sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.common.localeCompare(b.name.common);
        case "population":
          return b.population - a.population;
        case "area":
          return b.area - a.area;
        case "region":
          return a.region.localeCompare(b.region);
        default:
          return 0;
      }
    });

  return (
    <div className="w-full h-[800px] bg-[#1c1d1e] relative">
      <div className="relative h-[33%] w-full">
        <img
          src="Images/CountryPage/hero-image.jpg"
          className="absolute w-full h-full rounded-t-3xl z-10"
          alt="hero-image"
        />
        <img
          src="Images/CountryPage/Logo.svg"
          className="absolute top-1/3 w-full h-5 z-10"
          alt="logo"
        />
      </div>

      <div className="absolute bottom-0 h-3/4 text-white px-8 w-full z-20">
        <div className="bg-[#1c1d1e] h-full rounded-t-xl border-2 border-gray-800 p-5 flex w-full flex-col gap-6">
          <div className="flex justify-between w-full h-10">
            <div className="flex justify-center items-center">
              <p>Found {filteredCountries.length} countries</p>
            </div>
            <div className="rounded-xl bg-gray-600 justify-center items-center flex w-[400px] px-4">
              <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white w-full outline-none placeholder-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="w-[15%] flex flex-col gap-5 pr-8">
              <div className="mt-1.5">
                <p>Sort By</p>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
                  className="bg-gray-700 text-white p-3 rounded-xl w-full"
                >
                  <option value="name">Name</option>
                  <option value="population">Population</option>
                  <option value="area">Area (km²)</option>
                  <option value="region">Region</option>
                </select>
              </div>
              <div>
                <p>Region</p>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => {
                    const isSelected = selectedRegions.includes(region);
                    return (
                      <button
                        key={region}
                        onClick={() => toggleRegion(region)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${isSelected ? "bg-gray-700 " : "bg-none hover:bg-gray-600"}`}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p>Status</p>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={showUNMembersOnly}
                      onChange={() => setShowUNMembersOnly((prev) => !prev)}
                      className="form-checkbox text-gray-600"
                    />
                    Member of the United Nations
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={showIndependentsOnly}
                      onChange={() => setShowIndependentsOnly((prev) => !prev)}
                      className="form-checkbox text-gray-600"
                    />
                    Independent
                  </label>
                </div>
              </div>
            </div>

            <div className="w-[85%] flex flex-col">
              <div className="h-10 items-center flex gap-12 border-b-2 border-gray-800 justify-stretch">
                <div className="flex w-1/4">
                  <p>Flag</p>
                </div>
                <div className="flex w-full">
                  <p>Name</p>
                </div>
                <div className="flex w-full">
                  <p>Population</p>
                </div>
                <div className="flex w-full">
                  <p>Area (km²)</p>
                </div>
                <div className="flex w-full">
                  <p>Region</p>
                </div>
              </div>

              <div className="flex flex-col mt-2 gap-4 overflow-y-auto max-h-[440px]">
                {filteredCountries.map((country) => (
                  <div
                    key={country.name.common}
                    className="flex gap-12 justify-stretch items-center"
                  >
                    <div className="flex w-1/4">
                      <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className="h-10 w-auto rounded-sm shadow"
                      />
                    </div>
                    <div className="flex w-full">
                      <p>{country.name.common}</p>
                    </div>
                    <div className="flex w-full">
                      <p>{country.population.toLocaleString()}</p>
                    </div>
                    <div className="flex w-full">
                      <p>{country.area.toLocaleString()}</p>
                    </div>
                    <div className="flex w-full">
                      <p>{country.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
