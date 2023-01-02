import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// @mui
import Box from '@mui/material/Box';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = React.useState(new Date);
  const [payment, setPayment] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange1 = (event) => {
        setPayment(event.target.value);
    };
    const handleChange2 = (event) => {
        setCategory(event.target.value);
    };
    const handleChange3 = (event) => {
        setName(event.target.value);
    };
    const handleChange4 = (event) => {
        setPrice(event.target.value);
    };
  // const MOMENT= require( 'moment' );

  // console.log("DATE:");
  // console.log(value.toISOString().slice(0, 10).replace('T', ' '))
    // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

    async function PostAPI(){
      console.log("API listed items:");
      console.log(name);
      console.log(price);
      console.log(payment);
      console.log(category);
      console.log(value.toISOString().slice(0, 10).replace('T', ' '));
    }
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Log Spending </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Log Spending
        </Typography>
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
          >
              <div>
                  <TextField
                      required
                      id="outlined-required"
                      label="Item Name"
                      // defaultValue=" "
                      placeholder = "Aldi"
                      value = {name}
                      onChange={handleChange3}
                  />
                  <TextField
                      required
                      type="number"
                      id="outlined-required"
                      label="Price"
                      placeholder = "10.99"
                      value = {price}
                      onChange={handleChange4}
                      // defaultValue=""
                      InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                  />
                  <br/>
                  <FormControl sx={{ m: 1, minWidth: 245 }}>
                      <InputLabel id="demo-simple-select-label">
                          Payment Method
                      </InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={payment}
                          label="Algorithm"
                          onChange={handleChange1}
                      >
                          <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                          <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
                          <MenuItem value={"Cash"}>Cash</MenuItem>
                          <MenuItem value={"Check"}>Check</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 245 }}>
                      <InputLabel id="demo-simple-select-label">
                          Category
                      </InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          label="Algorithm"
                          onChange={handleChange2}
                      >
                          <MenuItem value={"Grocery"}>Grocery</MenuItem>
                          <MenuItem value={"Service"}>Service</MenuItem>
                          <MenuItem value={"Gas"}>Gas</MenuItem>
                          <MenuItem value={"Online"}>Online</MenuItem>
                          <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                  </FormControl>
                  <br/>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          label="Purchase Date"
                          inputFormat="MM/DD/YYYY"
                          value={value}
                          onChange={(value) => {
                              setValue(value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>
                  <Button sx={{ m: 1, minWidth: 245, minHeight: 55 }} onClick={() => PostAPI()} variant="contained">Refresh</Button>


              </div>
          </Box>

        {/*<Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>*/}
        {/*  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>*/}
        {/*    <ProductFilterSidebar*/}
        {/*      openFilter={openFilter}*/}
        {/*      onOpenFilter={handleOpenFilter}*/}
        {/*      onCloseFilter={handleCloseFilter}*/}
        {/*    />*/}
        {/*    <ProductSort />*/}
        {/*  </Stack>*/}
        {/*</Stack>*/}

        {/*<ProductList products={PRODUCTS} />*/}
        {/*<ProductCartWidget />*/}
      </Container>
    </>
  );
}
