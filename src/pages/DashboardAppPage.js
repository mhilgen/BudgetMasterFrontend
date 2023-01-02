import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import * as React from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  var currDate = new Date();
  var currDay = currDate.getDate();
  var currMonth = currDate.getMonth()+1;
  var currYear = currDate.getFullYear();
  const [month, setMonth] = React.useState(currMonth);
  const [year, setYear] = React.useState(currYear);
  const handleChange1 = (event) => {
        setMonth(event.target.value);
        updateAPIs();
  };
  const handleChange2 = (event) => {
        setYear(event.target.value);
        updateAPIs();
  };
  // TODO: let the user select the year and month!!!
  // let year = 2022;
  // let month = 12;
  const totalyear = 100;
  const yearspending = 101;
  const paymentType = 200;
  const categoryType = 201;
  const lastFive = 300;
  const monthsumType = 400;


    async function GET_API(url, type, year) {
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(total => {
                // console.log(total.Response);
                console.log("API CALL")
                console.log(type)
                if (total.Response === 200) {
                    // console.log(type)
                    if (type === totalyear) {
                        totalprice(total.data, year)
                    }
                    if (type === yearspending) {
                        yearMonth(total.data)
                    }
                    if (type === paymentType) {
                        payment(total.data)
                    }
                    if (type === categoryType) {
                        category(total.data)
                    }
                    if (type === lastFive) {
                        lastFiveLogs(total.data)
                    }
                    if (type === monthsumType) {
                        monthSum(total.data, year)
                    }
                }
            });
    }

    async function totalprice(data, year){
        // console.log("totalprice")
        // console.log(data)
        localStorage.setItem('totalprice', JSON.stringify(data[`${year}`]));
    }
    async function yearMonth(data){
        // console.log("yearMonth")
        // console.log(data)
        localStorage.setItem('yearmonth', JSON.stringify(data));
        yearMonths = JSON.parse(localStorage.getItem('yearmonth'))
    }
    async function payment(data){
        // console.log("payment")
        // console.log(data)
        localStorage.setItem('payment', JSON.stringify(data));
        PaymentList = JSON.parse(localStorage.getItem('payment'))
    }
    async function category(data){
        // console.log("category")
        // console.log(data)
        localStorage.setItem('category', JSON.stringify(data));
        CategoryList = JSON.parse(localStorage.getItem('category'))
    }
    async function lastFiveLogs(data){
        console.log("LastFiveLogs")
        console.log(data)
        localStorage.setItem('lastFive', data);
    }
    async function monthSum(data, month){
        // console.log("monthSum")
        // console.log(data)
        localStorage.setItem('monthsum', data[`${month}`]);
    }
    function updateAPIs(){
        console.log("CLICKED THE BUTTON")
        localStorage.setItem('year', year)
        localStorage.setItem('month', month)
        console.log(year)
        console.log(month)

        // API calls
        GET_API('http://127.0.0.1:5000/total/'+`${year}`, totalyear, localStorage.getItem('year'));
        GET_API('http://127.0.0.1:5000/totalmonths/'+`${year}`, yearspending, localStorage.getItem('year'));
        GET_API('http://127.0.0.1:5000/payment/'+`${year}`+','+`${month}`, paymentType, localStorage.getItem('year'));
        GET_API('http://127.0.0.1:5000/category/'+`${year}`+','+`${month}`, categoryType, localStorage.getItem('year'));
        GET_API('http://127.0.0.1:5000/last5', lastFive, localStorage.getItem('year'));
        GET_API('http://127.0.0.1:5000/monthsum/'+`${year},${month}`, monthsumType, localStorage.getItem('month'));
        yearMonths = JSON.parse(localStorage.getItem('yearmonth'))
        PaymentList = JSON.parse(localStorage.getItem('payment'))
        CategoryList = JSON.parse(localStorage.getItem('category'))
    }

    let yearMonths = JSON.parse(localStorage.getItem('yearmonth'))
    let PaymentList = JSON.parse(localStorage.getItem('payment'))
    let CategoryList = JSON.parse(localStorage.getItem('category'))
    // console.log("check on list:")
    // console.log(CategoryList)

  return (
    <>

      <Helmet>
        <title> BudgetMaster WebServer</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>


            <AppWidgetSummary title="Yearly Spending of the year" total={JSON.parse(localStorage.getItem('totalprice'))} icon={'game-icons:cash'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Current Month Spending" total={JSON.parse(localStorage.getItem('monthsum'))} color="info" icon={'ri:coins-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Peak Month" total={1723315} color="warning" icon={'ep:gold-medal'} />
          </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Months</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={month}
                        onChange={handleChange1}
                        autoWidth
                        label="Month"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>

                    </Select>
                    {/*{month}*/}
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Years</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={year}
                        onChange={handleChange2}
                        autoWidth
                        label="Year"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                    </Select>
                    {/*{year}*/}
                </FormControl>
                <Stack spacing={2} direction="row">
                    <Button onClick={() => updateAPIs()} variant="contained">Refresh</Button>
                </Stack>
            </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Total Spending Graph"
              subheader="This graph shows how much $$$ was spent throughout this year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
              ]}
              chartData={[
                {
                  name: '2022',
                  type: 'area',
                  fill: 'gradient',
                  data: yearMonths,
                },
                // {
                //   name: 'Team B',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // }
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>
            {/*TODO: need to implement the list in here */}
            <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline
                    title="Latest Logs"
                    list={[...Array(5)].map((_, index) => ({
                        id: faker.datatype.uuid(),
                        title: [
                            '1983, orders, $4220',
                            '12 Invoices have been paid',
                            'Order #37745 fr    om September',
                            'New order placed #XF-2356',
                            'New order placed #XF-2346',
                        ][index],
                        type: `order${index + 1}`,
                        time: faker.date.past(),
                    }))}
                />
            </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Payment Distribution"
              chartData={[
                { label: 'Credit Card', value: PaymentList["Credit Card"] },
                { label: 'Debit Card', value: PaymentList["Debit Card"] },
                { label: 'Cash', value: PaymentList["Cash"] },
                { label: 'Check', value: PaymentList["Check"] },
                { label: 'Other', value: PaymentList["Other"] },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.success.main,
              ]}
            />
          </Grid>


            <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                    title="Category Distribution"
                    chartData={[
                        { label: 'Grocery', value: CategoryList["Grocery"] },
                        { label: 'Service', value: CategoryList["Service"] },
                        { label: 'Gas', value: CategoryList["Gas"] },
                        { label: 'Online', value: CategoryList["Online"] },
                        { label: 'Fast Food', value: CategoryList["Fast Food"] },
                        { label: 'Other', value: CategoryList["Other"] },
                    ]}
                    chartColors={[
                        theme.palette.primary.main,
                        theme.palette.info.main,
                        theme.palette.warning.main,
                        theme.palette.error.main,
                        theme.palette.success.main,
                        theme.palette.error.dark,
                    ]}
                />
            </Grid>


          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppTasks*/}
          {/*    title="Tasks"*/}
          {/*    list={[*/}
          {/*      { id: '1', label: 'Create FireStone Logo' },*/}
          {/*      { id: '2', label: 'Add SCSS and JS files if required' },*/}
          {/*      { id: '3', label: 'Stakeholder Meeting' },*/}
          {/*      { id: '4', label: 'Scoping & Estimations' },*/}
          {/*      { id: '5', label: 'Sprint Showcase' },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </>
  );
}
