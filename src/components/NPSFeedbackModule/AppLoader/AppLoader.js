import React from 'react';

import { Space, Loader, Grid, Text, Container } from '@mantine/core';

const AppLoader = () => {
  return (
    <>
      <Space h="xl" />

      <Container>
        <Grid align="center" justify="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Loader color="yellow" />
            <Text style={{ marginLeft: '1rem' }} color="dimmed" weight={400}>{`Please wait`}</Text>
          </div>
        </Grid>
      </Container>

      <Space h="xl" />
    </>
  );
};

export default AppLoader;
