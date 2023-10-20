import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Group, Loader, Text, Timeline } from '@mantine/core';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

function getUserInitials(email) {
  try {
    if (typeof email !== 'string') {
      return '';
    }
    email = email.trim();
    if (email === '') {
      return '';
    }
    const name = email.includes('@') ? email.split('@')[0] : email;
    const initials = name
      .split(/[._\s]/)
      .map((part) => (part ? part[0].toUpperCase() : ''))
      .join('');

    return initials;
  } catch (e) {
    //console.log(e);
    return '';
  }
}

const CustomCardLoader = () => {
  return (
    <Card.Body>
      <Group position="center">
        <Row>
          <Col xs={`auto`}>
            <Loader variant="dots" color="yellow" />
          </Col>
          <Col className="text-left justify-content-center align-items-center align-middle">
            <span className="align-middle">&nbsp;{`Please wait`}</span>
          </Col>
        </Row>
      </Group>
    </Card.Body>
  );
};

const ActionLogChatTimeline = ({
  comments,
  action_log_id,
  chatMessageSaved,
  setChatMessageSaved,
  actionLogData,
}) => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState(comments);

  const getActionLogChatDetailsApi = (action_log_id) => {
    // dataService.getActionLogChatDetails(action_log_id).then((res) => {
    //   setChats();
    //   if (res?.data?.success) {
    //     //   console.log('Final Data:', res.data.data);
    //     setChats(res?.data?.data);
    //   }
    // });
  };

  useEffect(() => {
    getActionLogChatDetailsApi(action_log_id);
  }, []);

  useEffect(() => {
    if (chatMessageSaved) {
      getActionLogChatDetailsApi(action_log_id);
      setChatMessageSaved(false);
    }
  }, [chatMessageSaved]);

  return (
    <>
      {!chats && <CustomCardLoader />}
      {chats && (
        <Card.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
          <Row>
            <Col xs={12}>
              <Timeline
                active={chats && chats.length}
                color="yellow"
                bulletSize={30}
                reverseActive
                lineWidth={7}
                styles={{
                  //item: { color: 'red' },
                  //itemBody: { color: 'red' },
                  itemTitle: { color: '#e3af32' },
                  //itemContent: { color: 'red' },
                  //itemLineActive: { color: 'red' },
                  //itemActive: { color: 'red' },
                  //itemBullet: { color: '#e3af32' },
                  //itemBulletWithChild: { color: 'red' },
                }}
              >
                {chats &&
                  chats?.map((message) => (
                    <Timeline.Item
                      bullet={getUserInitials(message?.created_by)}
                      title={`${message.created_by}`}
                    >
                      <Text color="white">{`${message.comment}`}</Text>
                      {/* <Text size="xs" mt={4} color="dimmed">{`${message.created_at}`}</Text> */}

                      <Text size="xs" mt={4} color="dimmed">{`${dayjs(message.created_at).format(
                        `ddd, DD MMM YYYY HH:mm:ss`,
                      )}`}</Text>
                    </Timeline.Item>
                  ))}

                {/* <Timeline.Item title="Action Log Created">
                  <Text size="xs" mt={4} color="dimmed">{`${dayjs(
                    actionLogData?.action_log_created_at,
                  ).format(`ddd, DD MMM YYYY HH:mm:ss`)}`}</Text>
                </Timeline.Item> */}
              </Timeline>
            </Col>
          </Row>
        </Card.Body>
      )}
    </>
  );
};

export default ActionLogChatTimeline;
