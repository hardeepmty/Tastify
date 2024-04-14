import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import axios from 'axios';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // State to store search input

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/foodData");
      console.log(response.data);
      setFoodItems(response.data.foodItems);
      setFoodCat(response.data.foodCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  
  const handleSearch = () => {
    
    const filteredItems = foodItems.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  
    setFoodItems(filteredItems);
  }

  return (
    <div>
      <Navbar />

      <div className='container' style={{marginTop:"100px"}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px", marginBottom: "20px" }}>
          <input type="text" placeholder="Search Food" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>

        <h2>Food Categories</h2>
        {foodCat.length > 0 ? (
          <div className='row'>
            {foodCat.map((category) => (
              <div key={category._id} className='col-12'>
                <h3>{category.CategoryName}</h3>
                <div className='row'>
                  {foodItems.filter((item) => item.CategoryName === category.CategoryName).map((item) => (
                    <div key={item._id} className='col-12 col-md-6 col-lg-4'>
                      <Card

                      foodItem = {item}
                        // foodName={item.name}
                        // description={item.description}
                        // price={item.price}
                        // img={item.img}
                        options={item.options}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No food categories available</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
