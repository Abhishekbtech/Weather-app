import React, { useEffect, useState } from "react";
import CityCard from "./CityCard";
import './Main.css'

function Main() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCity, setSelectedCity] = useState(null)
    const [show, setShow] = useState(false);


    const fetchData = async () => {
        try {
            setIsLoading(true);
            const limit = page < 0 ? -1 : Math.min(page * 25, 100)
            const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A%22India%22`);
            const responseData = await res.json();
            const newData = responseData.results;
            console.log("API data ",newData)
            setData(newData);
            setIsLoading(false);
        } catch (err) {
            console.log("Error in API Fetch Data", err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleScroll = () => {
        if (page <= 4 ? window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !isLoading : '') {
            console.log(page)
            setPage(prevPage => prevPage + 1);
        } else if (page > 4) {
            alert("API is not allowing us get more then 100 data")
            window.removeEventListener("scroll", handleScroll); // Remove scroll listener
        }
    };
    

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page]);

    const handelingFilter = (e) => {
        setSearchText(e.target.value.trim().toLowerCase());
    }

    // const filteredData = data.filter(item => item.name.toLowerCase().includes(searchText));
    const filteredData = data ? data.filter(item => item.name.toLowerCase().includes(searchText)) : [];


    const handlingClick = (item) => {
        console.log("City Selected ",item.name)
        setSelectedCity(item.name);
        setShow(true)
    }

    const handleCloseCityCard = () => {
        setSelectedCity(null); // Reset selected city
        setShow(false); // Hide CityCard
    };

    return (
        <div className="Main">
            <h1>Weather report for India</h1>
            <input type="search" placeholder="Enter city name" autoComplete="on" onChange={handelingFilter} className="input"/>
            <br />
            <br />
            <table className="tab">
                <thead>
                    <tr>
                        <th>City Name</th>
                        <th>Country</th>
                        <th>Timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.geoname_id}>
                            <td style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handlingClick(item)}>{item.name}</td>
                            <td>{item.cou_name_en}</td>
                            <td>{item.timezone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <h1>Data is Loading...</h1>}
            {selectedCity && <CityCard cityName={selectedCity} onClose={handleCloseCityCard} />}
        </div>
    );
}

export default Main;
