import { useEffect, useState } from "react";
import { useScreenSize } from "../hooks/useScreenSize";
import { cn } from "../utils/cn";

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
  const { width } = useScreenSize();
  const [showUNMembersOnly, setShowUNMembersOnly] = useState(false);
  const [showIndependentsOnly, setShowIndependentsOnly] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,independent,unMember"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Country[]) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
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
    <>
      <div className="h-full w-full px-4 md:px-20">
        <div className="font-bold sm:text-3xl text-xl md:pb-10 pb-8 ">
          Practice 08: CountryPage.
        </div>
      </div>
      <div
        className={cn("w-full h-[1093px] bg-[#1c1d1e] md:h-[110q0px]", {
          "h-[1137px]": width! < 506,
        })}
      >
        <div className="relative h-full w-full">
          <img
            src="Images/CountryPage/hero-image-sm.jpg"
            className="absolute z-10 flex object-cover h-48 md:hidden"
            alt="hero-image"
          />
          <img
            src="Images/CountryPage/hero-image.jpg"
            className="absolute z-10 hidden object-cover w-full md:flex "
            alt="hero-image"
          />
          <img
            src="Images/CountryPage/Logo.svg"
            className="absolute top-[70px] w-full h-5 z-10 md:top-[200px] md:h-7"
            alt="logo"
          />

          <div className="absolute left-3 right-3 top-[120px]  bg-[#1c1d1e] text-white rounded-t-xl border-2 border-gray-800 pt-8 px-3 flex flex-col gap-8 z-20 md:gap-6 md:p-5 md:top-[35%] md:left-6 md:right-6 ">
            <div className="flex flex-col w-full h-full md:h-10 md:justify-between max-h-[101px] md:flex-row gap-6 md:gap-4 md:max-h-full">
              <div className="flex justify-start items-center  md:justify-center">
                <p>Found {filteredCountries.length} countries</p>
              </div>
              <div className="relative rounded-xl bg-gray-600 justify-center items-center w-full p-3 flex gap-2 md:p-4 md:w-[400px]">
                {!searchTerm && !isFocused && (
                  <img
                    src="public/Images/CountryPage/Search.svg"
                    className="absolute mr-52 md:left-3 md:mr-0"
                  />
                )}
                <input
                  type="text"
                  placeholder={
                    width! < 768
                      ? "Search by Name, Region..."
                      : "Search by Name, Region, Subregion"
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={cn(
                    "bg-transparent text-white w-full outline-none placeholder-gray-300",
                    {
                      "text-left placeholder-transparent ml-0": searchTerm,
                      "text-center ml-6 md:text-left md:ml-7": !searchTerm,
                    },
                    "focus:text-left focus:placeholder-transparent focus:ml-0"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col w-full h-full md:justify-between md:flex-row ">
              <div className="w-full flex flex-col gap-8 md:gap-5 md:pr-8 md:w-[15%]">
                <div className=" hidden md:block ">
                  <p className="mb-2">Sort By</p>
                  <select
                    value={sortKey}
                    onChange={(e) =>
                      setSortKey(e.target.value as typeof sortKey)
                    }
                    className="bg-gray-700 text-white p-3 rounded-xl w-full"
                  >
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                    <option value="area">Area (km²)</option>
                    <option value="region">Region</option>
                  </select>
                </div>
                <div className="block md:hidden w-full">
                  <p className="mb-2">Sort By</p>
                  <select
                    value={sortKey}
                    onChange={(e) =>
                      setSortKey(e.target.value as typeof sortKey)
                    }
                    className="bg-[#1c1d1e] text-white p-3 rounded-xl w-full border-[3px] border-gray-800 "
                  >
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                  </select>
                </div>
                <div>
                  <p className="mb-2">Region</p>
                  <div
                    className={cn("flex flex-wrap gap-2", {
                      "gap-1 gap-y-2": width! < 506,
                    })}
                  >
                    {regions.map((region) => {
                      const isSelected = selectedRegions.includes(region);
                      return (
                        <button
                          key={region}
                          onClick={() => toggleRegion(region)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors md:px-4
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
                        onChange={() =>
                          setShowIndependentsOnly((prev) => !prev)
                        }
                        className="form-checkbox text-gray-600"
                      />
                      Independent
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col mt-8 md:w-[85%] md:mt-1">
                <div className="h-full items-center flex gap-8 border-b-2 border-gray-800 justify-stretch text-sm pb-4 md:gap-12 md:text-base">
                  <div className="flex w-[50%] md:w-1/4">
                    <p>Flag</p>
                  </div>
                  <div className="flex w-full">
                    <p>Name</p>
                  </div>
                  <div className="flex w-full ">
                    <p>Population</p>
                  </div>
                  <div className="md:flex w-full hidden">
                    <p>Area (km²)</p>
                  </div>
                  <div className="md:flex w-full hidden">
                    <p>Region</p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 gap-4 overflow-y-auto max-h-[349px] md:max-h-[560px] ">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.name.common}
                      className="flex gap-8 justify-stretch items-center text-sm md:text-base md:gap-12"
                    >
                      <div className="flex w-[50%] md:w-1/4">
                        <img
                          src={country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          className="h-10 rounded-sm shadow w-full min-w-[35px] max-w-14 md:max-w-20"
                        />
                      </div>
                      <div className="flex w-full">
                        <p>{country.name.common}</p>
                      </div>
                      <div className="flex w-full">
                        <p>{country.population.toLocaleString()}</p>
                      </div>
                      <div className="md:flex w-full hidden">
                        <p>{country.area.toLocaleString()}</p>
                      </div>
                      <div className="md:flex w-full hidden">
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
    </>
  );
};
