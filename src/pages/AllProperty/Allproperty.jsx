import { useNavigate } from "react-router-dom";
import useAllProperty from "../../hooks/useAllProperty";
import { useState } from "react";
import Container from "../../Components/Shared/Container";

const Allproperty = () => {
    const navigate = useNavigate();
    const { data } = useAllProperty();
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredData = data?.filter((card) =>
        card.title.toLowerCase().includes(search.toLowerCase())
    );

    // Function to sort data based on price range
    const sortData = (order) => {
        const sortedData = [...filteredData];
        sortedData.sort((a, b) => {
            const priceA = parseFloat(a.frange);
            const priceB = parseFloat(b.trange);
            return order === "asc" ? priceA - priceB : priceB - priceA;
        });
        return sortedData;
    };

    const handleDetails = (id) => {
        navigate(`/property/${id}`);
    };

    return (
        <Container>
           

                <div className="flex flex-row-reverse mx-w-full  justify-between mt-4 lg:flex-row items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-gray-400"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-gray-600">Sort by Price:</p>
                        <button
                            className={`bg-blue-500 text-white px-3 py-1 rounded ${sortOrder === "asc" ? 'shadow-md' : ''}`}
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        >
                            {`${sortOrder === "asc" ? "Low to High" : "High to Low"}`}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4   mt-8">
                    {filteredData && (
                        sortData(sortOrder).map((card) => (
                            <div
                                onClick={() => handleDetails(card?._id)}
                                key={card.id}
                                className="relative rounded-xl w-72 overflow-hidden cursor-pointer border border-gray-300 group shadow-md transition duration-300 transform hover:scale-105"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                                <div className="p-2 bg-white">
                                    <h2 className="text-lg font-semibold mb-1 text-gray-800">{card.title}</h2>
                                    <p className="text-sm text-gray-600 mb-1">Verification Status: {card.verificationStatus}</p>
                                    <p className="text-sm text-gray-700 mb-1">Price Range: ${card?.frange}-{card?.trange}</p>
                                    <div className="flex items-center gap-2">
                                        <img src={card?.agent?.image} alt="" className="w-6 h-6 rounded-full" />
                                        <p className="text-sm text-gray-700">{card?.agent?.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                  
                </div>
                {filteredData && filteredData.length === 0 && (
                        <p className="h-screen text-red-400 text-center text-2xl">Search Data Not Found</p>
                    )}
        </Container>
    );
};

export default Allproperty;
