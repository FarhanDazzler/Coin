import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { useHistory } from 'react-router-dom';
import classes from './PageNotFound.module.css';
import PageWrapper from '../../components/wrappers/PageWrapper';

export function PageNotFound() {
  const history = useHistory();
  return (
    <PageWrapper>
      <Container className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Stack
              align="center"
              justify="center"
              spacing="sm"
              sx={(theme) => ({
                height: 300,
              })}
            >
              <Group justify="center">
                <Button
                  variant="grey"
                  //variant="outline"
                  color="dark"
                  radius="lg"
                  uppercase
                  size="md"
                  onClick={() => history.push('/')}
                >
                  Take me back to home page
                </Button>
              </Group>
            </Stack>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
