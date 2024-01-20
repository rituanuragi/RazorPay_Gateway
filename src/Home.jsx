import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Razorpay from 'razorpay';
import Card from './Card';
import axios from 'axios';
import backgroundImg from './background.png';
import backgroundImg2 from './background2.jpeg'; // Correct the import statement

const Home = () => {
  const checkoutHandler = async (amount) => {
    const {data: {key}} = await axios.get("http://localhost:4000/api/getkey")
    const { data:{order} } = await axios.post("http://localhost:4000/api/checkout", {
      amount
    });
    const options = {
      key,
      amount: "order.amount", 
      currency: "INR",
      name: "Ritu",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order.id",
      callback_url: "https://localhost:4000/api/paymentverification",
      prefill: {
          name: "Gaurav Kumar",
           email: "gaurav.kumar@example.com",
          contact: "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#121212"
      
    }
  };
  // var rzp1 = new Razorpay(options);
  // document.getElementById('rzp-button1').onclick = function(e){
  //     rzp1.open();
  const razor = new window.Razorpay(options);
  razor.open();

  }


  return (
    <Box>
      <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>
        <Card amount={5000} img={backgroundImg2} checkoutHandler={() => checkoutHandler(5000)} />
        <Card amount={3000} img={backgroundImg} checkoutHandler={() => checkoutHandler(3000)} /> {/* Use backgroundImg here */}
      </Stack>
    </Box>
  );
};

export default Home;
