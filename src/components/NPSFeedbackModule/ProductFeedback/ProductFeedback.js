import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Group,
  Modal,
  Slider,
  Space,
  Text,
  Textarea,
} from '@mantine/core';
import { useFormik } from 'formik';

import AppLoader from '../AppLoader/AppLoader';
import { IconCheck, IconX } from '@tabler/icons-react';
import feedbackService from './feedbackService';

const ProductFeedback = (props) => {
  const {
    env,
    token,
    apiKey,
    productId,
    productActivityId,
    modalOpened,
    setModalOpened,
    feedbackMetadata,
    titleLabel,
    sliderLabel,
    commentsLabel,
    InputWrapper,
  } = props;
  const [showModalLoader, setShowModalLoader] = useState();
  const [modalActivePage, setModalActivePage] = useState(1);
  const [modalMessage, setModalMessage] = useState(null);

  const [allowed, setAllowed] = useState(false);

  const dispatch = useDispatch();

  const modalFormik = useFormik({
    initialValues: {
      product_id: productId,
      product_activity_id: productActivityId,
      score: null,
      description: '',
      feedback_metadata: feedbackMetadata,
    },
    validate: (values) => {
      const errors = {};
      //   console.log(!values?.score);
      if (!values?.score) errors.score = 'Score is required';

      if (values?.score >= 0 && values?.score <= 6) {
        if (!values?.description)
          errors.description = 'Please provide a description for your score';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      //console.log(values, '@@@');

      setSubmitting(false);

      submitFeedbackApi(values);
    },
  });

  function checkProductFeedbackAllowedApi(product) {
    feedbackService.checkProductFeedbackAllowed(env, token, apiKey, product).then((res) => {
      console.log(res);
      if (res?.data?.data) setAllowed(res?.data?.data?.allowed);
    });
  }

  const submitFeedbackApi = (data) => {
    setShowModalLoader(true);
    feedbackService.submitProductFeedback(env, token, apiKey, data).then((res) => {
      console.log(res?.data?.data);
      setShowModalLoader(false);
      setModalMessage(res?.data?.data);
      setModalActivePage(2);
    });
  };

  useEffect(() => {
    if (modalFormik.values?.product_id) {
      console.log(modalFormik.values?.product_id);
      checkProductFeedbackAllowedApi(modalFormik.values?.product_id);
    }

    return () => {
      setAllowed(false);
    };
  }, [modalFormik.values?.product_id]);

  const modalCleanup = () => {
    modalFormik.resetForm();

    // feedbackDispatch({
    //   type: 'CLOSE_FEEDBACK',
    //   payload: null,
    // });

    setShowModalLoader(false);
    setModalMessage(null);
    setModalActivePage(1);
    setModalOpened(false);
  };

  function sliderColor(value) {
    if (value >= 0 && value < 7) return 'red';
    else if (value >= 7 && value < 9) return 'yellow';
    else if (value <= 10) return 'green';
    return 'yellow';
  }

  const sliderMarks = [
    { value: 0, label: <Text color="red" weight={700}>{`0`}</Text> },
    { value: 10, label: <Text color="red" weight={700}>{`1`}</Text> },
    { value: 20, label: <Text color="red" weight={700}>{`2`}</Text> },
    { value: 30, label: <Text color="red" weight={700}>{`3`}</Text> },
    { value: 40, label: <Text color="red" weight={700}>{`4`}</Text> },
    { value: 50, label: <Text color="red" weight={700}>{`5`}</Text> },
    { value: 60, label: <Text color="red" weight={700}>{`6`}</Text> },
    { value: 70, label: <Text color="yellow" weight={700}>{`7`}</Text> },
    { value: 80, label: <Text color="yellow" weight={700}>{`8`}</Text> },
    { value: 90, label: <Text color="green" weight={700}>{`9`}</Text> },
    { value: 100, label: <Text color="green" weight={700}>{`10`}</Text> },
  ];

  return allowed ? (
    <Modal
      radius="lg"
      size="lg"
      opened={modalOpened}
      centered={true}
      title={
        <Text weight={700} size="lg" className="golden-text" color="yellow">
          {titleLabel ? titleLabel : `Help us improve!`}
        </Text>
      }
      onClose={() => {
        modalCleanup();
      }}
    >
      {modalActivePage === 1 && (
        <>
          <Container>
            <Grid>
              <Grid.Col xs={12} sm={12}>
                {/* <Group position="apart">
                  <Text
                    size="md"
                    weight={600}
                    color="black"
                    align="left"
                  >{`Help us improve!`}</Text>
                </Group> */}
                <Space h="xl" />
                <h4>Rate your experience</h4>
                <Slider
                  color={sliderColor(modalFormik.values?.score)}
                  marks={sliderMarks}
                  step={10}
                  label={`Rate your experience`}
                  value={modalFormik.values.score * 10}
                  onChange={(e) => {
                    modalFormik.setFieldValue('score', e / 10);
                  }}
                />
                <Space h="xl" />
                <Space h="xl" />
                <Grid className="text-left">
                  <Grid.Col xs={12} sm={12}>
                    <Textarea
                      name="description"
                      placeholder={
                        commentsLabel ? commentsLabel : `Tell us about your experience...`
                      }
                      label={null}
                      required={modalFormik.values?.score >= 0 && modalFormik.values?.score <= 8}
                      radius="lg"
                      minRows={4}
                      maxRows={4}
                      value={modalFormik.values?.description}
                      onChange={modalFormik.handleChange}
                      onBlur={modalFormik.handleBlur}
                      error={modalFormik.errors?.description}
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Container>

          <Space h="md" />

          <Group position="right">
            <Button
              color="gray"
              radius="xl"
              leftIcon={<IconX size={16} color="white" />}
              onClick={() => {
                modalCleanup();
              }}
            >{`Cancel`}</Button>
            <Button
              color="yellow"
              radius="xl"
              leftIcon={<IconCheck size={16} color="white" />}
              onClick={modalFormik.handleSubmit}
              disabled={modalFormik.isSubmitting || Object.keys(modalFormik.errors).length !== 0}
            >{`Save`}</Button>
          </Group>
        </>
      )}

      {modalActivePage === 2 && (
        <Container>
          <Text size="xl" weight={600}>
            {modalMessage?.header}
          </Text>
          <Space h="md" />
          <Text size="md" weight={400}>
            {modalMessage?.message}
          </Text>
        </Container>
      )}

      {showModalLoader ? <AppLoader /> : null}
    </Modal>
  ) : null;
};

export default ProductFeedback;
