import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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
  let year = 2022;
  let month = 12;
  const totalyear = 100;
  const yearspending = 101;
  const paymentType = 200;
  const categoryType = 201;
  const lastFive = 300;
  const monthType = 400;
  const monthsumType = 401;
    async function GET_API(url, type, year) {
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(total => {
                console.log(total.Response);
                if(total.Response === 200){
                    console.log(type)
                    if(type === totalyear){
                        totalprice(total.data, year)
                    }
                    if(type === yearspending){
                        yearMonth(total.data, year)
                    }
                    if(type === paymentType){
                        payment(total.data)
                    }
                    if(type === categoryType){
                        category(total.data)
                    }
                    if(type === lastFive){
                        lastFiveLogs(total.data)
                    }
                    if(type === monthType){
                        monthLogs(total.data)
                    }
                    if(type === monthsumType){
                        monthSum(total.data, year)
                    }
                }
            });
    }
    async function totalprice(data, year){
        console.log("totalprice")
        console.log(data)
        localStorage.setItem('totalprice', data[`${year}`]);
    }
    async function yearMonth(data, year){
        console.log("yearMonth")
        console.log(data)
        localStorage.setItem('yearmonth', data[`${year}`]);
    }
    async function payment(data){
        console.log("payment")
        console.log(data)
        localStorage.setItem('payment', data);
    }
    async function category(data){
        console.log("category")
        console.log(data)
        localStorage.setItem('category', data);
    }
    async function lastFiveLogs(data){
        console.log("LastFiveLogs")
        console.log(data)
        localStorage.setItem('lastFive', data);
    }
    async function monthLogs(data){
        console.log("monthLogs")
        console.log(data)
        localStorage.setItem('monthLogs', data);
    }
    async function monthSum(data, month){
        console.log("monthSum")
        console.log(data)
        localStorage.setItem('monthsum', data[`${month}`]);
    }

    // API calls
    GET_API('http://127.0.0.1:5000/total/'+`${year}`, totalyear, year);
    GET_API('http://127.0.0.1:5000/totalmonths/'+`${year}`, yearspending, year);
    GET_API('http://127.0.0.1:5000/payment/'+`${year}`+','+`${month}`, paymentType, year);
    GET_API('http://127.0.0.1:5000/category/'+`${year}`+','+`${month}`, categoryType, year);
    GET_API('http://127.0.0.1:5000/last5', lastFive, year);
    GET_API('http://127.0.0.1:5000/month/'+`${year},${month}`, monthType, year);
    GET_API('http://127.0.0.1:5000/monthsum/'+`${year},${month}`, monthsumType, month);



  return (
    <>

      <Helmet>
        <title> BudgetMaster WebServer </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>



        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>

            <AppWidgetSummary title="Yearly Spending of the year" total={localStorage.getItem('totalprice')} icon={'game-icons:cash'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Current Month Spending" total={localStorage.getItem('monthsum')} color="info" icon={'ri:coins-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Peak Month" total={1723315} color="warning" icon={'ep:gold-medal'} />
          </Grid>

          {/*<Grid item xs={12} sm={6} md={3}>*/}
          {/*  <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />*/}
          {/*</Grid>*/}



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
                  // data: localStorage.getItem('yearmonth'),
                  data: [	1144.31, 2858.88, 889.92, 1341.09, 	802.36, 155.29, 205.29, 2970.88, 951.17, 699.93, 764.94, 890.3],
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
                { label: 'Credit Card', value: 464.15 },
                { label: 'Debit Card', value: 425.15 },
                { label: 'Cash', value: 0 },
                { label: 'Check', value: 0 },
                { label: 'Other', value: 1.0 },
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
                        { label: 'Grocery', value: 198.05 },
                        { label: 'Service', value: 226.96 },
                        { label: 'Gas', value: 123.46 },
                        { label: 'Online', value: 0 },
                        { label: 'Fast Food', value: 45.50 },
                        { label: 'Other', value: 296.33 },
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


          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
