import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { Container, Typography, TextField, Button, Grid, Stack } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // State to store search input

  const loadData = async () => {
    try {
      const response = await axios.post("https://tastify.onrender.com/api/foodData");
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
    <Stack spacing={2} style={{ backgroundImage: 'url(/images/bgimg.jpg)', backgroundSize: 'cover',backgroundAttachment:"fixed", backgroundPosition: 'center',display:"static", minHeight: '100vh' }}>
      <Navbar />

  

      <Container sx={{justifyContent:"center", alignContent:"center",}}>
        <Stack spacing={6} marginTop={8}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <TextField
              variant="outlined"
              placeholder="Search food,categories and more"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{ width: 900, ml:"20px" }} // Adjust the width of the TextField
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ marginLeft: 2, height: 56, bgcolor:"gray", color:"black", fontWeight:"bold",fontFamily:"Montserrat" }} // Add margin and adjust the height of the Button
            >
              Search
            </Button>
          </Stack>
          <Typography variant="h4" sx={{ fontFamily:"Montserrat", fontWeight:"bold", textAlign:"center"}}>TOP PICKS FOR YOU !</Typography>
          {foodCat.length > 0 ? (
            <Grid container spacing={6}>
              {foodCat.map((category) => (
                <Grid item xs={12} key={category._id} sx={{mt:"200"}}>
                  <Typography variant="h4" sx={{ fontFamily:"Montserrat", fontWeight:"bold"}}>{category.CategoryName}</Typography>
                  <Grid container spacing={16} >
                    {foodItems.filter((item) => item.CategoryName === category.CategoryName).map((item) => (
                      <Grid item xs={12} sm={6} md={3} key={item._id}>
                        <Card
                          foodItem={item}
                          options={item.options}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No food categories available</Typography>
          )}
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
};

export default Home;
