import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import CountriesCard from "./CountriesCard";
import Pagination from "./Pagination";

function Countries() {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");

  let getData = async (page) => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?page=${page}&limit=10&sort=population&order=asc`
      );
      let data = await res.json();
      console.log(data);
      setCountry(data.data);
      setTotal(data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);
  
  const handlePage = (id) => {
    setPage((pre) => {
      return pre + id;
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <h1 data-testid="countries-header">Countries List</h1>
      <div data-testid="countries-container">
        {country?.map((ele) => {
          return <CountriesCard key={ele.id} {...ele} />;
        })}
      </div>
      <div>
        {
          <Pagination
            current={page}
            total={total}
            onChange={(id) => handlePage(id)}
          />
        }
      </div>
    </div>
  );
}

export default Countries;
