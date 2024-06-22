// ScraperApiPage.tsx
import React, { useEffect, useState } from 'react';
import { CircularProgress,
  Alert,
  Container,
  Grid,
  FormControl,
  Box,
  OutlinedInput,
  InputAdornment,
  Button,
  styled,
 } from '@mui/material';
import ApiFieldsList from '@/content/Management/ApiFields/ApiFieldsList';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import apiFieldsData from '@/content/Management/ApiFields/apiFieldsData.json'; // Adjust the path
import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';


const ScraperApiPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setData(apiFieldsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <CircularProgress />;
  if (error) {
    setError(error);
    return <Alert severity="error">{error.message}</Alert>;
  }

  const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      padding-right: ${theme.spacing(0.7)}
  `
  );

  return (
    <>
    <Head>
        <title>API Calls</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
        title="API Calls"
        description="These are all the APIs linked to your Project"
        />
      </PageTitleWrapper>
    <Container maxWidth="lg">
    <Grid item xs={12}>
        <Box p={4}>
        <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Search terms here..."
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small">
                Search
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
        </Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <ApiFieldsList apiFields={data} />
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

ScraperApiPage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ScraperApiPage;
