import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { useHistory } from 'react-router-dom';
import { Illustration } from './Illustration';
import classes from './NothingFoundBackground.module.css';

export function NoMatch() {
  const history = useHistory();
  return (
    <Container className={classes.root} style={{ marginTop: '80px' }}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Stack
            align="center"
            justify="center"
            spacing="sm"
            sx={(theme) => ({
              height: 300,
            })}
          >
            <Title className={classes.title}>Nothing to see here</Title>
            <Text
              //c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
              style={{ fontSize: '26px', fontWeight: '600' }}
            >
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Group justify="center">
              <Button
                //variant="grey"
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
  );
}
