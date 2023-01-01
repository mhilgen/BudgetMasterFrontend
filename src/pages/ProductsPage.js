import * as React from 'react';
import dayjs from 'dayjs';
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

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = React.useState(dayjs('2022-04-07'));

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
                      label="Required"
                      defaultValue="Iteam Name"
                  />

                  <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue="Item Price"
                      InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                  />
                  <br/>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          label="Purchase Date"
                          value={value}
                          onChange={(newValue) => {
                              setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                      />
                  </LocalizationProvider>

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
